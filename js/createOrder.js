//Variable
let orderRequest;

// Suport Function
const setValue = (eleId, value) => {
    document.getElementById(eleId).value = value;
}

//Format
const renderNumber = (number)=>{
    return number.toLocaleString("da-DK");
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
    let eleNofiPhone = document.getElementById("nofication_phonenumber");
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

const renderFormConfirmOrder = (orderRequest)=>{
    document.getElementById("client_name").innerHTML = document.getElementById("username").getAttribute("data-name");
    document.getElementById("client_phone").innerHTML = document.getElementById("phonenumber").value;
    document.getElementById("appointment_day").innerHTML = orderRequest.appointmentDay;
    document.getElementById("confirm_order_table").innerHTML ="";
    renderTrousersConfirm(orderRequest.orderTrousersRequestList)
    renderSuitConfirm(orderRequest.orderSuitRequestList);
    renderAccessoryConfirm(orderRequest.orderAccessoryRequestList);
    renderTotalBill(orderRequest);
    
}

const renderSuitConfirm = (orderSuitRequestList)=>{
    let content = "";
    for (const item of orderSuitRequestList) {
        let price = renderNumber(Number(item.price));
        let amount = renderNumber(Number(item.amount)); 
        let total = renderNumber( Number(item.price)*Number(item.amount));   
        content += `
        <tr>
            <th>Áo</th>
            <td>${item.kieuAo}</td>
            <td>${price}</td>
            <td>${amount}</td>
            <td class="item_total">${total}</td>
        </tr>
       `;
    }
    document.getElementById("confirm_order_table").innerHTML += content;
}

const renderTrousersConfirm = (orderTrousersRequestList)=>{
    let content = "";
    for (const item of orderTrousersRequestList) {
        let price = renderNumber(Number(item.price));
        let amount = renderNumber(Number(item.amount)); 
        let total = renderNumber( Number(item.price)*Number(item.amount));             
        content += `
        <tr>
            <th>Quần</th>
            <td>${item.formQuan}</td>
            <td>${price}</td>
            <td>${amount}</td>
            <td class="item_total">${total}</td>
        </tr>
       `;
    }
    document.getElementById("confirm_order_table").innerHTML += content;
}

const renderAccessoryConfirm = (orderAccessoryRequestList)=>{
    let content = "";
    for (const item of orderAccessoryRequestList) {
        let price = renderNumber(Number(item.price));
        let amount = renderNumber(Number(item.amount)); 
        let total = renderNumber( Number(item.price)*Number(item.amount));   
        content += `
        <tr>
            <th>Phụ kiện</th>
            <td>${item.nameAccessory}</td>
            <td>${price}</td>
            <td>${amount}</td>
            <td class="item_total">${total}</td>
        </tr>
       `;
    }
    document.getElementById("confirm_order_table").innerHTML += content;
}

const renderTotalBill = (orderRequest)=>{
    let listTrousers = orderRequest.orderTrousersRequestList;
    let listSuit = orderRequest.orderSuitRequestList;
    let listAccessory = orderRequest.orderAccessoryRequestList;
    if(!listTrousers&&!listSuit&&!listAccessory){
        return;
    }
    let total = 0;
    for (const item of listTrousers) {
        total += Number(item.price)*Number(item.amount);
    }
    for (const item of listSuit) {
        total += Number(item.price)*Number(item.amount);
    }
    for (const item of listAccessory) {
        total += Number(item.price)*Number(item.amount);
    }

    total = renderNumber(Number(total))

    document.getElementById("confirm_order_table").innerHTML += 
    `
        <tr>
            <th colspan="4" style="text-align: center;">Tổng tiền</th>
            <td>${total}</td>
        </tr>
    `
    ;


}

const renderDefaultAppointmentDay = ()=>{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let currentDate = `${yyyy}-${mm}-${dd}`;
    document.getElementById("appointment").value = currentDate;

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
    let phoneNumber = document.getElementById("phonenumber").value;
    let username = document.getElementById("username").value
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
    let kieuAo = orderSuitEle.querySelector(".kieuao").value;
    let formAo = orderSuitEle.querySelector(".formao").value;
    let kieuVeAo = orderSuitEle.querySelector(".kieuveao").value;
    let lotAo = orderSuitEle.querySelector(".lotao").value;
    let kieuNut = orderSuitEle.querySelector(".kieunut").value;
    let kieuTui = orderSuitEle.querySelector(".kieutui").value;
    let price = orderSuitEle.querySelector(".dongia").value;
    let amount = orderSuitEle.querySelector(".soluong").value;
    let note = orderSuitEle.querySelector(".ghichu").value;
    let fabric = orderSuitEle.querySelector(".fabric").value;

    console.log(fabric);
    if (!price && !amount) {
        alert("Đơn giá và số lượng không được để trống")
        return null;
    }
    return new OrderSuitRequest(kieuAo, formAo, kieuVeAo, lotAo, kieuNut, kieuTui, price, amount, note, fabric);

}
//Trousers
const createOrderTrousersRequest = (orderTrousersEle) => {
    console.log(orderTrousersEle);
    let formQuan = orderTrousersEle.querySelector(".formquan").value;
    let kieuLung = orderTrousersEle.querySelector(".kieulung").value;
    let kieuTuiTruoc = orderTrousersEle.querySelector(".kieutuitruoc").value;
    let kieuTuiSau = orderTrousersEle.querySelector(".kieutuisau").value;
    let soTui = orderTrousersEle.querySelector(".sotuisau").value;
    let kieuLai = orderTrousersEle.querySelector(".kieulai").value;
    let price = orderTrousersEle.querySelector(".dongia").value;
    let amount = orderTrousersEle.querySelector(".soluong").value;
    let note = orderTrousersEle.querySelector(".ghichu").value;
    let fabric = orderTrousersEle.querySelector(".fabric").value;
    if (!price && !amount) {
        alert("Đơn giá và số lượng không được để trống")
        return null;
    }
    return new OrderTrouderRequest(formQuan, kieuLung, kieuTuiTruoc, kieuTuiSau, soTui, kieuLai, price, amount, note, fabric);

}
//Accessory
const createOrderAccessoryRequest = (orderAccessoryEle) => {
    let nameAccessory = orderAccessoryEle.querySelector(".tenphukien").value;
    let price = orderAccessoryEle.querySelector(".dongia").value;
    let amount = orderAccessoryEle.querySelector(".soluong").value;
    let note = orderAccessoryEle.querySelector(".ghichu").value;
    if (!price && !amount) {
        alert("Đơn giá và số lượng không được để trống")
        return null;
    }
    return new OrderAccessoryRequest(nameAccessory, price, amount, note);
}

// Create List Request
const getSuitList = () => {
    let detailOrderEle = document.getElementById("detail_order");
    let listEleSuit = detailOrderEle.querySelectorAll(".ao");
    let orderSuitRequestList = [];
    for (const orderSuitEle of listEleSuit) {
        let orderSuitRequest = createOrderSuitRequest(orderSuitEle);
        orderSuitRequestList = [...orderSuitRequestList, orderSuitRequest];
    }
    return orderSuitRequestList;
}

const getTrouserList = () => {
    let detailOrderEle = document.getElementById("detail_order");
    let listEleTrousers = detailOrderEle.querySelectorAll(".quan");
    let orderTrousersRequestList = [];
    for (const orderTrousersEle of listEleTrousers) {
        let orderTrousersRequest = createOrderTrousersRequest(orderTrousersEle);
        orderTrousersRequestList = [...orderTrousersRequestList, orderTrousersRequest];
    }
    return orderTrousersRequestList;
}

const getAccessoryList = () => {
    let detailOrderEle = document.getElementById("detail_order");
    let listAccessoryEle = detailOrderEle.querySelectorAll(".phukien");
    let orderAccessoryRequestList = [];
    for (const orderAccessoryEle of listAccessoryEle) {
        let orderAccessoryRequest = createOrderAccessoryRequest(orderAccessoryEle);
        orderAccessoryRequestList = [...orderAccessoryRequestList, orderAccessoryRequest]
    }
    return orderAccessoryRequestList;
}

const getAppointmentDay = ()=>{
    let appointmentDay = document.getElementById("appointment").value;
    let year = appointmentDay.slice(0,4);
    let month = appointmentDay.slice(5,7);
    let day = appointmentDay.slice(8,10);
    return `${day}/${month}/${year}`;
}

/*Action*/
//render default appointment 
renderDefaultAppointmentDay();

// Find client
document.getElementById("find_user").onclick = () => {

    let phoneNumber = document.getElementById("phonenumber").value;
    document.getElementById("detail_info").style.display = "block";
    axios({
        method: "get",
        url: `http://localhost:8080/client/getclient?phoneNumber=${phoneNumber}`
    }).then(res => {
        let userDto = res.data.object;
        document.getElementById("username").value = userDto.username;
        document.getElementById("username").setAttribute("data-id", userDto.id);
        document.getElementById("username").setAttribute("data-name", userDto.username);
        document.getElementById("update_user").style.display = "block";
        document.getElementById("create_user").style.display = "none";
        renderClientSuit(userDto.clientSuitDto);
        renderClientTrousers(userDto.clientTrousersDto)

    }).catch(err => {
        document.getElementById("username").setAttribute("data-id", "");
        document.getElementById("username").value = "";
        document.getElementById("update_user").style.display = "none";
        document.getElementById("create_user").style.display = "block";
        document.getElementById("btn-suilt").click();
        document.getElementById("btn-trousers").click();
        renderClientSuit("");
        renderClientTrousers("");
    })

}
// Valitdate phonenumber
document.getElementById("phonenumber").oninput = () => {
    let phoneNumber = document.getElementById("phonenumber").value;
    checkPhoneNumberInput(phoneNumber);
}

// Confirm create client
document.getElementById("confirm_create_client").onclick = () => {
    let clientRequest = createClientRequest();
    if (clientRequest) {
        axios({
            method: 'post',
            url: 'http://localhost:8080/client/createclient',
            data: clientRequest
        }).then(res => {
            let client = res.data.object;
            console.log(client);
            document.getElementById("close_confirm_create").click();
            document.getElementById("username").setAttribute("data-id", client.id)
            document.getElementById("username").setAttribute("data-name", client.username)
            document.getElementById("update_user").style.display = "block";
            document.getElementById("create_user").style.display = "none";
            alert("Đã tạo mới khách hàng thành công");
        }).catch(err => {
            alert(err);
        })
    } else {
        alert("Vui lòng điền tên và số điện thoại");
    }
}
//Confirm update client
document.getElementById("confirm_update_client").onclick = () => {
    let clientRequest = createClientRequest();
    let client_id = document.getElementById("username").getAttribute("data-id");
    if (client_id) {
        axios({
            method: 'put',
            url: "http://localhost:8080/client/update",
            params: {
                client_id
            },
            data: clientRequest
        }).then(res => {
            alert("Đã cập nhật thành công")
            document.getElementById("close_confirm_update").click();
        }).catch(err => {
            alert(`Không cập nhật thành công ${err}`)
        })
    } else {
        alert("Vui lòng tìm số điện thoại trước");
        document.getElementById("close_confirm_update").click();
    }

}
//Confirm get info for order
document.getElementById("create_order").onclick = () => {
    let orderSuitRequestList = getSuitList();
    let client_id = document.getElementById("username").getAttribute("data-id");
    let orderTrousersRequestList = getTrouserList();
    let orderAccessoryRequestList = getAccessoryList();
    let appointmentDay = getAppointmentDay();
    let orderStatusRequest = {
        id: document.getElementById("order_status").value
    }
    if (!client_id) {
        alert("Vui lòng điền hoàn thiện các thông tin");
        document.getElementById("confirm_create_order").disabled = true;
        return;
    }
    document.getElementById("confirm_create_order").disabled = false;
    
    orderRequest ={
        appointmentDay,
        client_id,
        orderStatusRequest,
        orderSuitRequestList,
        orderTrousersRequestList,
        orderAccessoryRequestList
    }
    
    renderFormConfirmOrder(orderRequest);
    
}
document.getElementById("confirm_create_order").onclick = ()=>{ 
    let payment = document.getElementById("payment").value;
    orderRequest = {...orderRequest, payment};   
    axios({
        method: "post",
        url: "http://localhost:8080/order/create",
        data: orderRequest
    }).then(res =>{
        let {data} = res;
        if (data.check) {
            location.reload();
            document.getElementById("close_create_order").click();
            window.open(`printOrder.html?orderid=${data.object}`, "_blank");
        }
        
    }).catch(err =>{
        alert(err);
    })
}

