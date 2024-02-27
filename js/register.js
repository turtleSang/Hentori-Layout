let timeoutId;

// Check username
document.getElementById("username").addEventListener("input", (event) => {
    let eleInput = event.currentTarget
    let username = eleInput.value;
    let check = checkUsername(username);
    if (!check) {
        document.getElementById("alert").innerText = "Tên Đăng nhập phải có 6-10 chữ và không có ký tự đặc biệt"
        document.getElementById("alert").classList.remove("d-none");
        document.getElementById("check_username").style.display = "none";
        return;
    } else {
        document.getElementById("alert").classList.add("d-none");
    }

    let url = `${rootUrl}/admin/check`;
    let method = "post";

    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
        document.getElementById("load").classList.remove("d-none")
        try {
            let res = await callAPI(method, url, {}, header, { username });
            document.getElementById("check_username").style.display = "block";
            eleInput.setAttribute("data-check", res.check);
        } catch (error) {
            document.getElementById("alert").innerText = "Tên Đăng nhập đã tồn tại"
            document.getElementById("check_username").style.display = "none";
            document.getElementById("alert").classList.remove("d-none");
            eleInput.setAttribute("data-check", "");
        }
        document.getElementById("load").classList.add("d-none")


    }, 500)

})

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


// Register
document.getElementById("register").onclick = async () => {
    let usernameEle = document.getElementById("username");
    let password = document.getElementById("password").value;
    let comfirmPassword = document.getElementById("comfirm-password").value;
    let checkName = Boolean(usernameEle.getAttribute("data-check"));
    let checkPass = Boolean(document.getElementById("password").getAttribute("data-check"))
    let checkConfirm = password == comfirmPassword

    if (!checkConfirm) {
        document.getElementById("alert").classList.remove("d-none");
        document.getElementById("alert").innerText = "Mật khẩu và xác nhận mật khẩu không đúng";
        return;
    }



    if (checkPass && checkName) {
        document.getElementById("load").classList.remove("d-none");
        document.getElementById("alert").classList.add("d-none");
        let username = usernameEle.value;
        let url = `${rootUrl}/admin/create`;
        let method = "post";
        try {
            await callAPI(method, url, {}, header, { username, password });
            window.location.href = "./confirmadmin.html";
        } catch (error) {
            document.getElementById("load").classList.remove("d-none");

            document.getElementById("alert").classList.remove("d-none");
            document.getElementById("alert").innerText = "Vui lòng điền thông tin đúng";
            return;
        }
    }
    document.getElementById("load").classList.remove("d-none");
    document.getElementById("alert").classList.remove("d-none");
    document.getElementById("alert").innerText = "Vui lòng điền thông tin đúng";
    return;


}