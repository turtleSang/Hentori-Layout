const checkPhoneNumber = (phoneNumber) =>{
    let regex = /^\d+$/;
    if( regex.test(phoneNumber) && phoneNumber.length == 10){
       return true;
    }else{
        return false;
    }
}
const checkNumber = (phoneNumber) =>{
    let regex = /^[1-9]\d*$/
    if (regex.test(phoneNumber)) {
        return true;
    }else{
        return false;
    }
}