let urlParams = new URLSearchParams(window.location.search);
let orderId = urlParams.get("orderid");

const getDate = (date)=>{
    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
}

const renderNumber = (number)=>{
    return number.toLocaleString("da-DK");
}

const renderDate = (appointmentDay, createAt)=>{
    let strAppointmentDay = getDate(appointmentDay);
    let strCreateAt = getDate(createAt);
    document.getElementById("create_at").innerHTML = strCreateAt;
    document.getElementById("appointment_day").innerHTML = strAppointmentDay;
}

const renderClient = (orderClientDto)=>{
    let {username, phoneNumber} = orderClientDto;
    document.getElementById("client_name").innerHTML = username;
    document.getElementById("client_phone").innerHTML = phoneNumber;
}

const renderSuit = (orderSuitDtoList) =>{
    let content = ``;
    for (const suit of orderSuitDtoList) {
        let {kieuAo,price,total, amount} = suit;
        total = renderNumber(total);
        price = renderNumber(price);
        content +=`
            <tr>
                <td>Áo</td>
                <td>${kieuAo}</td>
                <td>${price}</td>
                <td>${amount}</td>
                <td class="total_money">${total}</td>
            </tr>
        `;
        document.getElementById("info_table_detail").innerHTML += content;
    }
}

const renderTrousers =(orderTrousersDtoList) =>{
    let content = ``;
    for (const trousers of orderTrousersDtoList) {
        let {formQuan,price,total, amount} = trousers;
        total = renderNumber(total);
        price = renderNumber(price);
        content +=`
            <tr>
                <td>Quần</td>
                <td>${formQuan}</td>
                <td>${price}</td>
                <td>${amount}</td>
                <td class="total_money">${total}</td>
            </tr>
        `;
        document.getElementById("info_table_detail").innerHTML += content;
    }
}

const renderAccessory = (orderAccessoryDtoList)=>{
    let content = ``;
    for (const accessory of orderAccessoryDtoList) {
        let {nameAccessory,price,total, amount} = accessory;
        total = renderNumber(total);
        price = renderNumber(price);
        content +=`
            <tr>
                <td>Phụ kiện</td>
                <td>${nameAccessory}</td>
                <td>${price}</td>
                <td>${amount}</td>
                <td class="total_money">${total}</td>
            </tr>
        `;
        document.getElementById("info_table_detail").innerHTML += content;
    }
}

const renderPayment = (total, payment)=>{
    let remaining = Number(total) - Number(payment);
    let strTotal = renderNumber(Number(total));
    let strPayment = renderNumber(Number(payment));
    let strRemaining = renderNumber(Number(remaining));
    let content = `
    <tr>
        <th class="text-center" colspan="4">Tổng tiền</th>
        <td class="total_money">${strTotal}</td>
    </tr>
    <tr>
        <th class="text-center" colspan="4">Đã Thanh Toán</th>
        <td class="total_money">${strPayment}</td>
    </tr>
    <tr>
        <th class="text-center" colspan="4">Còn lại</th>
        <td class="total_money">${strRemaining}</td>
    </tr>
    `;
    document.getElementById("info_table_detail").innerHTML += content;
}

axios({
    method: "get",
    url: `http://localhost:8080/order/detail/${orderId}`
}).then(res =>{
    let {
        appointmentDay, 
        createAt,
        orderClientDto,
        orderSuitDtoList,
        orderTrousersDtoList,
        orderAccessoryDtoList,
        total,
        payment
    } = res.data.object;
    console.log(res.data.object);

    renderDate(appointmentDay, createAt);
    renderClient(orderClientDto);
    if(orderSuitDtoList){
        renderSuit(orderSuitDtoList);
    }
    if(orderTrousersDtoList){
        renderTrousers(orderTrousersDtoList);
    }
    if(orderAccessoryDtoList){
        renderAccessory(orderAccessoryDtoList);
    }
    renderPayment(total,payment);

}).catch(err=>{
    alert(err);
})
