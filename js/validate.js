const checkPhoneNumber = (phoneNumber) => {
    let regex = /^\d+$/;
    if (regex.test(phoneNumber) && phoneNumber.length == 10) {
        return true;
    } else {
        return false;
    }
}
const checkNumber = (phoneNumber) => {
    let regex = /^[1-9]\d*$/
    if (regex.test(phoneNumber)) {
        return true;
    } else {
        return false;
    }
}

const checkUsername = (username) => {
    let regexPattern = /^[a-zA-Z0-9]+$/;
    if (!regexPattern.test(username) || username.length < 6 || username.length > 10) {
        return false;
    }
    return true;
}

const checkPassword = (password) => {
    let regexPattern = /^[a-zA-Z0-9]+$/;
    if (!regexPattern.test(password) || password.length < 6 || password.length > 10) {
        return false;
    }
    return true;
}