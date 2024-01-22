const urlRoot = "http://localhost:8080";
const urlClinet = `${urlRoot}/client`;



// Show and hide Type
const showType = () => {
    document.getElementById("list-type").classList.remove("d-none");
    document.getElementById("list-type").classList.add("drop-down-animation");
    setTimeout(() => {
        document.getElementById("list-type").classList.remove("drop-down-animation");
    }, 200)
}

const hideType = () => {
    document.getElementById("list-type").classList.add("drop-up-animation");
    setTimeout(() => {
        document.getElementById("list-type").classList.add("d-none");
        document.getElementById("list-type").classList.remove("drop-up-animation");

    }, 150)
}

const searchClient = async () => {
    let type = document.getElementById("main-input").getAttribute("data-url");
    let params;   
   
    if (type === "find/name") {
        let name = document.getElementById("input-name").value;
        params ={name}
    } else {
        let phoneNumber = document.getElementById("input-phone").value;
        params ={phoneNumber}
    }
    let url = `${urlClinet}/${type}`;
    try {
        const res = await axios({
            method: "get",
            url,
            params
        })
        return res.data.object;
    } catch (error) {
        throw error;
    }  

}

// Render client
const renderClientList = (listClient)=>{
    let content = "";
    for (const client of listClient) {
        content += `
        <div 
        class="item-client"
        onclick="viewDetailClient(event)">
           <p>Tên: <span class="name">${client.username}</span></p>
           <p>Số điện thoại: <span class="phoneNumber">${client.phoneNumber}</span></p>
       </div>        
        `
    }
    document.getElementById("result-find").innerHTML = content;
}

// View Detail Client

const viewDetailClient = (e)=>{
    let eleClient = e.currentTarget;
    let phoneNumber = eleClient.querySelector(".phoneNumber").innerHTML;
    console.log(`./detailclient.html?phoneNumber=${phoneNumber}`);
    window.location.href = `./detailclient.html?phoneNumber=${phoneNumber}`;
}

// Event
document.getElementById("drop-type").onclick = () => {
    let classList = document.getElementById("list-type").classList;
    let check = false;
    for (const item of classList) {
        if (item == "d-none") {
            check = true;
        }
    }
    if (check) {
        showType();
    } else {
        hideType();
    }
}
document.getElementById("list-type").addEventListener("click", (event) => {
    event.preventDefault();
    let selectEle = event.target;
    let dataUrl = selectEle.getAttribute("data-url");
    if (dataUrl == "find/name") {
        document.getElementById("input-name").classList.remove("d-none");
        document.getElementById("input-phone").classList.add("d-none");
    } else {
        document.getElementById("input-name").classList.add("d-none");
        document.getElementById("input-phone").classList.remove("d-none");
    }

    document.getElementById("main-input").setAttribute("data-url", dataUrl);
    document.getElementById("drop-type").innerHTML = `${selectEle.innerHTML} <i class="fa-solid fa-caret-down"></i>`;
    hideType();
})
document.getElementById("suggest-result").addEventListener("click", (event) => {
    event.preventDefault();
    let eleSelect = event.target;
    let nameSugget = eleSelect.innerHTML;
    document.getElementById("input-name").value = nameSugget;
})
document.getElementById("input-phone").oninput = () => {
    let phoneNumber = document.getElementById("input-phone").value;
    let check = checkNumber(phoneNumber);
    if (check) {
        document.getElementById("input-phone").value = phoneNumber;
    } else {
        let deleteCharNumber = phoneNumber.replace(/\D/g, "");
        document.getElementById("input-phone").value = deleteCharNumber;
    }
}

document.getElementById("seach-client").onclick = async ()=>{
    try {
        let listClient = await searchClient();
        renderClientList(listClient);
    } catch (error) {
        console.log(error);
    }
    
    
}