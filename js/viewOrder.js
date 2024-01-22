const mainContent = document.getElementById("content");
const rootURL = "http://localhost:8080"

// Variable

//function
//Render Order Info
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

const renderPane = async (targetElement) => {
    turnOnLoader();
    let typeOrder = targetElement.getAttribute("data-type-order");
    let elementRenderId = targetElement.getAttribute("data-bs-target");
    let elementRender = document.querySelector(elementRenderId);
    let url = `${rootURL}/order/${typeOrder}`;
    let urlPage = `${rootURL}/order/${typeOrder}/page`;
    let dataPage = await fetchDataOrder(urlPage, "Get", "");
    if (Number(dataPage.object) > 0) {
        let dataOrder = await fetchDataOrder(url, "get", "");
        renderOrder(dataOrder.object, elementRender);
        renderPageNav(dataPage.object, elementRender);
    }
    turnOffLoader();
}

//View detail Order
const viewOrderDetail = (order_id) => {
    window.location.href = `./vieworderdetail.html?orderid=${order_id}`;
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

// Loader
const turnOnLoader = () => {
    document.getElementById("loader-group").style.display = "block";
}

const turnOffLoader = () => {
    document.getElementById("loader-group").style.display = "none";
}

//Call API Get due order
// Render new page
const renderNewPagination = async (navElement) => {
    turnOnLoader();
    let pageChossen = navElement.querySelector(".active");
    let pageNumber = Number(pageChossen.innerHTML) - 1;
    let orderAPI = navElement.getAttribute("data-call-api");
    let idRender = navElement.getAttribute("data-render-id");
    let elementRender = document.getElementById(idRender);
    let url = `${rootURL}/order/${orderAPI}&pageNumber=${pageNumber}`
    try {
        let data = await fetchDataOrder(url, "get", "");
        let { object } = data;
        renderOrder(object, elementRender);
        turnOffLoader();
    } catch (error) {
        alert(error)
    }

}
// Event
let listNavLink = mainContent.querySelectorAll(".nav-link")
for (const item of listNavLink) {
    item.addEventListener("click", (event) => {
        let elementRender = event.currentTarget;
        renderPane(elementRender);
    });
}

// Search by date
document.getElementById("search-date").onclick = async () => {
    turnOnLoader();
    let paneDate = document.getElementById("view-order-date-pane");
    paneDate.querySelector(".list_orders_detail").innerHTML = "";
    paneDate.querySelectorAll(".pagination").innerHTML = "";
    let rawStartDate = document.getElementById("startDate").value;
    let rawEndDate = document.getElementById("endDate").value;
    if ((!rawStartDate) || (!rawEndDate)) {
        alert("Vui lòng nhập ngày bắt đầu và kết thúc");
        turnOffLoader();
        return;
    }
    let startDate = formatDateISOtoVN(document.getElementById("startDate").value);
    let endDate = formatDateISOtoVN(document.getElementById("endDate").value);
    let urlPage = `${rootURL}/order/date/page`;
    let params = {
        startDate,
        endDate
    }
    let data = await fetchDataOrder(urlPage, "GET", params);
    let numberPage = data.object;
    if (numberPage > 0) {
        let elementRender = document.getElementById("view-order-date-pane");
        elementRender.querySelector(".pagination").setAttribute("data-call-api",
            `date?startDate=${startDate}&endDate=${endDate}`)
        renderPageNav(numberPage, elementRender);
        let url = `${rootURL}/order/date`;
        let data = await fetchDataOrder(url, "get", params);
        let listOrderDto = data.object;
        renderOrder(listOrderDto, elementRender);
        turnOffLoader();
    }

}

// Load page
// Axios data get
const fetchDataOrder = async (url, method, params) => {
    try {
        let response = await axios({
            url,
            method,
            params
        })
        return response.data;
    } catch (error) {
        return error;
    }

}

turnOnLoader();
axios({
    url: "http://localhost:8080/order/due",
    method: "GET"
}).then(res => {
    let { object } = res.data;
    let elementRender = document.getElementById("order-due-pane");
    renderOrder(object, elementRender);
    turnOffLoader();
}).catch(err => {
    alert("Không tìm thấy danh sách đến hạn");
    turnOffLoader();
})

axios({
    url: "http://localhost:8080/order/due/page",
    method: "GET"
}).then(res => {
    let { object } = res.data;
    if (object > 0) {
        let elementRender = document.getElementById("order-due-pane");
        renderPageNav(object, elementRender);
    }

    turnOffLoader();
}).catch(err => {
    turnOffLoader();
})
