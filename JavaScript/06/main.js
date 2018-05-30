var y = document.getElementById("year-select")
var m = document.getElementById("month-select")
var d = document.getElementById("day-select")
var h = document.getElementById("hour-select")
var min = document.getElementById("minite-select")
var s = document.getElementById("second-select")

var year = ""
for (let i = 2000; i < 2021; i++) {
    year += "<option value=" + i + ">" + i + "</option>"
}
y.innerHTML = year

var month = ""
for (let i = 1; i < 13; i++) {
    month += "<option value=" + i + ">" + i + "</option>"
}
m.innerHTML = month

var day = ""
function setDay(num) {
    for (let i = 1; i < num + 1; i++) {
        day += "<option value=" + i + ">" + i + "</option>"    
    }
    d.innerHTML = day
}
setDay(31)

var hour = ""
for (let i = 0; i < 24; i++) {
    hour += "<option value=" + add0(i) + ">" + add0(i) + "</option>"    
}
h.innerHTML = hour

var minSec = ""
for (let i = 0; i < 60; i++) {
    minSec += "<option value=" + add0(i) + ">" + add0(i) + "</option>"    
}
min.innerHTML = minSec
s.innerHTML = minSec
y.addEventListener("change",function () {
    m[0].selected = true //重置为1月被选中
    d[0].selected = true
    setDay(31)
})
y.addEventListener("change",displayResult,false)
d.addEventListener("change",displayResult,false)
h.addEventListener("change",displayResult,false)
min.addEventListener("change",displayResult,false)
s.addEventListener("change",displayResult,false)
m.addEventListener("change",function () {
    var y = document.getElementById("year-select").value
    switch (m.value) {
        case "2":
        if(((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) == true) {
            setDay(29)
        }else{
            setDay(28)
        }
            break;
        case "4":
        case "9":
        case "11":
            setDay(30)
        default:
            break;
    }
    displayResult()
})

var resultP = document.querySelector("#result-wrapper")
var D = new Date(),
        nowDay = D.getDate()
function displayResult() {
    var date = y.value + "年" + m.value + "月" + d.value + "日"
    var oldDate = new Date(y.value, m.value - 1, d.value, h.value, min.value, s.value)
    console.log(oldDate.getTime());
    var newDate = new Date()
    console.log(newDate.getTime());
    var time = newDate.getTime() - oldDate.getTime()
    console.log(time)
    var temp
    if (time < 0) {
        time = -time
        temp = "还有"
    }else{
        temp = "已经过去"
    }
    var dayTime = parseInt(time/1000/3600/24)
    console.log(dayTime);
    var hTime = parseInt((time - dayTime*1000*3600*24)/3600/1000)
    console.log(hTime);
    var minTime = parseInt(time%(1000*3600)/(1000*60))
    console.log(minTime);
    var secTime = parseInt(time%(1000*60)/1000)
    console.log(secTime);
    var oldWeek = oldDate.getDay()
    var week = getWeek(oldWeek)
    var now = h.value + ":" + min.value + ":" + s.value
    var result = dayTime + "天" + hTime + "小时" + minTime + "分" + secTime + "秒"
    resultP.innerHTML = "现在距离 " +  date + week + " " + now + temp + result
}
function getWeek(week) {
    switch (week) {
        case 0:
                week = "星期日"
            break
        case 1:
                week = "星期一"
            break
        case 2:
                week = "星期二"
            break
        case 3:
                week = "星期三"
            break
        case 4:
                week = "星期四"
            break
        case 5:
                week = "星期五"
            break
        case 6:
                week = "星期六"
            break
        default:
            break
    }
    return week
}
function add0(temp) {
    if (temp < 10) {
        temp = "0" + temp
    }
    return temp
}