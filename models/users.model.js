const db = require('../util/database');
const apiIVD = require('../util/admin.api.client');

module.exports = class Usuario{

    constructor(mi_id, mi_username){
        this.id = mi_id;
        this.username = mi_username;
    }

    async 

    static getUserById(id) {
        /* apiIVD.getToken().then(tkn => {
            console.log('hello: ' + tkn);
            const headers = apiIVD.getHeaders(tkn);
            console.log(tkn + '  ' + headers.Authorization);
            apiIVD.axiosAdminClient.get("v1/users/find_one", {
                headers,
                params: {
                    ivd_id: id,
                },
            }).then(response => {
                const jsonString = JSON.stringify(response.data);
                const parsedJson = JSON.parse(jsonString);
                // asi obtienes un atributo en especifico
                console.log(parsedJson.data.type);  
            })

        }); */

        

        
        
    
        /* const response = await axiosAdminClient.get("v1/users/find_one", {
            headers,
            params: {
                ivd_id: id,
            },
        }); */
        
        
        /* const jsonString = JSON.stringify(response.data);
        const parsedJson = JSON.parse(jsonString);
        // asi obtienes un atributo en especifico
        console.log(parsedJson.data.type);  
        return parsedJson; */
    }
}