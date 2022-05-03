let ary = [];
let currentAry = [];
const List = document.querySelector(".showList");
const btnGroup = document.querySelector(".button-group");
const inputTxt = document.querySelector(".rounded-end");
const search = document.querySelector(".search");
const sortAdvanced = document.querySelector(".js-sort-advanced");
const tableSelect = document.getElementById("js-select");


// 點選 蔬菜水果花卉按鈕 排列
btnGroup.addEventListener("click", e => {


    // 點到的按鈕變成active
    if (e.target.classList.contains("btn-type")) {

        let btnSelect = document.querySelectorAll(".btn-type");
        btnSelect.forEach(item => {
            item.classList.remove("active");
            console.log(item.className);
        })
        e.target.classList.add("active");
        console.log(e.target.className);
    }



    let type = e.target.dataset.type;

    axios.get('https://hexschool.github.io/js-filter-data/data.json')
        .then(function (response) {
            ary = response.data;

            if (type == "N04") {
                let vegetableAry = ary.filter(item => {
                    return item.種類代碼 == "N04";
                })
                currentAry = vegetableAry;
            }

            else if (type == "N05") {
                let fruitAry = ary.filter(item => {
                    return item.種類代碼 == "N05";
                })
                currentAry = fruitAry;
            }

            else if (type == "N06") {
                let flowerAry = ary.filter(item => {
                    return item.種類代碼 == "N06";
                })
                currentAry = flowerAry;
            }

            tableSelect.options[0].selected = true; //把下拉選單調回排序篩選
            renderData(currentAry);

        })
})



// 按下搜尋按鈕 
search.addEventListener("click", () => {
    if (inputTxt.value != "") {
        let txt = inputTxt.value;
        showCustomName(txt);

        inputTxt.value = ""; //輸入欄位清空
        tableSelect.options[0].selected = true; //把下拉選單調回排序篩選
    }

})

//模糊搜尋
let showCustomName = (name) => {

    axios.get('https://hexschool.github.io/js-filter-data/data.json')
        .then(function (response) {

            ary = response.data;
            currentAry = [];

            for (i = 0; i < ary.length; i++) {
                if (ary[i].作物名稱 != null && ary[i].作物名稱.indexOf(name.trim()) >= 0) {
                    currentAry.push(ary[i]);
                }
            }

            renderData(currentAry);
        })
}


//當下拉選項改變時
tableSelect.onchange = function () {
    var valOption = this.options[this.selectedIndex].value; //獲取option的value
    // console.log(valOption);
    sortItem(valOption, "up");

}




// 點擊箭頭使價格排列

let sortItem = (price, sortType) => {
    //    數字高低排列
    currentAry.sort((a, b) => {
        if (sortType == "up") {
            return b[price] - a[price];
        }
        else {
            return a[price] - b[price];
        }

    }
    );
    renderData(currentAry);
}

sortAdvanced.addEventListener("click", e => {

    if (e.target.classList.contains("fas")) {
        let price = e.target.dataset.price;
        let sortType = e.target.dataset.sort;
        sortItem(price, sortType);
    }

})





let renderData = (ary) => {

    let str = "";
    if (ary.length == 0) {
        str = `<tr><td colspan="7">查詢不到交易資訊QQ</td></tr>`
    }


    ary.forEach(item => {
        // 過濾掉價格=0的項目
        if (item.上價 != 0) {
            str += `<tr><td>${item.作物名稱}</td><td>${item.市場名稱}</td><td>${item.上價}</td><td>${item.中價}</td><td>${item.下價}</td><td>${item.平均價}</td><td>${item.交易量}</td></tr>`;
        }

    });

    List.innerHTML = str;
}






