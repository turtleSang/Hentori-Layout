let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

// Loader

const turnOnLoader = () => {
    document.getElementById("loader-group").style.display = "block";
}

const turnOffLoader = () => {
    document.getElementById("loader-group").style.display = "none";
}

// Render date
for (let index = year - 5; index < year + 10; index++) {
    if (index === year) {
        document.getElementById("year-input").innerHTML += `<option selected value="${index}">Năm ${index}</option>`;
    } else {
        document.getElementById("year-input").innerHTML += `<option value="${index}">Năm ${index}</option>`;
    }
}

for (let index = 1; index <= 12; index++) {
    if (index === (month + 1)) {
        document.getElementById("month-input").innerHTML += `<option selected value="${index}">Tháng ${index}</option>`;
    } else {
        document.getElementById("month-input").innerHTML += `<option value="${index}">Tháng ${index}</option>`;
    }

}

// Render report
const renderReport = (reportDto) => {
    let {
        accessoryAmount,
        accessoryTotal,
        trousersAmount,
        trousersTotal,
        suitAmount,
        suitTotal,
        shirtAmount,
        shirtTotal,
        amount,
        total,
        target,
    } = reportDto;
    let maxTotal = total > target ? total : target;
    let completePercentage = (total * 100 / target).toFixed(2);
    // Render revenue
    target = target.toFixed(0)
    document.getElementById("target").innerHTML = formatNumber(target) + " đồng";
    document.getElementById("complete").innerHTML = formatNumber(total) + " đồng";
    document.getElementById("percentage_total").innerHTML = target === 0 ? "Target" : completePercentage + "%";

    renderBarTotal(".ao", maxTotal, shirtTotal, "total-ao");
    renderBarTotal(".quan", maxTotal, trousersTotal, "total-quan");
    renderBarTotal(".suit", maxTotal, suitTotal, "total-suit");
    renderBarTotal(".phukien", maxTotal, accessoryTotal, "total-phukien");
    // Render Amount
    renderAmount(amount, { accessoryAmount, trousersAmount, suitAmount, shirtAmount });

}

const renderBarTotal = (classType, maxTotal, totalType, idTotal) => {
    let elePieChart = document.getElementById("chart-complete");
    let eleType = elePieChart.querySelector(classType);
    let completePercentage = (totalType * 100 / maxTotal).toFixed(2);
    eleType.style.width = `${completePercentage}%`;
    eleType.querySelector("span").innerHTML = completePercentage + "%";
    document.getElementById(idTotal).innerHTML = formatNumber(totalType) + " đồng"
}

const renderAmount = (amount, listAmount) => {
    document.getElementById("amount").innerHTML = amount;
    let maxAmount = -1;
    for (const key in listAmount) {
        if (Object.hasOwnProperty.call(listAmount, key)) {
            const amountType = listAmount[key];
            if (amountType > maxAmount) {
                maxAmount = amountType;
            }
        }
    }
    renderBarAmountList(maxAmount, listAmount)
}

const renderBarAmountList = (maxAmount, listAmount) => {
    let { accessoryAmount, trousersAmount, suitAmount, shirtAmount } = listAmount;
    renderBarAmount(maxAmount, accessoryAmount, "bar-phukien");
    renderBarAmount(maxAmount, trousersAmount, "bar-quan");
    renderBarAmount(maxAmount, suitAmount, "bar-suit");
    renderBarAmount(maxAmount, shirtAmount, "bar-ao");
}

const renderBarAmount = (maxAmount, typeAmount, idEle) => {
    let percentage = (typeAmount * 100 / maxAmount).toFixed(2);
    document.getElementById(idEle).innerHTML = typeAmount == 0 ? "" : typeAmount;
    document.getElementById(idEle).style.width = maxAmount == 0 ? "" : `${percentage}%`;
}
// Select type
const selectTypeReport = (e) => {
    let eleSelect = e.currentTarget;
    let type = eleSelect.getAttribute("data-type");
    let contentSelect = eleSelect.innerHTML;
    if (type === "month") {
        document.getElementById("month-report").style.display = "block";
        document.getElementById("quarter-report").style.display = "none";
        document.getElementById("create-target").style.display = "block";
        document.getElementById("year-report").style.display = "block";
        document.getElementById("day-report").style.display = "none";


    } else if (type === "day") {
        document.getElementById("month-report").style.display = "none";
        document.getElementById("quarter-report").style.display = "none";
        document.getElementById("create-target").style.display = "none";
        document.getElementById("year-report").style.display = "none";
        document.getElementById("day-report").style.display = "block";
    }
    else {
        document.getElementById("month-report").style.display = "none";
        document.getElementById("quarter-report").style.display = "block";
        document.getElementById("create-target").style.display = "none";
        document.getElementById("year-report").style.display = "block";
        document.getElementById("day-report").style.display = "none";


    }

    document.getElementById("type_report").innerHTML = contentSelect;
    document.getElementById("get_report").setAttribute("data-type", type)
}
// Create params get report
const createParams = (type) => {
    let value = document.getElementById(`${type}-input`).value;
    let year = document.getElementById("year-input").value;
    if (type === "month") {
        return {
            month: value,
            year
        }
    } else if (type === "day") {
        let date = formatDateTimeISOtoVN(value);
        let day = `${date.day}/${date.month}/${date.year}`
        return {
            day
        }
    } else {
        return {
            quarter: value,
            year
        }
    }

}

// Event click
document.getElementById("get_report").onclick = async (event) => {
    let type = event.target.getAttribute("data-type");
    let params = createParams(type);
    let url = `${rootUrl}/report/${type}`
    try {
        turnOnLoader();
        let { object } = await callAPI("get", url, params, headers, {});
        console.log(object);
        renderReport(object);
        document.getElementById("report").style.display = "block"
    } catch (error) {
        alert("Không có dữ liệu");
        console.log(error);
        document.getElementById("report").style.display = "none"
    }
    turnOffLoader();
}

document.getElementById("create-target").onclick = () => {
    let month = document.getElementById("month-input").value;
    let year = document.getElementById("year-input").value;
    document.getElementById("month").innerHTML = month;
    document.getElementById("year").innerHTML = year;
}
document.getElementById("confirm-kpi").onclick = async () => {
    let year = document.getElementById("year").innerHTML;
    let month = document.getElementById("month").innerHTML;
    let target = formatNumberToRaw(document.getElementById("input-target").value);
    if (!checkNumber(target)) {
        alert("Vui lòng nhập lại chỉ tiêu");
        return;
    }
    try {
        let kpiRequest = new KPIRequest(month, year, target);
        let url = `${rootUrl}/kpi/create`;
        let data = await callAPI("post", url, {}, headers, kpiRequest);
        alert("Cập nhật KPI thành công")
    } catch (error) {
        alert("Cập nhật KPI thất bại")
    }
    document.getElementById("input-target").value = "";
    document.getElementById("close-confirm-kpi").click();

}

