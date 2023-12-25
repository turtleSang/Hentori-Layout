const formatNumber = (numberRaw)=>{
    let number = Number(numberRaw);
    return number.toLocaleString("de-DE");
}
const formatDateToDefault = (date)=>{
    return new Date(date);
}
const formatDateISOtoVN = (date)=>{
    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth()+1;
    let year = newDate.getFullYear();
    return `${day}/${month}/${year}`
}
const getDateFormInput = (element_id)=>{
    let appointmentDay = document.getElementById("element_id").value;
    let year = appointmentDay.slice(0,4);
    let month = appointmentDay.slice(5,7);
    let day = appointmentDay.slice(8,10);
    return `${day}/${month}/${year}`;
}

const formatNumberToRaw = (number)=>{
    return number.replace(/\./g, "");
}

const formatInputNumber = (e)=>{
    let regexNumber =/^\d+$/;
    let ele = e.target;
    let value = formatNumberToRaw(ele.value);
    if (regexNumber.test(value)) {
        ele.value = formatNumber(value);
    }else{
        ele.value ="";
    }   
}