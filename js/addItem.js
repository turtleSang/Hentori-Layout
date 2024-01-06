document.querySelector(".group-controller").addEventListener("click", (event) => {
    let mainEle = event.currentTarget.parentElement;
    mainEle.classList.toggle("open");

    let eleList = event.currentTarget.children;
    for (const item of eleList) {
        item.classList.toggle("d-none")
    }

})

const deleteItem = (e) => {
    let deletedElement = e.currentTarget.parentElement.parentElement;
    deletedElement.remove();
}

// add shirt
document.getElementById("addShirt").onclick = (event) => {
    event.preventDefault();
    let content = `
    <div class="order_item somi">
    <div class="main_item_info">
        <div class="item_info">
            <p>Sơ mi</p>
        </div>
        <div class="item_info">
            <h4>Loại Vải</h4>
            <input type="text" class="fabric input">
        </div>
        <div class="item_info">
            <h4>Số lượng</h4>
            <div class="amount-group">
                <button type="button" class="btn-amount btn-minus" onclick="minusAmount(event)"
                    disabled><i class="fa-solid fa-minus"></i></button>
                <span class="amount">1</span>
                <button type="button" class="btn-amount btn-plus" onclick="addAmount(event)"><i
                        class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div class="item_info">
            <h4>Đơn Giá</h4>
            <input type="text" class="price input number" oninput="formatInputNumber(event)">
        </div>

    </div>
    <div class="attribute_item_info">
        <div class="item_attribute">
            <div class="dropdown">
                <button class="formquan btn btn-dropdown dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                     Kiểu cổ
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)"
                            href="#">A.01</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)"
                            href="#">A.02</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)"
                            href="#">A.03</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)"
                            href="#">A.04</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)"
                            href="#">B.01</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)"
                            href="#">B.02</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)"
                            href="#">B.03</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)"
                            href="#">B.04</a></li>

                </ul>
            </div>
        </div>
        <div class="item_attribute">
            <div class="dropdown">
                <button class="kieulung btn btn-dropdown dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                     Mangsec
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">MS
                            Tròn</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">MS
                            vuông</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">MS
                            đúp</a></li>

                </ul>
            </div>
        </div>
        <div class="item_attribute">
            <div class="dropdown">
                <button class="kieutuitruoc btn btn-dropdown dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                     Kiểu đinh
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Đinh lật ra</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Đinh lật vô</a></li>
                </ul>
            </div>
        </div>
        
        <div class="item_attribute">
            <h4>Chú thích</h4>
            <textarea class="note"></textarea>
        </div>
    </div>
    <div class="delete-item">
        <button type="button" onclick="deleteItem(event)" class="btn-search-little">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>

</div>
    `
    document.getElementById("order_items_list").innerHTML += content;
}
//add Suit
document.getElementById("addSuit").onclick = (event) =>{
    event.preventDefault();
    let content = `
<div class="order_item ao">
    <div class="main_item_info">
        <div class="item_info">
            <p>Suit</p>
        </div>
        <div class="item_info">
            <h4>Loại Vải</h4>
            <input type="text" class="fabric input">
        </div>
        <div class="item_info">
            <h4>Số lượng</h4>
            <div class="amount-group">
                <button type="button" class="btn-amount btn-minus" onclick="minusAmount(event)"
                    disabled><i class="fa-solid fa-minus"></i></button>
                <span class="amount">1</span>
                <button type="button" class="btn-amount btn-plus" onclick="addAmount(event)"><i
                        class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div class="item_info">
            <h4>Đơn Giá</h4>
            <input type="text" class="price input number" oninput="formatInputNumber(event)">
        </div>

    </div>
    <div class="attribute_item_info">
        <div class="item_attribute">
            <div class="dropdown">
                <button class="kieuao btn btn-dropdown dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                     Kiểu áo
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Suit
                            Jacket</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)"
                            href="#">Blazer</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)"
                            href="#">Sport Jacket</a></li>
                </ul>
            </div>
        </div>
        <div class="item_attribute">
            <div class="dropdown">
                <button class="formao btn btn-dropdown dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                     Form Áo
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Ôm
                            Body</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Ôm
                            Vừa</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Form
                            rộng</a></li>
                </ul>
            </div>
        </div>
        <div class="item_attribute">
            <div class="dropdown">
                <button class="kieuveao btn btn-dropdown dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                     Kiểu ve áo
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Ve
                            nhọn</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Ve
                            K</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Ve
                            Sam</a></li>
                </ul>
            </div>
        </div>
        <div class="item_attribute">
            <div class="dropdown">
                <button class="kieuxe btn btn-dropdown dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                     Kiểu xẻ
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#"> Xẻ
                            2 bên</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Xẻ 1
                            bên</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)"
                            href="#">Không xẻ</a></li>
                </ul>
            </div>
        </div>
        <div class="item_attribute">
            <div class="dropdown">
                <button class="lotao btn btn-dropdown dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                     Lót áo
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">
                            Full lót </a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Lót
                            demi</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)"
                            href="#">Không lót</a></li>
                </ul>
            </div>
        </div>

        <div class="item_attribute">
            <div class="dropdown">
                <button class="kieunut btn btn-dropdown dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                     Kiểu nút
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#"> 2
                            nút </a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">1
                            nút</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)"
                            href="#">Double breasted</a></li>
                </ul>
            </div>
        </div>

        <div class="item_attribute">
            <div class="dropdown">
                <button class="kieutui btn btn-dropdown dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                     Kiểu túi
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#"> Túi
                            mổ </a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Túi
                            đắp</a></li>
                </ul>
            </div>
        </div>

        <div class="item_attribute">
            <h4>Chú thích</h4>
            <textarea class="note"></textarea>
        </div>
    </div>
    <div class="delete-item">
        <button type="button" onclick="deleteItem(event)" class="btn-search-little">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>

</div>
    
    `;
    document.getElementById("order_items_list").innerHTML += content;
}
//add accesory
document.getElementById("addAccessory").onclick = (event) =>{
    event.preventDefault();
    let content = `
<div class="order_item phukien">
    <div class="main_item_info">
        <div class="item_info">
            <p>Phụ kiện</p>
        </div>
        <div class="item_info">
            <h4>Tên phụ kiện</h4>
            <input type="text" class="tenphukien input">
        </div>
        <div class="item_info">
            <h4>Số lượng</h4>
            <div class="amount-group">
                <button type="button" class="btn-amount btn-minus" onclick="minusAmount(event)"
                    disabled><i class="fa-solid fa-minus"></i></button>
                <span class="amount">1</span>
                <button type="button" class="btn-amount btn-plus" onclick="addAmount(event)"><i
                        class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div class="item_info">
            <h4>Đơn Giá</h4>
            <input type="text" class="price input number" oninput="formatInputNumber(event)">
        </div>
    </div>
    <div class="delete-item">
        <button type="button" onclick="deleteItem(event)" class="btn-search-little">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>
</div>
    `;
    document.getElementById("order_items_list").innerHTML += content;
}
//add accesory
document.getElementById("addTrousers").onclick = (event) =>{
    event.preventDefault();
    let content = `
<div class="order_item quan">
    <div class="main_item_info">
        <div class="item_info">
            <p>Quần</p>
        </div>
        <div class="item_info">
            <h4>Loại Vải</h4>
            <input type="text" class="fabric input">
        </div>
        <div class="item_info">
            <h4>Số lượng</h4>
            <div class="amount-group">
                <button type="button" class="btn-amount btn-minus" onclick="minusAmount(event)"
                    disabled><i class="fa-solid fa-minus"></i></button>
                <span class="amount">1</span>
                <button type="button" class="btn-amount btn-plus" onclick="addAmount(event)"><i
                        class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div class="item_info">
            <h4>Đơn Giá</h4>
            <input type="text" class="price input number" oninput="formatInputNumber(event)">
        </div>

    </div>
    <div class="attribute_item_info">
        <div class="item_attribute">
            <div class="dropdown">
                <button class="formquan btn btn-dropdown dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                     Form quần
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)"
                            href="#">Body</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Vừa
                            vặn</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Form
                            rộng</a></li>
                </ul>
            </div>
        </div>
        <div class="item_attribute">
            <div class="dropdown">
                <button class="kieulung btn btn-dropdown dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                     Kiểu lưng
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Side
                            Tab</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)"
                            href="#">Basic</a></li>
                </ul>
            </div>
        </div>
        <div class="item_attribute">
            <div class="dropdown">
                <button class="kieutuitruoc btn btn-dropdown dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                     Kiểu túi trước
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Túi
                            thẳng</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Túi
                            xéo</a></li>
                </ul>
            </div>
        </div>
        <div class="item_attribute">
            <div class="dropdown">
                <button class="kieutuisau btn btn-dropdown dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                     Kiểu túi sau
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Túi
                            mỹ</a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Túi
                            viền</a></li>
                </ul>
            </div>
        </div>
        <div class="item_attribute">
            <div class="dropdown">
                <button class="sotui btn btn-dropdown dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                     Số túi
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#"> 1
                            túi </a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">2
                            túi</a></li>
                </ul>
            </div>
        </div>

        <div class="item_attribute">
            <div class="dropdown">
                <button class="kieulai btn btn-dropdown dropdown-toggle" type="button"
                    data-bs-toggle="dropdown">
                     Kiểu lai
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#"> Lai
                            thường </a></li>
                    <li><a class="dropdown-item" onclick="selectDetailItem(event)" href="#">Lai
                            V</a></li>
                </ul>
            </div>
        </div>
        <div class="item_attribute">
            <h4>Chú thích</h4>
            <textarea class="note"></textarea>
        </div>
    </div>
    <div class="delete-item">
        <button type="button" onclick="deleteItem(event)" class="btn-search-little">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>

</div>
    `;
    document.getElementById("order_items_list").innerHTML += content;
}