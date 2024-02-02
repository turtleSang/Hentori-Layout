const rootUrl = "http://localhost:8080";
let token = localStorage.getItem("token");
let header = { token }


const callAPI = async (method, url, params, header, data) => {
    try {
        let res = await axios({
            method,
            url,
            params,
            header,
            data
        })
        return res.data;
    } catch (error) {
        throw error;
    }
}