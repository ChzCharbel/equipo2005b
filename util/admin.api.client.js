const axios = require('axios');
const NodeCache = require('node-cache');
const dotenv = require('dotenv').config();

const cache = new NodeCache();

const axiosAdminClient = axios.create({
    baseURL: 'https://ivd-qa-0dc175b0ba43.herokuapp.com',
});

async function getToken() {
    let token = cache.get("token");

    if (token) {
        return token;
    }

    console.log("Fetching new token");
    
    const m2m_credentials = {
        client_id: process.env.ADMIN_API_M2M_CLIENT_ID,
        client_secret: process.env.ADMIN_API_M2M_CLIENT_SECRET,
    };

    const response = await axiosAdminClient.post(
        "/m2m/authenticate", m2m_credentials
    );

    token = response.data.token;
    cache.set("token", token);

    return token;
}

function getHeaders(token) {
    return {
        Authorization: `Bearer ${token}`,
    };
}

async function getUserById(id) {
    const token = await getToken();
    const headers = getHeaders(token);

    const response = await axiosAdminClient.get("v1/users/find_one", {
        headers,
        params: {
            ivd_id: id,
        },
    });
    console.log(response.data);
    
    const jsonString = JSON.stringify(response.data);
    const parsedJson = JSON.parse(jsonString);
    // asi obtienes un atributo en especifico
    //console.log(parsedJson.data.type);  
    return parsedJson;
}

//getUserById(100023);

module.exports = { getUserById };