document.getElementById("confirm").onclick = async () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let otp = document.getElementById("otp-password").value;

    let checkName = checkUsername(username);
    let checkPass = checkPassword(password);
    if (checkName && checkPass && otp) {
        document.getElementById("alert").classList.add("d-none");
        document.getElementById("load").classList.remove("d-none");
        let method = "post";
        let url = `${rootUrl}/admin/confirm`;
        let data = {
            username,
            password,
            otp
        }
        try {
            let res = await callAPI(method, url, {}, headers, data)
            window.location.href = "./index.html";
        } catch (error) {
            console.log(error);
            document.getElementById("alert").innerText = "Vui lòng xem lại thông tin hoặc tạo tài khoản mới";
            document.getElementById("alert").classList.remove("d-none");
        }
        document.getElementById("load").classList.add("d-none");
    } else {
        document.getElementById("alert").innerHTML = "Vui lòng điền thông tin";
        document.getElementById("alert").classList.remove("d-none");
    }
}