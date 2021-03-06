/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: 0,
    nowGraTime: "day"
}

var cities = [];

function displayHandler(event) {
    var eSpan = document.getElementsByTagName("span")[0];
    eSpan.innerText = event.target.style.height.replace(/px/, "");
    eSpan.style.backgroundColor = "blue";
    eSpan.style.color = "white";
    eSpan.style.fontSize = "12px";
    eSpan.style.top = event.clientY - 10 + "px";
    eSpan.style.left = event.clientX + 10 + "px";
}

function createNumBox() {
    //创建一个显示数值的元素
    var eSpan = document.createElement("span");
    eSpan.style.position = "fixed";
    eSpan.style.top = "-999px";
    document.body.appendChild(eSpan);
}

function hiddenHandler(event) {
    var eSpan = document.getElementsByTagName("span")[0];
    eSpan.style.top = "-999px"
}

/**
 * 渲染图表
 */
function renderChart() {
    var eWidth = 8;

    if(pageState.nowGraTime == "month") {
        eWidth = 40;
    } else if(pageState.nowGraTime == "week") {
        eWidth = 20;
    }

    var chartElement = document.querySelector(".aqi-chart-wrap");

    chartElement.innerHTML = "";

    for(var i in chartData) {
        var eDiv = document.createElement("div");
        eDiv.style.width = eWidth + "px";
        eDiv.style.border = "1px solid #fff";
        eDiv.style.height = chartData[i];
        eDiv.style.cursor = "pointer";
        if(chartData[i] < 100) {
            eDiv.style.backgroundColor = "green";
        } else if(chartData[i] < 500) {
            eDiv.style.backgroundColor = "red";
        } else {
            eDiv.style.backgroundColor = "black";
        }
        eDiv.onmouseover = displayHandler;
        eDiv.onmouseout = hiddenHandler;
        chartElement.appendChild(eDiv);
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
    // 确定是否选项发生了变化
    if(event.target.value != pageState.nowGraTime) {

        // 设置对应数据
        pageState.nowGraTime = event.target.value;
        initAqiChartData()
    }

    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(event) {
    // 确定是否选项发生了变化
    if(pageState.nowSelectCity != event.target.selectedIndex) {

        // 设置对应数据
        pageState.nowSelectCity = event.target.selectedIndex;
        initAqiChartData()
    }

    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var eGraTimeParent = document.getElementById("form-gra-time");
    for(var i = 0; i < eGraTimeParent.children.length; i++) {
        if(eGraTimeParent.children[i] instanceof HTMLLabelElement) {
            eGraTimeParent.children[i].firstElementChild.onclick = graTimeChange;
        }
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var eSelect = document.getElementById("city-select");
    for(var i in aqiSourceData) {
        var eOption = document.createElement("option");
        eOption.innerText = i;
        eSelect.add(eOption);
        cities.push(i);
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    eSelect.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var cityData = null;
    var chartDataArray = null;

    if(pageState.nowGraTime == "day") {
        chartData = aqiSourceData[cities[pageState.nowSelectCity]];
    }

    if(pageState.nowGraTime == "week") {
        cityData = aqiSourceData[cities[pageState.nowSelectCity]];
        chartDataArray = {};

        for(var i in cityData) {
            var startDate = i;
            break;
        }

        var startDateInWeek = new Date(startDate).getDay();

        var j = 0, x = 0, total = 0;
        for(var i in cityData) {
            j++;
            startDateInWeek++;
            total += cityData[i];

            if(j == 7 || startDateInWeek == 7) {
                chartDataArray[x] = Number.parseInt(total / j);
                j = 0;
                total = 0;
                x++;
            }
        }
        chartData = chartDataArray;
    }

    if(pageState.nowGraTime == "month") {
        cityData = aqiSourceData[cities[pageState.nowSelectCity]];
        chartDataArray = {};

        var j = 0, oldMonth = 1;
        for(var i in cityData) {
            j++;
            var month = parseInt(i.substring(5,7))
            if(chartDataArray[month] == undefined) {
                chartDataArray[month] = 0;
            }
            chartDataArray[month] += cityData[i];
            if(month != oldMonth) {
                chartDataArray[oldMonth] = Number.parseInt(chartDataArray[oldMonth] / (j - 1));
                j = 1;
                oldMonth = month;
            }
        }
        chartDataArray[oldMonth] = Number.parseInt(chartDataArray[oldMonth] / j);
        chartData = chartDataArray;
    }
}

/**
 * 初始化函数
 */
function init() {
    createNumBox();
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();
