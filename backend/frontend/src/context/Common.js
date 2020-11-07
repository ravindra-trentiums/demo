import axios from "axios";
// import { useHistory } from "react-router-dom";
import { BASE_URL } from "../shared/settings";
const createHistory = require("history").createHashHistory;
var history = createHistory();

export const postData = (
    url,
    data,
    options = {
        method_type: "post",
    }
) => {
    
    var request_url = BASE_URL + url;

    if (options.without_base_url) {
        request_url = url;
    }
    return new Promise((resolve, reject) => {
        axios({
            method: options.method_type,
            url: request_url,
            data: data,
            headers: {
                Authorization: "Bearer ",
            },
        })
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                if (error.response) {
                    history.push("/");
                    reject(error.response);
                } else {
                    reject({ data: { error: 'Network Error' } });
                }
            });
    });
};

