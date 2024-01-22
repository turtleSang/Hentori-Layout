const urlParams = new URLSearchParams(window.location.search);
const phoneNumber = urlParams.get("phoneNumber");
const rootUrl = "http://localhost:8080"

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

const renderClient = (clientDto) => {
    document.getElementById("client_name").value = clientDto.username;
    document.getElementById("client_phone").value = clientDto.phoneNumber;
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
    let params ={phoneNumber}
    let dataPage = await callAPI("get", urlPage, params);
    if(dataPage.object > 0){
        let dataOrder = await callAPI("get", url, params);
        renderOrder(dataOrder.object, elementRender);
        renderPageNav(dataPage.object, elementRender);
    }
    
    turnOffLoader();
}

// directional
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
    let params ={phoneNumber}
    try {
        let data = await callAPI("Get", url, params);
        let { object } = data;
        renderOrder(object, elementRender);
        turnOffLoader();
    } catch (error) {
        alert(error)
    }
}

// Call API
const callAPI = async (method, url, params, header) => {
    try {
        let res = await axios({
            method,
            url,
            params,
            header
        })
        return res.data;
    } catch (error) {
        return error
    }
}
// Event
let listNavLink = document.querySelectorAll(".nav-link")
for (const item of listNavLink) {
    item.addEventListener("click", (event) => {
        let elementRender = event.currentTarget;
        renderPane(elementRender);
    });
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

