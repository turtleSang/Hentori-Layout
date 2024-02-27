const urlParams = new URLSearchParams(window.location.search);
const phoneNumber = urlParams.get("phoneNumber");


const setValue = (eleId, value) => {
    document.getElementById(eleId).value = value;
}

const viewOrderDetail = (order_id) => {
    window.location.href = `./vieworderdetail.html?orderid=${order_id}`;
}

// Loader
const turnOnLoader = () => {
    document.getElementById("loader-group").style.display = "block";
}

const turnOffLoader = () => {
    document.getElementById("loader-group").style.display = "none";
}

// Render Client

const renderClient = (clientDto) => {
    document.getElementById("client_name").value = clientDto.username;
    document.getElementById("client_phone").value = clientDto.phoneNumber;
    document.getElementById("client_name").setAttribute("data-id", clientDto.id);
    if (clientDto.clientSuitDto) {
        renderClientSuit(clientDto.clientSuitDto)
    }
    if (clientDto.clientTrousersDto) {
        renderClientTrousers(clientDto.clientTrousersDto)
    }
}

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

// Render Logbook 
const renderLogBook = (logBookDtoList) => {
    let content = "";
    for (const logBookDto of logBookDtoList) {
        let { day, month, year, hours, minutes } = formatDateTimeISOtoVN(logBookDto.visitDate)
        content += `
    <div  class="log_book_item">
       <div class="log_book_item_info">
           <div class="log_book_info">
               <p>Ngày đến: <span>${day}/${month}/${year}</span></p>
           </div>
           <div class="log_book_info">
               <p>Giờ đến: <span>${hours}:${minutes}</span></p>
           </div>
           <div class="log_book_info">
               <p>Nhu Cầu: <span>${logBookDto.demand}</span> </p>
           </div>
           <div class="log_book_info">
               <p>Cách tiếp cận: <span>${logBookDto.approach}</span></p>
           </div>
           <div class="log_book_info">
               <p>Chú thích: <span>${logBookDto.note}</span></p>
           </div>
       </div>
       <div class="log_book_item_nav">
           <button onclick="deleteLogbook(event)" data-id-logbook="${logBookDto.id}" type="button" class="btn-create-small"><i class="fa-solid fa-trash"></i></button>
       </div>
    </div>    
       
 `
    }
    document.getElementById("logbook_content").innerHTML = content;
}

const renderPageNavLogBook = (numPage) => {
    let content = "";
    content += `
    <li class="page-item" onclick="directionalPageLogbookPrevious(event)">
        <a class="page-link previous" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
    </li>
    
    `
    for (let index = 1; index <= numPage; index++) {
        if (index === 1) {
            content += `
            <li class="page-item" onclick="choossePageLogBook(event)">
                <a class="page-link page-num active" href="#">1</a>
            </li>           
            
            `
        } else {
            content += `
            <li class="page-item" onclick="choossePageLogBook(event)">
                <a class="page-link page-num" href="#">${index}</a>
            </li>          
            
            `
        }

    }
    content += `
    <li class="page-item" onclick="directionalPageLogbookNext(event)">
        <a class="page-link next" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>
    
    `
    document.getElementById("log_book_pagination").innerHTML = content;
}

const clearFormLogbook = () => {
    document.getElementById("visit_date").value = "";
    document.getElementById("demand").value = "";
    document.getElementById("approach").value = "";
    document.getElementById("note").value = "";
}
// Render Order
const renderPageNav = (pageNumber, elementRender) => {
    let navEle = elementRender.querySelector(".pagination");
    let content = ``;
    content += `
        <li class="page-item" onclick="directionalPagePrevious(event)">
            <a class="page-link previous" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>    
    `
    for (let index = 0; index < pageNumber; index++) {
        let numPage = index + 1;
        if (index === 0) {
            content += `
            <li class="page-item" onclick="chossePage(event)">
                <a class="page-link page-num active" href="#">${numPage}</a>
            </li>            
            
            `
        } else {
            content += `
            <li class="page-item" onclick="chossePage(event)">
                <a class="page-link page-num" href="#">${numPage}</a>
            </li>
            
            `
        };
    }
    content += `
    <li class="page-item" onclick="directionalPageNext(event)">
        <a class="page-link next" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
    </li>  
    `;
    navEle.innerHTML = content;
}

const renderOrder = (listOrderDto, ElementRender) => {
    let content = "";
    for (const item of listOrderDto) {
        content += `
        <div class="order_item" onclick="viewOrderDetail(${item.id})">
            <div class="created_at">
                <p>Ngày tạo: <span>${formatDateISOtoVN(item.createAt)}</span></p>
            </div>
            <div class="appointment_day">
                <p>Ngày hẹn: <span>${formatDateISOtoVN(item.appointmentDay)}</span></p>
            </div>
            <div class="name">
                <p>Tên khách hàng: <span>${item.orderClientDto.username}</span></p>
            </div>
            <div class="status">
                <p>Trạng thái: <span>${item.orderStatusDto.name}</span></p>
            </div>                                      
            <div class="total">
                <p>Tổng tiền: <span>${formatNumber(item.total)}</span></p>
            </div>
            <div class="payment">
                <p>Đã Thanh Toán: <span>${formatNumber(item.payment)}</span></p>
            </div>
        </div>
        `
    }
    ElementRender.querySelector(".list_orders_detail").innerHTML = content;
}

const renderPane = async (targetElement) => {
    turnOnLoader();
    let typeOrder = targetElement.getAttribute("data-type-order");
    let elementRenderId = targetElement.getAttribute("data-bs-target");
    let elementRender = document.querySelector(elementRenderId);
    // Set up to call API
    let url = `${rootUrl}/client/order/${typeOrder}`;
    let urlPage = `${rootUrl}/client/order/${typeOrder}/page`;
    let params = { phoneNumber }
    let dataPage = await callAPI("get", urlPage, params);
    if (dataPage.object > 0) {
        let dataOrder = await callAPI("get", url, params);
        renderOrder(dataOrder.object, elementRender);
        renderPageNav(dataPage.object, elementRender);
    }

    turnOffLoader();
}

// directional
// Order Page
const directionalPagePrevious = (event) => {
    event.preventDefault();
    let navElement = event.currentTarget.parentElement;
    let listPageNum = navElement.querySelectorAll(".page-num");
    let indexActive = -1;
    for (const index in listPageNum) {
        if (Object.hasOwnProperty.call(listPageNum, index)) {
            const elementNum = listPageNum[index];
            if (elementNum.classList.contains("active")) {
                indexActive = index;
            }
        }
    }
    if (indexActive != 0) {
        listPageNum[indexActive].classList.remove("active")
        indexActive--;
        listPageNum[indexActive].classList.add("active");
    }
    renderNewPagination(navElement);
}

const directionalPageNext = (event) => {
    event.preventDefault();
    let navElement = event.currentTarget.parentElement;
    let listPageNum = navElement.querySelectorAll(".page-num");
    let indexActive = -1;
    for (const index in listPageNum) {
        if (Object.hasOwnProperty.call(listPageNum, index)) {
            const elementNum = listPageNum[index];
            if (elementNum.classList.contains("active")) {
                indexActive = index;
            }
        }
    }
    if (indexActive != (listPageNum.length - 1)) {
        listPageNum[indexActive].classList.remove("active")
        indexActive++;
        listPageNum[indexActive].classList.add("active");
    }
    renderNewPagination(navElement);
}

const chossePage = (event) => {
    event.preventDefault();
    let pageChossenEle = event.currentTarget.querySelector(".page-num");
    let navElement = event.currentTarget.parentElement;
    let listPageNum = navElement.querySelectorAll(".page-num");
    for (const item of listPageNum) {
        item.classList.remove("active");
    }
    pageChossenEle.classList.add("active");

    renderNewPagination(navElement);
}

const renderNewPagination = async (navElement) => {
    turnOnLoader();
    let pageChossen = navElement.querySelector(".active");
    let pageNumber = Number(pageChossen.innerHTML) - 1;
    let orderAPI = navElement.getAttribute("data-call-api");
    let idRender = navElement.getAttribute("data-render-id");
    let elementRender = document.getElementById(idRender);
    let url = `${rootUrl}/client/order/${orderAPI}`
    let params = { phoneNumber, pageNumber }
    try {
        let data = await callAPI("Get", url, params);
        let { object } = data;
        renderOrder(object, elementRender);
        turnOffLoader();
    } catch (error) {
        alert(error)
    }
}
// LogBook Page
const directionalPageLogbookPrevious = async (event) => {
    event.preventDefault();
    let navElement = event.currentTarget.parentElement;
    let listPageNum = navElement.querySelectorAll(".page-num");
    let indexActive = -1
    for (const index in listPageNum) {
        if (Object.hasOwnProperty.call(listPageNum, index)) {
            const elementNum = listPageNum[index];
            if (elementNum.classList.contains("active")) {
                indexActive = index;
            }

        }
    }
    if (indexActive != 0) {
        listPageNum[indexActive].classList.remove("active")
        indexActive--;
        listPageNum[indexActive].classList.add("active");
    }
    renderNewLogBookPage();
}

const directionalPageLogbookNext = async (event) => {
    event.preventDefault();
    let navElement = event.currentTarget.parentElement;
    let listPageNum = navElement.querySelectorAll(".page-num");
    let indexActive = -1
    for (const index in listPageNum) {
        if (Object.hasOwnProperty.call(listPageNum, index)) {
            const elementNum = listPageNum[index];
            if (elementNum.classList.contains("active")) {
                indexActive = index;
            }

        }
    }

    if (indexActive != (listPageNum.length - 1)) {
        listPageNum[indexActive].classList.remove("active")
        indexActive++;
        listPageNum[indexActive].classList.add("active");
    }
    renderNewLogBookPage();
}

const choossePageLogBook = async (event) => {
    event.preventDefault();
    let pageChossenEle = event.currentTarget.querySelector(".page-num");
    let navElement = event.currentTarget.parentElement;
    let listPageNum = navElement.querySelectorAll(".page-num");
    for (const item of listPageNum) {
        item.classList.remove("active");
    }
    pageChossenEle.classList.add("active");
    renderNewLogBookPage();
}

const renderNewLogBookPage = async () => {
    let navEle = document.getElementById("log_book_pagination")
    let pageActive = navEle.querySelector(".active");
    let pageNumber = Number(pageActive.innerHTML) - 1;
    let url = `${rootUrl}/logbook/get`
    let params = {
        phoneNumber,
        pageNumber
    }
    try {
        let res = await callAPI("get", url, params, header)
        let listLogBookDto = res.object;
        renderLogBook(listLogBookDto);
    } catch (error) {
        alert(error)
    }
}

const deleteLogbook = async (event) => {
    let btnDelete = event.currentTarget;
    let id = btnDelete.getAttribute("data-id-logbook");
    let url = `${rootUrl}/logbook/delete`
    try {
        let res = await callAPI("delete", url, { id }, header, {});
        location.reload();
    } catch (error) {
        alert("Không thể xóa" + error)
    }

}
// Event
let listNavLink = document.getElementById("OrderTab").querySelectorAll(".nav-link")
for (const item of listNavLink) {
    item.addEventListener("click", (event) => {
        let elementRender = event.currentTarget;
        renderPane(elementRender);
    });
}

// Create client request

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

// Create Log Book Request
const createLogBookRequest = () => {
    let visitDate = getDateTimeInput("visit_date");
    let demand = document.getElementById("demand").value;
    let approach = document.getElementById("approach").value;
    let clientID = document.getElementById("client_name").getAttribute("data-id");
    let note = document.getElementById("note").value;
    if (!demand || !visitDate || !approach || !clientID) {
        return null;
    }

    return new LogBookRequest(visitDate, demand, approach, note, clientID);
}

// Event
document.getElementById("update_client").onclick = async () => {
    let clientRequest = createClientRequest();
    if (clientRequest) {
        let client_id = document.getElementById("client_name").getAttribute("data-id");
        let url = `${rootUrl}/client/update`;
        let data = clientRequest
        try {
            let res = await callAPI("put", url, { client_id }, header, data);
            var newUrl = window.location.href.replace(`phoneNumber=${phoneNumber}`, `phoneNumber=${clientRequest.phoneNumber}`);
            window.history.replaceState({}, document.title, newUrl);
            alert(res.messenger);
        } catch (error) {
            alert("Số điện thoại bị trùng với khách hàng khác");
        }
    }

}

document.getElementById("confirm_create_logbook").onclick = async () => {
    let logBookRequest = createLogBookRequest();
    let url = `${rootUrl}/logbook/create`;
    if (!logBookRequest) {
        alert("Vui lòng điền đầy đủ thông tin")
    }
    try {
        const res = await callAPI("post", url, {}, header, logBookRequest);
        alert("Tạo Thành công");
        location.reload();
    } catch (error) {
        alert("Không thể tạo")
    }
}

document.getElementById("close_create_logbook").onclick = () => {
    clearFormLogbook();
}



axios({
    method: "get",
    url: `${rootUrl}/client/getclient`,
    params: {
        phoneNumber
    }
}).then(res => {
    let clientDto = res.data.object;
    renderClient(clientDto);
}).catch(err => {
    alert(err)
})

axios({
    method: "get",
    url: `${rootUrl}/logbook/get`,
    params: {
        phoneNumber
    }
}).then(res => {
    let logBookDtoList = res.data.object;
    renderLogBook(logBookDtoList);
}).catch(err => {
    console.log(err);
})

axios({
    method: "get",
    url: `${rootUrl}/logbook/get/page`,
    params: {
        phoneNumber
    }
}).then(res => {
    let pageNumber = res.data.object;
    renderPageNavLogBook(pageNumber);
}).catch(err => {
    console.log(err);
})
