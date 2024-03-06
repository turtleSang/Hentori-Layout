//Variable
let orderRequest;

// Suport Function
const setValue = (eleId, value) => {
    document.getElementById(eleId).value = value;
}

// Render info
const renderClientSuit = (clientSuitDto) => {
    if (clientSuitDto) {
        setValue("doxuoivai", clientSuitDto.doXuoiVai);
        setValue("dangvai", clientSuitDto.dangVai);
        setValue("rongvai", clientSuitDto.rongVai);
        setValue("hacaikhuy", clientSuitDto.hacaiKhuy);
        setValue("daitay", clientSuitDto.daiTay);
        setValue("hanguc", clientSuitDto.haNguc);
        setValue("daiao", clientSuitDto.daiAo);
        setValue("haeo", clientSuitDto.haEo);
        setValue("baptaykhuytay", clientSuitDto.bapTayKhuyTay);
        setValue("habung", clientSuitDto.haBung);
        setValue("mangsec", clientSuitDto.mangSec);
        setValue("vongco", clientSuitDto.vongCo);
        setValue("vongnach", clientSuitDto.vongNach);
        setValue("hakhuy", clientSuitDto.haKhuy);
        setValue("vongeobung", clientSuitDto.vongEoBung);
        setValue("ngangbungts", clientSuitDto.ngangBungTS);
        setValue("mongao", clientSuitDto.mongAo);
        setValue("hahomlung", clientSuitDto.haHomLung);
        setValue("hachombung", clientSuitDto.haChomBung);
    } else {
        setValue("doxuoivai", "");
        setValue("dangvai", "");
        setValue("rongvai", "");
        setValue("hacaikhuy", "");
        setValue("daitay", "");
        setValue("hanguc", "");
        setValue("daiao", "");
        setValue("haeo", "");
        setValue("baptaykhuytay", "");
        setValue("habung", "");
        setValue("mangsec", "");
        setValue("vongco", "");
        setValue("vongnach", "");
        setValue("hakhuy", "");
        setValue("vongeobung", "");
        setValue("ngangbungts", "");
        setValue("mongao", "");
        setValue("hahomlung", "");
        setValue("hachombung", "");
    }
}

const renderClientTrousers = (clientTrousersDto) => {

    if (clientTrousersDto) {
        setValue("vonglung", clientTrousersDto.vongLung);
        setValue("ngangbung", clientTrousersDto.ngangBung);
        setValue("vongday", clientTrousersDto.vongDay);
        setValue("duigiua", clientTrousersDto.duiGiua);
        setValue("vongmong", clientTrousersDto.vongMong);
        setValue("daiquan", clientTrousersDto.daiQuan);
        setValue("vongdui", clientTrousersDto.vongDui);
        setValue("vonggoi", clientTrousersDto.vongGoi);
        setValue("vongbapchan", clientTrousersDto.vongBapChan);
        setValue("ongquan", clientTrousersDto.ongQuan);
    } else {
        setValue("vonglung", "");
        setValue("ngangbung", "");
        setValue("vongday", "");
        setValue("duigiua", "");
        setValue("vongmong", "");
        setValue("daiquan", "");
        setValue("vongdui", "");
        setValue("vonggoi", "");
        setValue("vongbapchan", "");
        setValue("ongquan", "");
    }
}

const checkPhoneNumberInput = (phoneNumber) => {
    let eleNofiPhone = document.getElementById("nofication_phone_number");
    let buttonSearch = document.getElementById("find_user");

    if (phoneNumber) {
        if (checkPhoneNumber(phoneNumber)) {
            eleNofiPhone.innerHTML = `<i class="fa-solid fa-check"></i>`;
            eleNofiPhone.classList.remove("denine_phoneNumber");
            eleNofiPhone.classList.add("accept_phoneNumber");
            buttonSearch.disabled = false;
        } else {
            eleNofiPhone.innerHTML = `<i class="fa-solid fa-x"></i>`;
            eleNofiPhone.classList.remove("accept_phoneNumber");
            eleNofiPhone.classList.add("denine_phoneNumber");
            buttonSearch.disabled = true;
        }
    } else {
        eleNofiPhone.innerHTML = "";
        eleNofiPhone.classList.remove("denine_phoneNumber");
        eleNofiPhone.classList.remove("accept_phoneNumber");
        buttonSearch.disabled = true;
    }


}

const renderFormConfirmOrder = (orderRequest) => {
    document.getElementById("client_name_confirm").innerHTML = document.getElementById("client_name").getAttribute("data-name");
    document.getElementById("client_phone_confirm").innerHTML = document.getElementById("client_phone").value;
    document.getElementById("appointment_day_confirm").innerHTML = orderRequest.appointmentDay;
    document.getElementById("confirm_order_table").innerHTML = "";

    if (orderRequest.orderTrousersRequestList) {
        renderTrousersConfirm(orderRequest.orderTrousersRequestList);
    }
    if (orderRequest.orderSuitRequestList) {
        renderSuitConfirm(orderRequest.orderSuitRequestList);
    }
    if (orderRequest.orderAccessoryRequestList) {
        renderAccessoryConfirm(orderRequest.orderAccessoryRequestList);
    }
    if (orderRequest.orderShirtRequestList) {
        renderShirtConfirm(orderRequest.orderShirtRequestList);
    }
    renderTotalBill(orderRequest);

}

const renderSuitConfirm = (orderSuitRequestList) => {
    let content = "";
    for (const item of orderSuitRequestList) {
        let price = Number(item.price);
        let amount = Number(item.amount);
        let total = Number(item.price) * Number(item.amount);
        content += `
        <tr>
            <th>Suit</th>
            <td>${formatNumber(price)}</td>
            <td>${amount}</td>
            <td class="item_total text-right">${formatNumber(total)}</td>
        </tr>
       `;
    }
    document.getElementById("confirm_order_table").innerHTML += content;
}

const renderTrousersConfirm = (orderTrousersRequestList) => {
    let content = "";
    for (const item of orderTrousersRequestList) {
        let price = Number(item.price);
        let amount = Number(item.amount);
        let total = Number(item.price) * Number(item.amount);
        content += `
        <tr>
            <th>Quần</th>
            <td>${formatNumber(price)}</td>
            <td>${amount}</td>
            <td class="item_total text-right">${formatNumber(total)}</td>
        </tr>
       `;
    }
    document.getElementById("confirm_order_table").innerHTML += content;
}

const renderShirtConfirm = (orderShirtRequestList) => {
    let content = "";
    for (const item of orderShirtRequestList) {
        let price = Number(item.price);
        let amount = Number(item.amount);
        let total = Number(item.price) * Number(item.amount);
        content += `
        <tr>
            <th>Áo sơ mi</th>
            <td>${formatNumber(price)}</td>
            <td>${amount}</td>
            <td class="item_total text-right">${formatNumber(total)}</td>
        </tr>
       `;
    }
    document.getElementById("confirm_order_table").innerHTML += content;
}

const renderAccessoryConfirm = (orderAccessoryRequestList) => {
    let content = "";
    for (const item of orderAccessoryRequestList) {
        let price = Number(item.price);
        let amount = Number(item.amount);
        let total = Number(item.price) * Number(item.amount);
        content += `
        <tr>
            <th>Phụ kiện</th>
            <td>${formatNumber(price)}</td>
            <td>${amount}</td>
            <td class="item_total text-right">${formatNumber(total)}</td>
        </tr>
       `;
    }
    document.getElementById("confirm_order_table").innerHTML += content;
}

const renderTotalBill = (orderRequest) => {
    let listTrousers = orderRequest.orderTrousersRequestList;
    let listSuit = orderRequest.orderSuitRequestList;
    let listAccessory = orderRequest.orderAccessoryRequestList;
    let listShirt = orderRequest.orderShirtRequestList;
    if (!listTrousers && !listSuit && !listAccessory) {
        return;
    }
    let total = 0;
    for (const item of listTrousers) {
        total += Number(item.price) * Number(item.amount);
    }
    for (const item of listShirt) {
        total += Number(item.price) * Number(item.amount);
    }
    for (const item of listSuit) {
        total += Number(item.price) * Number(item.amount);
    }
    for (const item of listAccessory) {
        total += Number(item.price) * Number(item.amount);
    }


    document.getElementById("confirm_order_table").innerHTML +=
        `
        <tr>
            <th colspan="3" style="text-align: right;">Tổng tiền</th>
            <td>${formatNumber(total)}</td>
        </tr>
    `
        ;


}

const renderDefaultAppointmentDay = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let currentDate = `${yyyy}-${mm}-${dd}`;
    document.getElementById("appointment_day").value = currentDate;

}

/*Create Request*/
// Client
const createClientSuitRequest = () => {

    let doXuoiVai = document.getElementById("doxuoivai").value;
    let dangVai = document.getElementById("dangvai").value;
    let rongVai = document.getElementById("rongvai").value;
    let hacaiKhuy = document.getElementById("hacaikhuy").value;
    let daiTay = document.getElementById("daitay").value;
    let haNguc = document.getElementById("hanguc").value;
    let daiAo = document.getElementById("daiao").value;
    let haEo = document.getElementById("haeo").value;
    let bapTayKhuyTay = document.getElementById("baptaykhuytay").value;
    let haBung = document.getElementById("habung").value;
    let mangSec = document.getElementById("mangsec").value;
    let vongCo = document.getElementById("vongco").value;
    let vongNach = document.getElementById("vongnach").value;
    let haKhuy = document.getElementById("hakhuy").value;
    let vongEoBung = document.getElementById("vongeobung").value;
    let ngangBungTS = document.getElementById("ngangbungts").value;
    let mongAo = document.getElementById("mongao").value;
    let haHomLung = document.getElementById("hahomlung").value;
    let haChomBung = document.getElementById("hachombung").value;

    if (doXuoiVai || dangVai || rongVai || hacaiKhuy || daiTay || haNguc ||
        daiAo || haEo || bapTayKhuyTay || haBung || mangSec || vongCo ||
        vongNach || haKhuy || vongEoBung || ngangBungTS || mongAo || haHomLung
        || haChomBung) {
        return new ClientSuitRequest(doXuoiVai, dangVai, rongVai, hacaiKhuy,
            daiTay, haNguc, daiAo, haEo, bapTayKhuyTay, haBung, mangSec, vongCo, vongNach,
            haKhuy, vongEoBung, ngangBungTS, mongAo, haHomLung, haChomBung)
    }
    return null;
}

const createClientTrouserRequest = () => {
    let vongLung = document.getElementById("vonglung").value;
    let ngangBung = document.getElementById("ngangbung").value;
    let vongDay = document.getElementById("vongday").value;
    let duiGiua = document.getElementById("duigiua").value;
    let vongMong = document.getElementById("vongmong").value;
    let daiQuan = document.getElementById("daiquan").value;
    let vongDui = document.getElementById("vongdui").value;
    let vongGoi = document.getElementById("vonggoi").value;
    let vongBapChan = document.getElementById("vongbapchan").value;
    let ongQuan = document.getElementById("ongquan").value;

    if (
        vongLung ||
        ngangBung ||
        vongDay ||
        duiGiua ||
        vongMong ||
        daiQuan ||
        vongDui ||
        vongGoi ||
        vongBapChan ||
        ongQuan
    ) {
        return new ClientTrousersRequest(vongLung, ngangBung, vongDay, duiGiua, vongMong, daiQuan,
            vongDui, vongGoi, vongBapChan, ongQuan)
    }
    return null;
}

const createClientRequest = () => {
    let phoneNumber = document.getElementById("client_phone").value;
    let username = document.getElementById("client_name").value
    if (phoneNumber && username) {
        let clientSuitRequest = createClientSuitRequest();
        let clientTrousersRequest = createClientTrouserRequest();
        return new ClientRequest(username, phoneNumber, clientSuitRequest, clientTrousersRequest);
    }
    return null;
}

/*Order*/
//Suit
const createOrderSuitRequest = (orderSuitEle) => {
    let kieuAo = removeSpace(orderSuitEle.querySelector(".kieuao"));
    let formAo = removeSpace(orderSuitEle.querySelector(".formao"));
    let kieuVeAo = removeSpace(orderSuitEle.querySelector(".kieuveao"));
    let kieuXe = removeSpace(orderSuitEle.querySelector(".kieuxe"));
    let lotAo = removeSpace(orderSuitEle.querySelector(".lotao"));
    let kieuNut = removeSpace(orderSuitEle.querySelector(".kieunut"));
    let kieuTui = removeSpace(orderSuitEle.querySelector(".kieutui"));

    let price = formatNumberToRaw(orderSuitEle.querySelector(".price").value);
    let amount = Number(orderSuitEle.querySelector(".amount").innerHTML);
    let fabric = orderSuitEle.querySelector(".fabric").value;
    let note = orderSuitEle.querySelector(".note").value;
    if (!price || price < 0) {
        alert("Đơn giá Suit không được để trống")
        return null;
    }
    return new OrderSuitRequest(kieuAo, formAo, kieuVeAo, lotAo, kieuXe, kieuNut, kieuTui, price, amount, note, fabric);

}
//Trousers
const createOrderTrousersRequest = (orderTrousersEle) => {
    let formQuan = removeSpace(orderTrousersEle.querySelector(".formquan"));
    let kieuLung = removeSpace(orderTrousersEle.querySelector(".kieulung"));
    let kieuTuiTruoc = removeSpace(orderTrousersEle.querySelector(".kieutuitruoc"));
    let kieuTuiSau = removeSpace(orderTrousersEle.querySelector(".kieutuisau"));
    let soTui = removeSpace(orderTrousersEle.querySelector(".sotui"));
    let kieuLai = removeSpace(orderTrousersEle.querySelector(".kieulai"));

    let price = formatNumberToRaw(orderTrousersEle.querySelector(".price").value);
    let amount = Number(orderTrousersEle.querySelector(".amount").innerHTML);
    let fabric = orderTrousersEle.querySelector(".fabric").value;
    let note = orderTrousersEle.querySelector(".note").value;
    if (!price || price < 0) {
        alert("Đơn giá quần không được để trống")
        return null;
    }
    return new OrderTrouderRequest(formQuan, kieuLung, kieuTuiTruoc, kieuTuiSau, soTui, kieuLai, price, amount, note, fabric);

}
//Accessory
const createOrderAccessoryRequest = (orderAccessoryEle) => {
    let nameAccessory = orderAccessoryEle.querySelector(".tenphukien").value;
    let price = formatNumberToRaw(orderAccessoryEle.querySelector(".price").value);
    let amount = Number(orderAccessoryEle.querySelector(".amount").innerHTML);
    let note = orderAccessoryEle.querySelector(".note").value;

    if (!price || price < 0) {
        alert("Đơn giá phụ kiện không được để trống");
        return null;
    } else {
        return new OrderAccessoryRequest(nameAccessory, price, amount, note);
    }
}

const createOrderShirtRequest = (orderShirtEle) => {
    let kieuCo = removeSpace(orderShirtEle.querySelector(".kieuCo"));
    let mangSec = removeSpace(orderShirtEle.querySelector(".mangsec"));
    let kieuDinh = removeSpace(orderShirtEle.querySelector(".kieudinh"));
    let price = formatNumberToRaw(orderShirtEle.querySelector(".price").value);
    let amount = Number(orderShirtEle.querySelector(".amount").innerHTML);
    let fabric = orderShirtEle.querySelector(".fabric").value;
    let note = orderShirtEle.querySelector(".note").value;
    if (!price || price < 0) {
        alert("Đơn giá sơ mi không được để trống");
        return null;
    } else {
        return new OrderShirtRequest(kieuCo, mangSec, kieuDinh, note, fabric, price, amount);
    }
}

// Create List Request
const getSuitList = () => {
    let detailOrderEle = document.getElementById("order_items_list");
    let listEleSuit = detailOrderEle.querySelectorAll(".ao");
    let orderSuitRequestList = [];
    for (const orderSuitEle of listEleSuit) {
        let orderSuitRequest = createOrderSuitRequest(orderSuitEle);
        orderSuitRequestList = [...orderSuitRequestList, orderSuitRequest];
    }
    return orderSuitRequestList;
}

const getTrouserList = () => {
    let detailOrderEle = document.getElementById("order_items_list");
    let listEleTrousers = detailOrderEle.querySelectorAll(".quan");
    let orderTrousersRequestList = [];
    for (const orderTrousersEle of listEleTrousers) {
        let orderTrousersRequest = createOrderTrousersRequest(orderTrousersEle);
        orderTrousersRequestList = [...orderTrousersRequestList, orderTrousersRequest];
    }
    return orderTrousersRequestList;
}

const getAccessoryList = () => {
    let detailOrderEle = document.getElementById("order_items_list");
    let listAccessoryEle = detailOrderEle.querySelectorAll(".phukien");
    let orderAccessoryRequestList = [];
    for (const orderAccessoryEle of listAccessoryEle) {
        let orderAccessoryRequest = createOrderAccessoryRequest(orderAccessoryEle);
        orderAccessoryRequestList = [...orderAccessoryRequestList, orderAccessoryRequest]
    }
    return orderAccessoryRequestList;
}

const getShirtList = () => {
    let detailOrderEle = document.getElementById("order_items_list");
    let listEleTrousers = detailOrderEle.querySelectorAll(".somi");
    let orderShirtRequestList = [];
    for (const orderShirtEle of listEleTrousers) {
        let orderShirtRequest = createOrderShirtRequest(orderShirtEle);
        orderShirtRequestList = [...orderShirtRequestList, orderShirtRequest];
    }
    return orderShirtRequestList;

}

const getAppointmentDay = () => {
    let appointmentDay = document.getElementById("appointment_day").value;
    let year = appointmentDay.slice(0, 4);
    let month = appointmentDay.slice(5, 7);
    let day = appointmentDay.slice(8, 10);
    return `${day}/${month}/${year}`;
}

/*Action*/
//render default appointment 
// renderDefaultAppointmentDay();
renderDefaultAppointmentDay();
// Find client
document.getElementById("find_user").onclick = async () => {
    let phoneNumber = document.getElementById("client_phone").value;
    let method = "get";
    let url = `${rootUrl}/client/getclient`;
    let params = { phoneNumber };
    turnOnLoadSection();
    try {
        let { object } = await callAPI(method, url, params, headers, {});
        let userDto = object;
        document.getElementById("client_name").value = userDto.username;
        document.getElementById("client_name").setAttribute("data-id", userDto.id);
        document.getElementById("client_name").setAttribute("data-name", userDto.username);
        document.getElementById("update_client").style.display = "block";
        document.getElementById("create_client").style.display = "none";
        document.getElementById("measurements_info").style.display = "block";
        document.getElementById("order_info").style.display = "block"
        renderClientSuit(userDto.clientSuitDto);
        renderClientTrousers(userDto.clientTrousersDto);

    } catch (error) {
        handleFobiden(error);
        document.getElementById("client_name").setAttribute("data-id", "");
        document.getElementById("client_name").value = "";
        document.getElementById("client_name").disabled = false;
        document.getElementById("update_client").style.display = "none";
        document.getElementById("create_client").style.display = "block";
        document.getElementById("measurements_info").style.display = "block";
        document.getElementById("order_info").style.display = "none";

        renderClientSuit("");
        renderClientTrousers("");
    }

    turnOffLoadSection();

}
// Valitdate phonenumber
document.getElementById("client_phone").oninput = () => {
    let phoneNumber = document.getElementById("client_phone").value;
    checkPhoneNumberInput(phoneNumber);
}

// Confirm create client
document.getElementById("confirm_create_client").onclick = async () => {
    let clientRequest = createClientRequest();
    if (clientRequest) {
        let method = "post";
        let url = `${rootUrl}/client/createclient`;
        let data = clientRequest;
        turnOnLoadSection();
        try {

            let res = await callAPI(method, url, {}, headers, data);
            let client = res.object;
            document.getElementById("close_confirm_create").click();
            document.getElementById("client_name").setAttribute("data-id", client.id)
            document.getElementById("client_name").setAttribute("data-name", client.username)
            document.getElementById("update_client").style.display = "block";
            document.getElementById("create_client").style.display = "none";
            document.getElementById("client_name").disabled = true;
            document.getElementById("order_info").style.display = "block";
            alert("Đã tạo mới khách hàng thành công");
        } catch (error) {
            handleFobiden(error)
            alert("Tạo mới khách hàng không thành công")
        }
    } else {
        alert("Vui lòng điền tên và số điện thoại");
    }

    turnOffLoadSection();
}
//Confirm update client
document.getElementById("confirm_update_client").onclick = async () => {
    let clientRequest = createClientRequest();
    let client_id = document.getElementById("client_name").getAttribute("data-id");
    if (client_id) {
        let method = "put";
        let params = { client_id };
        let data = clientRequest;
        let url = `${rootUrl}/client/update`
        try {
            let res = await callAPI(method, url, params, headers, data);
            alert("Đã cập nhật thành công")
            document.getElementById("close_confirm_update").click();
        } catch (error) {
            handleFobiden(error);
            alert(`Không cập nhật thành công ${err}`);
        }
    } else {
        alert("Vui lòng tìm số điện thoại trước");
        document.getElementById("close_confirm_update").click();
    }

}
//Confirm get info for order
document.getElementById("confirm_create_order").onclick = () => {
    let client_id = document.getElementById("client_name").getAttribute("data-id");
    let orderSuitRequestList = getSuitList();
    let orderTrousersRequestList = getTrouserList();
    let orderAccessoryRequestList = getAccessoryList();
    let orderShirtRequestList = getShirtList();
    let appointmentDay = getAppointmentDay();
    let orderStatusRequest = {
        id: document.getElementById("order-status").getAttribute("order-status")
    }
    if (!client_id) {
        alert("Vui lòng điền hoàn thiện các thông tin");
        document.getElementById("create_order").disabled = true;
        return;
    }
    document.getElementById("create_order").disabled = false;

    orderRequest = {
        appointmentDay,
        client_id,
        orderStatusRequest,
        orderSuitRequestList,
        orderTrousersRequestList,
        orderAccessoryRequestList,
        orderShirtRequestList
    }

    renderFormConfirmOrder(orderRequest);

}
document.getElementById("create_order").onclick = async () => {
    let payment = formatNumberToRaw(document.getElementById("payment").value);
    orderRequest = { ...orderRequest, payment };

    let method = "post";
    let url = `${rootUrl}/order/create`;
    let data = orderRequest;
    try {
        turnOnLoadSection();
        let res = await callAPI(method, url, {}, headers, data);
        if (res.check) {
            location.reload();
            document.getElementById("close_create_order").click();
            window.open(`printOrder.html?orderid=${res.object}`, "_blank");
        }
    } catch (error) {
        handleFobiden(error);
        alert("Không thể tạo mới đơn hàng" + error);
    }
    turnOffLoadSection();
}
// Press Enter
document.getElementById("client_phone").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        document.getElementById("find_user").click();
    }
})