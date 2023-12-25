
//function
//Render Order Info
const renderOrder = (listOrderDto)=>{
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
    document.getElementById("list_orders_due").innerHTML = content;
}

//View detail Order
const viewOrderDetail = (order_id)=>{
    window.location.href =`./vieworderdetail.html?orderid=${order_id}`;    
}



//Call API Get due order
axios({
    url: "http://localhost:8080/order/due",
    method: "GET"
}).then(res =>{
    console.log(res);
    let {object} = res.data;
    renderOrder(object);
}).catch(err =>{
    alert("Không tìm thấy danh sách đến hạn")
})

