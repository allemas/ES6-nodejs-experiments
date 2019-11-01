const axios = require('axios').default;
var querystring = require('querystring');
const config = require("./config/config.json");

module.exports.create = () => {
        const data = {
                "scopes": [
                        "public_repo"
                ],

                "note": "experiments",
                "client_id": config.client_id,
                "client_secret": config.client_secret
        }

        const headers = {
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + Buffer.from(config.account.username + ":" + config.account.password).toString("base64"),
                },
        }

        return axios.post('https://api.github.com/authorizations', data, headers);
}