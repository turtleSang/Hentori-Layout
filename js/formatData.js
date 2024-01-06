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
    let appointmentDay = document.getElementById(element_id).value;
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

const addAmount = (event)=>{
    let groupElement = event.target.parentElement.parentElement;
    let amountElement = groupElement.querySelector(".amount");
    let amount = Number(amountElement.innerHTML) + 1;
    amountElement.innerHTML = amount;
    groupElement.querySelector(".btn-minus").disabled = false;
}

const minusAmount = (event)=>{
    let groupElement = event.target.parentElement.parentElement;
    let amountElement = groupElement.querySelector(".amount");
    let amount = Number(amountElement.innerHTML) -1;
    if (amount > 1) {
        amountElement.innerHTML = amount;
    }else{
        amountElement.innerHTML = 1;
        groupElement.querySelector(".btn-minus").disabled = true;
    }
}
// Select attribute when user choosse
const selectDetailItem = (e) => {
    e.preventDefault();
    // Get element select
    let eleSelect = e.currentTarget;
    let value = eleSelect.innerHTML.trim();
    // Get button 
    let eleParent = eleSelect.parentElement.parentElement.parentElement;
    let mainEle = eleParent.querySelector(".btn-dropdown");

    mainEle.innerHTML = value;
    mainEle.classList.add("btn-dropdown-selected")
    mainEle.setAttribute("data-item", value)
}

const selectStatus = (e) => {
    let selectItem = e.target;
    let idStatus = selectItem.getAttribute("data-status");
    let nameStatus = selectItem.innerHTML;
    document.getElementById("order-status").innerHTML = nameStatus;
    document.getElementById("order-status").setAttribute("order-status", idStatus);
}