const rootUrl = "http://localhost:8080";
let token = localStorage.getItem("token");
let headers = { token };

let forbidenStatus = Number("403");



// const url = window.location.origin;
const callAPI = async (method, url, params, headers, data) => {
    try {
        let res = await axios({
            method,
            url,
            params,
            headers,
            data
        })
        return res.data;
    } catch (error) {
        throw error;
    }
}

const handleFobiden = (err) => {
    let { response: { status } } = err;
    if (status === forbidenStatus) {
        window.location.replace("./index.html");
    }
}





