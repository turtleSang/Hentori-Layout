document.getElementById("find_user").onclick = async () => {
    let username = document.getElementById("username").value;
    let url = `${rootUrl}/admin/update/check`;
    let method = "post"
    try {
        document.getElementById("load").classList.remove("d-none");
        let res = await callAPI(method, url, {}, headers, { username })
        document.getElementById("reset-form").style.display = "block";
        document.getElementById("alert").classList.add("d-none");
        document.getElementById("username").disabled = true;
    } catch (error) {
        document.getElementById("alert").innerHTML = "Tên đăng nhập không tồn tại hoặc đã yêu cầu cấp lại mật khẩu"
        document.getElementById("alert").classList.remove("d-none");

    }
    document.getElementById("load").classList.add("d-none");

}

// CheckPassword
document.getElementById("password").addEventListener("input", (event) => {
    let elePassword = event.currentTarget;
    let txtPassword = event.currentTarget.value;
    let check = checkPassword(txtPassword);
    if (check) {
        document.getElementById("alert").classList.add("d-none");
        elePassword.setAttribute("data-check", check);
    } else {
        document.getElementById("alert").classList.remove("d-none");
        document.getElementById("alert").innerText = "Password phải có 6 - 10 chữ và không có ký tự đặc biệt";
        elePassword.setAttribute("data-check", "");
    }
})

document.getElementById("reset").onclick = async () => {
    document.getElementById("load").classList.remove("d-none");
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let comfirmPassword = document.getElementById("comfirm-password").value;
    let checkPass = Boolean(document.getElementById("password").getAttribute("data-check"))
    let checkConfirm = password == comfirmPassword;
    let otp = document.getElementById("otp-password").value;

    if (!checkConfirm || !checkPass) {
        document.getElementById("alert").classList.remove("d-none");
        document.getElementById("alert").innerText = "Mật khẩu và xác nhận mật khẩu không đúng";
        document.getElementById("load").classList.add("d-none");
        return;
    }
    let data = { username, password, otp };
    let url = `${rootUrl}/admin/update`;
    let method = "post";
    try {
        let res = await callAPI(method, url, {}, header, data)
        alert("Đã cập nhật mật khẩu thành công");
        window.location.href = "./index.html"
    } catch (error) {
        console.log(error);
    }
    document.getElementById("load").classList.add("d-none");
}