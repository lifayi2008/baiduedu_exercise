/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var eCity = document.getElementById("aqi-city-input");
    var cityName = eCity.value.trim();
    eCity.value = "";
    var eAirQuality = document.getElementById("aqi-value-input");
    var airQuality = eAirQuality.value;
    eAirQuality.value = "";
    if(aqiData[cityName] != undefined) {
        var result = window.confirm("城市名称已经存在，要更改吗？");
        if(!result) {
            return;
        }
    }
    if(cityName != "" && airQuality != "") {
        aqiData[cityName] = airQuality;
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var eTable = document.getElementById("aqi-table");
    eTable.innerHTML = "";
    var oTr = document.createElement("tr");
    oTr.innerHTML = "<th>城市</th><th>空气质量</th><th>操作</th>";
    eTable.appendChild(oTr);
    for(var cityName in aqiData) {
        var eTr = document.createElement("tr");
        var eTdCityName = document.createElement("td");
        eTdCityName.innerText = cityName;
        var eTdAirQuality = document.createElement("td");
        eTdAirQuality.innerText = aqiData[cityName];
        var eDelete = document.createElement("td");
        eDelete.innerHTML = "<a href='#'>删除</a>";
        eTr.appendChild(eTdCityName);
        eTr.appendChild(eTdAirQuality);
        eTr.appendChild(eDelete);
        eTable.appendChild(eTr);
    }
    var eDelBtn = document.getElementsByTagName("a");
    for(var i = 0; i < eDelBtn.length; i++) {
        eDelBtn[i].onclick = delBtnHandle;
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
    // do sth.
    event.preventDefault();
    var delCityName = event.target.parentNode.parentNode.firstChild.textContent;
    delete aqiData[delCityName];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var eAdd = document.getElementById("add-btn");
    eAdd.onclick = addBtnHandle;

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
