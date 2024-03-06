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
    if (day < 10) {
        day = `0${day}`
    }
    document.getElementById("appointment_day").value = `${year}-${month}-${day}`;
}

const renderStatusDto = (orderStatusDto) => {
    let orderStatusEle = document.getElementById("order-status");
    orderStatusEle.innerHTML = orderStatusDto.name;
    orderStatusEle.setAttribute("order-status", orderStatusDto.id);
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
            <div class="item_name">Loại:<span>Suit</span></div>
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

const renderShirt = (orderShirtDtoList) => {
    let content = ``;
    for (const shirt of orderShirtDtoList) {
        content += `
        <div class="item suit">
            <div class="item_name">Loại:<span>Sơ mi</span></div>
            <div class="item_properties">Kiểu: <span>${shirt.kieuCo}</span></div>
            <div class="item_price">Đơn giá: <span>${formatNumber(Number(shirt.price))}</span></div>
            <div class="item_amount">Số lượng: <span>${shirt.amount}</span></div>
            <div class="item_total">Tổng tiền: <span>${formatNumber(Number(shirt.total))}</span></div>
            <div class="item_button" data-shirt-id="${shirt.id}">
                <button data- type="button" onclick="getDetailShirt(event)" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#shirt">
                    <i class="fa-solid fa-pen"></i>
                </button>
            </div>
        </div>
        `
    }
    document.getElementById("list_item").innerHTML += content;
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
    console.log(orderSuitDto);
    let {
        amount,
        fabric,
        formAo,
        kieuAo,
        kieuNut,
        kieuXe,
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
    renderAttribute("kieuXe", kieuXe);

    document.getElementById("fabric_suit").value = fabric;
    document.getElementById("note_suit").value = note;
    document.getElementById("price_suit").value = formatNumber(price);
    document.getElementById("amount_suit").value = formatNumber(amount);
    document.getElementById("total_suit").value = formatNumber(total);
    document.getElementById("suit_attribute").setAttribute("data-item-id", id);
}

const renderTrouserDetail = (orderTrousersDto) => {
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

    document.getElementById("fabric_trousers").value = fabric
    document.getElementById("note_trousers").value = note
    document.getElementById("price_trousers").value = formatNumber(price);
    document.getElementById("amount_trousers").value = formatNumber(amount);
    document.getElementById("total_trousers").value = formatNumber(total);

    document.getElementById("trousers_attribute").setAttribute("data-item-id", id);
}

const renderShirtDetail = (orderShirtDtoList) => {
    let {
        id,
        kieuCo,
        mangSec,
        kieuDinh,
        price,
        total,
        note,
        amount,
        fabric
    } = orderShirtDtoList;
    renderAttribute("kieuCo", kieuCo);
    renderAttribute("mangSec", mangSec);
    renderAttribute("kieuDinh", kieuDinh);

    document.getElementById("fabric_shirt").value = fabric
    document.getElementById("note_shirt").value = note
    document.getElementById("price_shirt").value = formatNumber(price);
    document.getElementById("amount_shirt").value = formatNumber(amount);
    document.getElementById("total_shirt").value = formatNumber(total);

    document.getElementById("shirt_attribute").setAttribute("data-item-id", id)
}
// Get detail
const getDetailSuit = async (e) => {
    turnOnLoadSection();
    let ele = e.currentTarget.parentElement;
    let suitId = ele.getAttribute("data-item-id");
    let method = "Get";
    let url = `${rootUrl}/suit/detail/${suitId}`;
    turnOnLoadSection();
    try {
        let { object } = await callAPI(method, url, {}, headers, {});
        renderSuitDetail(object);
    } catch (error) {
        handleFobiden(error);
        alert(error);
    }
    turnOffLoadSection();

}

const getDetailTrousers = async (e) => {
    turnOnLoadSection();
    let ele = e.currentTarget.parentElement;
    let trousersId = ele.getAttribute("data-trousers-id");
    let method = "Get";
    let url = `${rootUrl}/trousers/detail/${trousersId}`;
    try {
        let { object } = await callAPI(method, url, {}, headers, {})
        renderTrouserDetail(object);
    } catch (error) {
        handleFobiden(error);
        alert(error);
    }
    turnOffLoadSection();
}

const getDetailShirt = async (e) => {
    turnOnLoadSection();
    let ele = e.currentTarget.parentElement;
    let shirtId = ele.getAttribute("data-shirt-id");
    let method = "Get";
    let url = `${rootUrl}/shirt/detail/${shirtId}`;
    try {
        let { object } = await callAPI(method, url, {}, headers, {})
        renderShirtDetail(object);
    } catch (error) {
        handleFobiden(error);
        alert(error);
    }
    turnOffLoadSection();
}

// Caculate total 
const caculateTotalSuit = () => {
    let amountSuit = formatNumberToRaw(document.getElementById("amount_suit").value);
    let priceSuit = formatNumberToRaw(document.getElementById("price_suit").value);
    let total = amountSuit * priceSuit;
    document.getElementById("total_suit").value = formatNumber(total);
}

const caculateTotalTrousers = () => {
    let amountTrousers = formatNumberToRaw(document.getElementById("amount_trousers").value);
    let priceTrousers = formatNumberToRaw(document.getElementById("price_trousers").value);
    let total = amountTrousers * priceTrousers;
    document.getElementById("total_trousers").value = formatNumber(total);
}

const caculateTotalShirt = () => {
    let amountShirt = formatNumberToRaw(document.getElementById("amount_shirt").value);
    let price_shirt = formatNumberToRaw(document.getElementById("price_shirt").value);
    let total = amountShirt * price_shirt;
    document.getElementById("total_shirt").value = formatNumber(total);
}
// Create request 
const createOrderUpdateRequest = () => {
    let appointmentDay = getDateFormInput("appointment_day");
    let payment = formatNumberToRaw(document.getElementById("payment").value);
    let id = document.getElementById("order-status").getAttribute("order-status");
    return {
        appointmentDay,
        payment,
        orderStatusRequest: {
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
    let kieuXe = document.getElementById("kieuXe").getAttribute("data-item");

    let price = formatNumberToRaw(document.getElementById("price_suit").value);
    let amount = formatNumberToRaw(document.getElementById("amount_suit").value);
    let note = document.getElementById("note_suit").value;
    let fabric = document.getElementById("fabric_suit").value;
    return new OrderSuitRequest(kieuAo, formAo, kieuVeAo, lotAo, kieuXe, kieuNut, kieuTui,
        price, amount, note, fabric);
}

const createOrderTrouserRequest = () => {
    let formQuan = document.getElementById("formquan").getAttribute("data-item");
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

const createOrderShirtRequest = () => {
    let kieuCo = document.getElementById("kieuCo").innerHTML;
    let mangSec = document.getElementById("mangSec").innerHTML;
    let kieuDinh = document.getElementById("kieuDinh").innerHTML;
    let note = document.getElementById("fabric_shirt").value;
    let fabric = document.getElementById("note_shirt").value;
    let price = formatNumberToRaw(document.getElementById("price_shirt").value);
    let amount = formatNumberToRaw(document.getElementById("amount_shirt").value);

    return new OrderShirtRequest(kieuCo, mangSec, kieuDinh, note, fabric, price, amount);
}
// Chagne status complete
const changeStatus = () => {
    let eleStatus = document.getElementById("order-status");
    let idStatus = eleStatus.getAttribute("order-status");
    console.log(idStatus);
    if (idStatus == 3) {
        let total = document.getElementById("total").value;
        document.getElementById("payment").value = total;
    }
}
// Event call API
document.getElementById("update_suit").onclick = async () => {
    let suitId = document.getElementById("suit_attribute").getAttribute("data-item-id");
    let orderSuitRequest = createOrderSuitRequest();
    turnOnLoadSection();
    let method = "put"
    let url = `${rootUrl}/suit/${suitId}`;
    let data = orderSuitRequest;
    try {
        await callAPI(method, url, {}, headers, data);
        alert("Đã cập nhật thành công");
        document.getElementById("close_update_suit").click();
        location.reload();
    } catch (error) {
        handleFobiden(error);
        alert("Không thể cập nhật" + error);
    }
    turnOffLoadSection();

}

document.getElementById("update_trousers").onclick = async () => {
    let orderTrousersRequest = createOrderTrouserRequest();
    let trousersId = document.getElementById("trousers_attribute").getAttribute("data-item-id");
    turnOnLoadSection();
    let method = "put"
    let url = `${rootUrl}/trousers/${trousersId}`;
    let data = orderTrousersRequest;
    try {
        await callAPI(method, url, {}, headers, data);
        alert("Đã cập nhật thành công");
        document.getElementById("close_update_trousers").click();
        location.reload();
    } catch (error) {
        handleFobiden();
        alert("Không thể cập nhật" + error);
    }
    turnOffLoadSection();
}

document.getElementById("update_main_orders").onclick = async () => {
    turnOnLoadSection();

    let orderUpdateRequest = createOrderUpdateRequest();
    let url = `${rootUrl}/order/update/${orderId}`;
    let method = "put";
    let data = orderUpdateRequest;
    try {
        await callAPI(method, url, {}, headers, data);
        alert("Đã cập nhật thành công");
    } catch (error) {
        handleFobiden(error)
        alert(error)
    }
    turnOffLoadSection();

}

document.getElementById("update_shirt").onclick = async () => {
    let orderShirtRequest = createOrderShirtRequest();
    let shirtId = document.getElementById("shirt_attribute").getAttribute("data-item-id");
    let method = "put"
    let url = `${rootUrl}/shirt/${shirtId}`;
    let data = orderShirtRequest;
    turnOnLoadSection();
    try {
        await callAPI(method, url, {}, headers, data)
        alert("Đã cập nhật thành công");
        document.getElementById("close_update_trousers").click();
        location.reload();
    } catch (error) {
        handleFobiden(error);
        alert(error)
    }
    turnOffLoadSection();
}

document.getElementById("print_order").onclick = () => {
    window.location.href = `./printOrder.html?orderid=${orderId}`
}
// Load
axios({
    url: `${rootUrl}/order/detail/${orderId}`,
    method: "get",
    headers
}).then(res => {
    let {
        appointmentDay,
        orderStatusDto,
        orderClientDto,
        createAt,
        orderSuitDtoList,
        orderAccessoryDtoList,
        orderTrousersDtoList,
        orderShirtDtoList,
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
    if (orderShirtDtoList) {
        renderShirt(orderShirtDtoList);
    }
}).catch(err => {
    handleFobiden(err)
    alert(err)
})

