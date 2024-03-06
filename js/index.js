document.getElementById("signin").onclick = async () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let url = `${rootUrl}/admin/signin`;
    if (!username || !password) {
        document.getElementById('alert').innerHTML = "Không được để trống tên đăng nhập và password"
        document.getElementById('alert').classList.toggle("d-none");
        return;
    }
    try {
        let res = await callAPI("POST", url, "", headers, { username, password });

        let { check, object } = res
        if (check) {
            localStorage.setItem("token", object);
            window.location.href = `./createorder.html`;
        }

    } catch (error) {
        console.log(error);
        document.getElementById('alert').innerHTML = "Sai tên đăng nhập hoặc mật khẩu"
        document.getElementById('alert').classList.toggle("d-none");
    }
}

document.getElementById("register").onclick = () => {
    window.location.href = `./register.html`;
}