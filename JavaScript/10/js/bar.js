/*
 * 画布大小-->外部div大小
 * 柱形-->
 * 12个
 * 宽度-->div.width/12 - 间距
 * 高度-->从列表中获取
 * 
 */

//draw Columns
let drawHistogram = function (tr) {
    if (!tr) {
        tr = document.querySelector("#table-wrapper").querySelector("table").querySelectorAll("tr")[1]
    }
    //get columns height data
    let getColumns = function () {
        let temp = []
        let monthData = tr.querySelectorAll("td")        
        monthData.forEach(element => {
            if (Number(element.innerText)) {
                temp.push(Number.parseInt(element.innerText))
            }
        })
        return temp
    }

    //get max height
    let getMaxHeight = function () {
        let temp = getColumns(tr)
        //console.log(temp);
        let result = temp[0]
        for (let i = 0; i < temp.length; i++) {
            if (result < temp[i]) {
                result = temp[i]
            }
        }
        return result
    }

    //clean old_svg
    let svg = document.querySelector("svg")
    svg.innerHTML = ""

    //draw svg
    let svgWidth = document.querySelector("#histogram").offsetWidth - 20
    let maxHeight = getMaxHeight()
    let svgHeight = 400
    // console.log(svgWidth, svgHeight);
    
    svg.setAttribute("width",svgWidth)
    svg.setAttribute("height",svgHeight)
    //绘制横轴和纵轴
    svg.innerHTML += `<line x1="0" y1="0" x2="0" y2=${svgHeight} style="stroke:rgb(99,99,99);stroke-width:2" />`
    svg.innerHTML += `<line x1="0" y1=${svgHeight} x2=${svgWidth} y2=${svgHeight} style="stroke:rgb(0,0,0);stroke-width:2" />`
    //绘制每一根柱子
    let position = {
        x : 0,
        y : 0,
    }
    let temp = getColumns()
    // console.log(temp)
    for (let i = 0, len = temp.length; i < len; i++) {
        svg.innerHTML += `<rect x=${svgWidth / 12 * i + 10} y=${svgHeight - svgHeight / maxHeight * temp[i]} width=${svgWidth / 12 - 20} height=${svgHeight / maxHeight * temp[i]} style="fill: #60acfc"/>`
    }

 }
 