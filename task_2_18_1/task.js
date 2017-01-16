var boxListData = [];

//点击移除元素的时间处理程序
function clickRemoveHandler(event) {
    var eParent = document.getElementById("boxList");
    eParent.removeChild(event.target);
    for(var i = 0; i < boxListData.length; i++) {
        if(boxListData[i] == event.target.innerText) {
            boxListData.splice(i,1);
            break;
        }
    }
    renderBoxList();
}

//使用全局的数组来渲染dom
function renderBoxList() {
    var eParent = document.getElementById("boxList");
    eParent.innerHTML = "";

    for(var i = 0; i < boxListData.length; i++) {
        var box = document.createElement("div");
        box.setAttribute("class", "box");
        box.innerText = boxListData[i];
        box.onclick = clickRemoveHandler;
        eParent.appendChild(box);
    }
}

//为4个按钮分别绑定事件处理处理程序
function action() {
    var eBtnLeftIn = document.getElementById("leftIn");
    eBtnLeftIn.onclick = function() {
        var inputValue = parseInt(document.getElementById("input").value);
        if(inputValue) {
            boxListData.unshift(inputValue);
            renderBoxList();
        }
    };

    var eBtnRightIn = document.getElementById("rightIn");
    eBtnRightIn.onclick = function() {
        var inputValue = parseInt(document.getElementById("input").value);
        if(inputValue) {
            boxListData.push(document.getElementById("input").value);
            renderBoxList();
        }
    };

    var eBtnLeftOut = document.getElementById("leftOut");
    eBtnLeftOut.onclick = function() {
        var popedValue = boxListData[0];
        for(var i = 0; i < boxListData.length - 1; i++) {
            boxListData[i] = boxListData[i+1];
        }
        boxListData.length -= 1;
        renderBoxList();
        alert(popedValue);
    };

    var eBtnRightOut = document.getElementById("rightOut");
    eBtnRightOut.onclick = function() {
        var popedValue = boxListData.pop();
        renderBoxList();
        alert(popedValue);
    };
}

function init() {
    action();
    renderBoxList();
}

init();