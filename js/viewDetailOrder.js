// Get order id
let urlParams = new URLSearchParams(window.location.search);
let orderId = urlParams.get("orderid");

// Render main info of orders
const renderCreateAt = (createAt) => {
    document.getElementById("created_at").value = formatDateISOtoVN(createAt);
}

const renderAppointmentDay = (appointmentDay) => {
    let dateAppointmentDay = new Date(appointmentDay);
    let year = dateAppointmentDay.getFullYear();
    let month = dateAppointmentDay.getMonth() + 1;
    let day = dateAppointmentDay.getDate();
    if (month < 10) {
        month = `0${month}`
    }
    document.getElementById("appointment_day").value = `${year}-${month}-${day}`;
}

const renderStatusDto = (orderStatusDto) => {
    let orderStatusEle = document.getElementById("order-status");
    orderStatusEle.innerHTML = orderStatusDto.name;
    orderStatusEle.setAttribute("order-status", orderStatusDto.id);
}

const selectStatus = (e) => {
    let selectItem = e.target;
    let idStatus = selectItem.getAttribute("data-status");
    let nameStatus = selectItem.innerHTML;
    document.getElementById("order-status").innerHTML = nameStatus;
    document.getElementById("order-status").setAttribute("order-status", idStatus);
}

const renderClient = (orderClientDto) => {
    document.getElementById("client_name").value = orderClientDto.username;
    document.getElementById("client_phone").value = orderClientDto.phoneNumber;
}

const renderNumber = (number, ele) => {
    let strNumber = formatNumber(number);
    document.getElementById(ele).value = strNumber;
}

const renderSuit = (orderSuitDtoList) => {
    let content = ``;
    for (const suit of orderSuitDtoList) {
        content += `
        <div class="item suit">
            <div class="item_name">Loại:<span>Áo</span></div>
            <div class="item_properties">Kiểu: <span>${suit.kieuAo}</span></div>
            <div class="item_price">Đơn giá: <span>${formatNumber(Number(suit.price))}</span></div>
            <div class="item_amount">Số lượng: <span>${suit.amount}</span></div>
            <div class="item_total">Tổng tiền: <span>${formatNumber(Number(suit.total))}</span></div>
            <div class="item_button" data-item-id="${suit.id}">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#suit" onclick="getDetailSuit(event)">
                    <i class="fa-solid fa-pen"></i>
                </button>
            </div>
        </div>
        `
    }
    document.getElementById("list_item").innerHTML += content;
}

const renderTrousers = (orderTrousersDtoList) => {
    let content = ``;
    for (const trousers of orderTrousersDtoList) {
        content += `
        <div class="item trousers">
            <div class="item_name">Loại: <span>Quần</span></div>
            <div class="item_properties">Kiểu: <span>${trousers.formQuan}</span></div>
            <div class="item_price">Đơn giá: <span>${formatNumber(Number(trousers.price))}</span></div>
            <div class="item_amount">Số lượng: <span>${trousers.amount}</span></div>
            <div class="item_total">Tổng tiền: <span>${formatNumber(Number(trousers.total))}</span></div>
            <div class="item_button" data-trousers-id="${trousers.id}">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#trousers" onclick="getDetailTrousers(event)">
                    <i class="fa-solid fa-pen"></i>
                </button>
            </div>
        </div>
        `
    }
    document.getElementById("list_item").innerHTML += content;
}

const renderAccessory = (orderAccessoryDtoList) => {
    let content = ``;
    for (const accessory of orderAccessoryDtoList) {
        content = `
        <div class="item accessory">
            <div class="item_name">Loại: <span>Phụ Kiện</span></div>
            <div class="item_properties">Tên: <span>${accessory.nameAccessory}</span></div>
            <div class="item_price">Đơn giá: <span>${formatNumber(Number(accessory.price))}</span></div>
            <div class="item_amount">Số lượng: <span>${accessory.amount}</span></div>
            <div class="item_total">Tổng tiền: <span>${formatNumber(Number(accessory.total))}</span></div>
        </div>
        
        `
    }
    document.getElementById("list_item").innerHTML += content;

}


// Select attribute when user choosse
const selectDetailItem = (e) => {
    // Get element select
    let eleSelect = e.currentTarget;
    let value = eleSelect.innerHTML.trim();
    // Get button 
    let eleParent = eleSelect.parentElement.parentElement.parentElement;
    let mainEle = eleParent.querySelector(".btn-info");
    mainEle.innerHTML = value;
    mainEle.setAttribute("data-item", value)
}

// Render Attribute of suit or trousers

const renderAttribute = (eleID, value) => {
    let focusEle = document.getElementById(eleID);
    if (value) {
        focusEle.innerHTML = value;
        focusEle.setAttribute("data-item", value);
    } else {
        focusEle.innerHTML = "Chọn"
        focusEle.setAttribute("data-item", "");
    }
}

const renderSuitDetail = (orderSuitDto) => {
    let {
        amount,
        fabric,
        formAo,
        kieuAo,
        kieuNut,
        kieuTui,
        kieuVeAo,
        lotAo,
        price,
        total,
        note,
        id
    } = orderSuitDto
    renderAttribute("kieuao", kieuAo);
    renderAttribute("formao", formAo);
    renderAttribute("kieunut", kieuNut);
    renderAttribute("kieutui", kieuTui);
    renderAttribute("kieuveao", kieuVeAo);
    renderAttribute("lotao", lotAo);

    document.getElementById("fabric_suit").value = fabric;
    document.getElementById("note_suit").value = note;
    document.getElementById("price_suit").value = formatNumber(price);
    document.getElementById("amount_suit").value = formatNumber(amount);
    document.getElementById("total_suit").value = formatNumber(total);
    document.getElementById("suit_attribute").setAttribute("data-item-id", id);
}

const renderTrouserDetail =(orderTrousersDto)=>{
    let {
        amount,
        fabric,
        formQuan,
        id,
        kieuLai,
        kieuLung,
        kieuTuiSau,
        kieuTuiTruoc,
        note,
        price,
        soTui,
        total,
    } = orderTrousersDto

    renderAttribute("formquan", formQuan);
    renderAttribute("kieulung", kieuLung);
    renderAttribute("kieutuitruoc", kieuTuiTruoc);
    renderAttribute("kieutuisau", kieuTuiSau);
    renderAttribute("sotuisau", soTui);
    renderAttribute("kieulai", kieuLai);

    document.getElementById("fabric_trousers").value =fabric
    document.getElementById("note_trousers").value = note
    document.getElementById("price_trousers").value = formatNumber(price);
    document.getElementById("amount_trousers").value = formatNumber(amount);
    document.getElementById("total_trousers").value = formatNumber(total);

    document.getElementById("trousers_attribute").setAttribute("data-item-id", id);
}
// Get detail
const getDetailSuit = (e) => {
    let ele = e.currentTarget.parentElement;
    let suitId = ele.getAttribute("data-item-id");
    axios({
        method: "Get",
        url: `http://localhost:8080/suit/detail/${suitId}`
    }).then(res => {
        let orderSuitDto = res.data.object;
        renderSuitDetail(orderSuitDto);
    }).catch(err => {
        alert(err)
    })
}

const getDetailTrousers = (e)=>{
    let ele = e.currentTarget.parentElement;
    let trousersId = ele.getAttribute("data-trousers-id");
    axios({
        method: "Get",
        url: `http://localhost:8080/trousers/detail/${trousersId}`
    }).then(res =>{
        let orderTrousersDto = res.data.object;
        renderTrouserDetail(orderTrousersDto);

    }).catch(err =>{
        console.log(err);
    })
}

// Caculate total 
const caculateTotalSuit = () => {
    let amountSuit = formatNumberToRaw(document.getElementById("amount_suit").value);
    let priceSuit = formatNumberToRaw(document.getElementById("price_suit").value);
    let total = amountSuit * priceSuit;
    document.getElementById("total_suit").value = formatNumber(total);
}

const caculateTotalTrousers = ()=>{
    let amountTrousers = formatNumberToRaw(document.getElementById("amount_trousers").value);
    let priceTrousers = formatNumberToRaw(document.getElementById("price_trousers").value);
    let total = amountTrousers*priceTrousers;
    document.getElementById("total_trousers").value = formatNumber(total);
}
// Create request 
const createOrderUpdateRequest = ()=>{
    let appointmentDay = getDateFormInput("appointment_day");
    let payment = formatNumberToRaw(document.getElementById("payment").value);
    let id = document.getElementById("order-status").getAttribute("order-status");
    return {
        appointmentDay,
        payment,
        orderStatusRequest:{
            id
        }
    }
}

const createOrderSuitRequest = () => {
    let kieuAo = document.getElementById("kieuao").getAttribute("data-item");
    let formAo = document.getElementById("formao").getAttribute("data-item");
    let kieuVeAo = document.getElementById("kieuveao").getAttribute("data-item");
    let lotAo = document.getElementById("lotao").getAttribute("data-item");
    let kieuNut = document.getElementById("kieunut").getAttribute("data-item");
    let kieuTui = document.getElementById("kieutui").getAttribute("data-item");
    
    let price = formatNumberToRaw(document.getElementById("price_suit").value);
    let amount = formatNumberToRaw(document.getElementById("amount_suit").value);
    let note = document.getElementById("note_suit").value;
    let fabric = document.getElementById("fabric_suit").value;
    return new OrderSuitRequest(kieuAo,formAo,kieuVeAo,lotAo,kieuNut,
        kieuTui,price,amount, note, fabric)
}

const createOrderTrouserRequest = ()=>{
    let formQuan =  document.getElementById("formquan").getAttribute("data-item");
    let kieuLung = document.getElementById("kieulung").getAttribute("data-item");
    let kieuTuiTruoc = document.getElementById("kieutuitruoc").getAttribute("data-item");
    let kieuTuiSau = document.getElementById("kieutuisau").getAttribute("data-item");
    let soTui = document.getElementById("sotuisau").getAttribute("data-item");
    let kieuLai = document.getElementById("kieulai").getAttribute("data-item");

    let fabric = document.getElementById("fabric_trousers").value;
    let note = document.getElementById("note_trousers").value;
    let price = formatNumberToRaw(document.getElementById("price_trousers").value);
    let amount = formatNumberToRaw(document.getElementById("amount_trousers").value);

    return new OrderTrouderRequest(formQuan, kieuLung, kieuTuiTruoc, kieuTuiSau, soTui,
        kieuLai, price, amount, note, fabric);
}
// Event call API
document.getElementById("update_suit").onclick = ()=>{
    let suitId = document.getElementById("suit_attribute").getAttribute("data-item-id");
    let orderSuitRequest = createOrderSuitRequest();
    axios({
        method: "put", 
        url: `http://localhost:8080/suit/${suitId}`,
        data: orderSuitRequest
    }).then(res =>{
        document.getElementById("close_update_suit").click();
        location.reload();
    }).catch(err =>{
        alert(err)
    })
    
}

document.getElementById("update_trousers").onclick = ()=>{
    let orderTrousersRequest = createOrderTrouserRequest();
    let trousersId = document.getElementById("trousers_attribute").getAttribute("data-item-id");
    axios({
        method: "put",
        url: `http://localhost:8080/trousers/${trousersId}`,
        data: orderTrousersRequest
    }).then(res =>{
        document.getElementById("close_update_trousers").click();
        location.reload();
    }).catch(err =>{
        alert(err)
    })
}

document.getElementById("update_main_orders").onclick = ()=>{
    let orderUpdateRequest = createOrderUpdateRequest();
    axios({
        url : `http://localhost:8080/order/update/${orderId}`,
        method: "put",
        data: orderUpdateRequest
    }).then(res =>{
        alert("Đã cập nhật thành công")
    }).catch(err =>{
        alert(err)
    })
}

// Load
axios({
    url: `http://localhost:8080/order/detail/${orderId}`,
    method: "get"
}).then(res => {
    // console.log(res.data.object);
    let {
        appointmentDay,
        orderStatusDto,
        orderClientDto,
        createAt,
        orderSuitDtoList,
        orderAccessoryDtoList,
        orderTrousersDtoList,
        payment,
        total
    } = res.data.object;
    document.getElementById("list_item").innerHTML = "";
    renderCreateAt(createAt);
    renderAppointmentDay(appointmentDay);
    renderStatusDto(orderStatusDto);
    renderClient(orderClientDto);
    renderNumber(total, "total");
    renderNumber(payment, "payment");
    if (orderSuitDtoList) {
        renderSuit(orderSuitDtoList);
    }
    if (orderTrousersDtoList) {
        renderTrousers(orderTrousersDtoList);
    }
    if (orderAccessoryDtoList) {
        renderAccessory(orderAccessoryDtoList);
    }

}).catch(err => {
    alert(err)
})

