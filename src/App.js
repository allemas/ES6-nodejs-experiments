const githubClient = require('./GithubClient');
const axios = require('axios').default;


var github = {
    getOrganization: function (data) {
        return axios.get('https://api.github.com/orgs/apache', data.config).then((response) => {
            const body = response.data;
            return {
                config: data.config,
                organization: body
            }
        });
    },
    listMembers: function (data) {
        return axios.get('https://api.github.com/orgs/apache/members', data.config).then(function (response) {
            const body = response.data;
            return {
                ...data,
                members: body
            }
        });
    },

    getRepositories: function (data) {
        return axios.get(data.organization.repos_url, data.config).then(function (response) {
            const body = response.data;
            data.organization.repos = body
            return data;
        });
    },

    getMemberRepos: function (data) {

        var memberFn = (member) => axios.get(member.repos_url, data.config);
        var m = data.members.map((member) => new Promise((res, rej) => {
            memberFn(member).then((r) => { res({ ...member, repos: r.data }) })
        }));

        var result = Promise.all(m);
        return result.then((r) => {
            return { ...data, members: r };
        })
    }
}



var analyser = {
    stargazersReposAverage: function (data) {
        var repos = data.organization.repos;
        var total_stargazers = repos.map((r) => r.stargazers_count).reduce((accumulator, currentValue) => accumulator + currentValue);
        data.organization.repos = repos.map((r) => { return { ...r, stargazer_average: ((r.stargazers_count / total_stargazers) * 100) } });
        data.organization.total_stargazers = total_stargazers;
        return data;
    },

    stargazersReposMembersAverage: function (data) {
        data.members = data.members.map((member) => {
            var repos = member.repos;
            var total_stargazers = repos.map((r) => r.stargazers_count).reduce((accumulator, currentValue) => accumulator + currentValue);

            member.repos = repos.map((r) => {
                var average = ((r.stargazers_count / total_stargazers) * 100);
                const sanitise = (x) => {
                    if (isNaN(x)) {
                        return 0;
                    }
                    return x;
                };
                return { ...r, stargazer_average: sanitise(average) }
            });
            member.total_stargazers = total_stargazers;

            return member;
        });

        return data;
    },
    stargazersMembersAverage: function (data) {
        console.log(data.organization.total_stargazers);
        console.log("PLUS::");
        data.members.filter((r) => r.total_stargazers >= data.organization.total_stargazers).map(console.log);
        console.log("Moins ::");
        data.members.filter((r) => r.total_stargazers <= data.organization.total_stargazers).map((m) => console.log(m.login + "avec " + m.total_stargazers));
    }
};



module.exports = {
    run: () => {
        var client = githubClient.create();
        const t = client.then(github.getOrganization)
            .then(github.listMembers)
            .then(github.getRepositories)
            .then(github.getMemberRepos)
            .then(analyser.stargazersReposAverage)
            .then(analyser.stargazersReposMembersAverage)
            .then(analyser.stargazersMembersAverage)
            .catch(console.error);
    }
};