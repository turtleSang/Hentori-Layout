const checkPhoneNumber = (phoneNumber) =>{
    let regex = /^\d+$/;
    if( regex.test(phoneNumber) && phoneNumber.length == 10){
       return true;
    }else{
        return false;
    }
}