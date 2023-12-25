let btnSuit = document.getElementById("btn-suilt");
let btnTrousers = document.getElementById("btn-trousers");
let number = 0;

btnSuit.onclick = ()=>{
    let suitEle = document.getElementById("suilt_detail");
    btnSuit.querySelector(".arrow-icon").classList.toggle("rotate");
    btnSuit.classList.toggle("active");    

    let suitClass = suitEle.classList;
    let flag = false;
    for (const item of suitClass) {
        if (item == "active") {
            flag = true
            break;
        }
    }
    if (flag) {
        suitClass.remove("active");
    }else{
        suitClass.add("active");    
    }
}

btnTrousers.onclick = ()=>{
    let trousersEle = document.getElementById("trousers_detail");
    btnTrousers.querySelector(".arrow-icon").classList.toggle("rotate");
    btnTrousers.classList.toggle("active");    

    let trouserClass = trousersEle.classList;
    let flag = false;
    for (const item of trouserClass) {
        if (item == "active") {
            flag = true
            break;
        }
    }
    if (flag) {
        trouserClass.remove("active");
    }else{
        trouserClass.add("active");    
    }
}

document.getElementById("add_shirt").onclick = ()=>{
    content = `
    <tr class="ao">
        <th class="tenhang">Áo</th>
        <td class="dactinh">
            <select class="kieuao" class="form-select form-select-sm">
                <option value="" selected>Kiểu áo</option>
                <option value="Suit Jacket">Suit Jacket</option>
                <option value="Blazer">Blazer</option>
                <option value="Spot Jacket">Spot Jacket</option>
            </select>
            <select class="formao" class="form-select form-select-sm">
                <option value="" selected>Form Áo</option>
                <option value="Ôm Body">Ôm Body</option>
                <option value="Ôm Vừa">Ôm Vừa</option>
                <option value="Form Rộng">Form Rộng</option>
            </select>
            <select class="kieuveao" class="form-select form-select-sm">
                <option value="" selected>Kiểu ve áo</option>
                <option value="Ve K">Ve K</option>
                <option value="Ve nhọn">Ve nhọn</option>
                <option value="Ve Sams">Ve Sam</option>
            </select>
            <select class="lotao" class="form-select form-select-sm">
                <option value="" selected>Lót áo</option>
                <option value="Full lót">Full lót</option>
                <option value="Lót Demi">Lót Demi</option>
                <option value="Không lót">Không lót</option>
            </select>
            <select class="kieunut" class="form-select form-select-sm">
                <option value="" selected>Kiểu nút</option>
                <option value="2">2 nút</option>
                <option value="1">1 nút</option>
                <option value="Double breasted">Double breasted</option>
            </select>
            <select class="kieutui" class="form-select form-select-sm">
                <option value="" selected>Kiểu túi</option>
                <option value="Suit Jacket">Túi mổ</option>
                <option value="2">Túi Đắp</option>
                <option value="3">Không lót</option>
            </select>
        </td>
        <td class="">
            <input class="dongia" type="number" oninput="formatNumber(event)">
        </td>
        <td class="">
            <input class="soluong" type="number">
        </td>
        <td class="">
            <input class="fabric" type="text">
        </td>
        <td class="">
            <textarea name="" class="ghichu" cols="20" rows="5"
                 placeholder="Ghi Chú"></textarea>
        </td>
        <td class="">
            <button class="btn-delete" data-number="${number}" onclick="deleteItem(event)"><i class="fa-solid fa-xmark"></i></button>
        </td>

    </tr>
    `;
    number++;
    document.getElementById("detail_order").innerHTML += content;
}

document.getElementById("add_trousers").onclick = ()=>{
    content = `
    <tr class="quan">
        <th>Quần</th>
        <td class="dactinh">
            <select class="formquan" class="form-select form-select-sm">
                <option value="" selected>Form Quần</option>
                <option value="Ôm Body">Ôm Body</option>
                <option value="Ôm Vừa">Ôm Vừa</option>
                <option value="Form Rộng">Form Rộng</option>
            </select>
            <select class="kieulung" class="form-select form-select-sm">
                <option value="" selected>Kiểu lưng</option>
                <option value="Side Tab">Side Tab</option>
                <option value="Basic">Basic</option>
            </select>
            <select class="kieutuitruoc" class="form-select form-select-sm">
                <option value="" selected>Kiểu túi trước</option>
                <option value="Túi thẳng">Túi thẳng</option>
                <option value="Túi xéo">Túi xéo</option>
            </select>
            <select class="kieutuisau" class="form-select form-select-sm">
                <option value="" selected>Kiểu túi sau</option>
                <option value="Túi mỹ">Túi mỹ</option>
                <option value="Túi viền">Túi viền</option>
            </select>
            <select class="sotuisau" class="form-select form-select-sm">
                <option value="" selected>Số túi sau</option>
                <option value="1">1 Túi</option>
                <option value="2">2 Túi</option>
            </select>
            <select class="kieulai" class="form-select form-select-sm">
                <option value="" selected>Kiểu lai</option>
                <option value="Lai thường">Lai thường</option>
                <option value="Lai V">Lai V</option>
            </select>
        </td>
        <td class="">
            <input class="dongia" type="number">
        </td>
        <td class="">
            <input class="soluong" type="number">
        </td>
        <td class="">
            <input class="fabric" type="text">
        </td>
        <td class="">
            <textarea name="" class="ghichu" cols="20" rows="5"
                placeholder="Ghi Chú"></textarea>
        </td>
        <td class="">
            <button class="btn-delete" data-number="${number}"  onclick="deleteItem(event)"><i class="fa-solid fa-xmark"></i></button>
        </td>
    </tr>
    `;
    number++;
    document.getElementById("detail_order").innerHTML += content;
}
document.getElementById("add_accessory").onclick = ()=>{
    content = `
    <tr class="phukien">
    <th scope="row">Phụ Kiện</th>
    <td>
        <input type="text" class="tenphukien" placeholder="Tên phụ kiện">
    </td>
    <td class="">
        <input class="dongia" type="number">
    </td>
    <td class="">
        <input class="soluong" type="number">
    </td>
    <td></td>
    <td class="">
        <textarea name="" class="ghichu" cols="20" rows="5"
            placeholder="Ghi Chú"></textarea>
    </td>
    <td class="">
        <button class="btn-delete" data-number="${number}"  onclick="deleteItem(event)"><i class="fa-solid fa-xmark"></i></button>
    </td>
    </tr>
    `;
    number++;
    document.getElementById("detail_order").innerHTML += content;
}

const deleteItem = (event)=>{
    let positon =event.currentTarget;
    let eleRemove = positon.parentNode.parentNode;
    document.getElementById("detail_order").removeChild(eleRemove);
}

