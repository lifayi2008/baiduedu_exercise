var data = [];
var searchKey = "";

function renderBox() {
    var eBoxList = document.querySelector(".three");
    eBoxList.innerHTML = "";

    if(data.length == 0) {
        return;
    }

    for(var i = 0; i < data.length; i++) {
        var eBox = document.createElement("div");
        eBox.innerText = data[i];
        eBox.style.height = "30px";
        if(searchKey != "" && data[i].search(searchKey) != -1) {
            eBox.style.backgroundColor = "#a00";
        }
        eBoxList.appendChild(eBox);
    }
}

var eBtnInsert = document.querySelector(".insert");
eBtnInsert.onclick = function() {
    var inputContent = document.querySelector(".inputContent").value;
    data = inputContent.split(/ |,|    |\n/).filter(function(e) {
        if(e.trim() != "") {
            return true;
        } else {
            return false;
        }
    });
    renderBox();
}

var eBtnSearch = document.querySelector(".search");
eBtnSearch.onclick = function() {
    searchKey = document.querySelector(".searchContent").value;
    renderBox();
    searchKey = "";
}