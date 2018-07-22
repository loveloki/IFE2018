let histogram = document.querySelector("#histogram")
let axisToAxisWidth = 10

let getColumnWidth = function () {
    return histogram.offsetWidth/12 - axisToAxisWidth*2
}
let getColumnHeight = function (index) {
    return document.querySelector("#table-wrapper").querySelector("table").querySelector("tbody").querySelector("tr").querySelectorAll("th")[index].innerText
}
let getColumnColor = function () {
    return "#60acfc"
}
let Column = function (index) {
    let height = getColumnHeight(index)
    let width = getColumnWidth()
    let color = getColumnColor()
    o = {
        height: height,
        width: width,
        color: color,
    }

    return o
}


var drawHistogram = function (tr) {
    let areaHeight,
        areaWidth,
        axisHeight,
        axisWidth,
        axisColor,
        allColumnHeight,
        maxHeight

    
    let svg = document.querySelector("svg")
    let histogram = document.querySelector("#histogram")

    let data = document.querySelector("#table-wrapper").querySelector("table")

    let getAreaWidth = function() {
        return histogram.offsetWidth
    }
    let getAxisWidth = function() {
        return histogram.offsetWidth/12 - axisToAxisWidth*2
    }
    let getAxisHeight = function() {
        return maxHeight
    }
    let getAllColumnHeight = function () {
        let temp = []
        let monthData = tr.querySelectorAll("th")
        monthData.forEach(element => {
            if (Number(element.innerText)) {
                temp.push(element.innerText)
            }
        })        
        return temp
    }
    let getMaxHeight = function () {
        let temp = getAllColumnHeight()
        let result = temp[0]
        for (let i = 0; i < temp.length; i++) {
            if (result < temp[i]) {
                result = temp[i]
            }
        }
        return Number.parseInt(result)
    }
    maxHeight = getMaxHeight()
    axisWidth = getAxisWidth()
    axisHeight = getAxisHeight()
    areaHeight = maxHeight
    // console.log(areaHeight)
    areaWidth = getAreaWidth()
    svg.setAttribute("width",areaWidth)
    svg.setAttribute("height",areaHeight)
    svg.innerHTML = ""
    //绘制横轴和纵轴
    svg.innerHTML += `<line x1="10" y1="0" x2="10" y2=${areaHeight} style="stroke:rgb(99,99,99);stroke-width:2" />`
    svg.innerHTML += `<line x1="10" y1=${areaHeight} x2=${areaWidth} y2=${areaHeight} style="stroke:rgb(0,0,0);stroke-width:2" />`

    //绘制每一根柱子
    let position = {
        x : 0,
        y : 0,
    }
    let temp = getAllColumnHeight()
    // console.log(temp)
    for (let i = 0 ; i < temp.length; i++) {
        let column = Column(i)
        svg.innerHTML += `<rect x=${axisWidth * i + 10} y=${axisHeight - temp[i] - 1} width=${column.width} height=${temp[i]} style="fill:${column.color}"/>`
    }

}

//drawHistogram()