

const activeType = () => {
    document.getElementById("list-type").classList.remove("d-none");
    document.getElementById("list-type").classList.add("drop-down-animation");
    setTimeout(() => {
        document.getElementById("list-type").classList.remove("drop-down-animation");
    }, 500)
}

const hideType = () => {
    document.getElementById("list-type").classList.add("drop-up-animation");
    setTimeout(() => {
        document.getElementById("list-type").classList.add("d-none");
        document.getElementById("list-type").classList.remove("drop-up-animation");

    }, 400)
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
        activeType();
    } else {
        hideType();
    }
}
document.getElementById("list-type").addEventListener("click", (event)=>{
    event.preventDefault();
    let selectEle = event.target;
    let dataUrl = selectEle.getAttribute("data-url");
    document.getElementById("main-input").setAttribute("data-url", dataUrl);
    document.getElementById("drop-type").innerHTML = `${selectEle.innerHTML} <i class="fa-solid fa-caret-down"></i>`;
    hideType();
})