let cvs = document.querySelector("canvas")
let ctx = cvs.getContext("2d")

let line = document.querySelector("#line")
//console.log(line);

cvs.width = line.offsetWidth

let getAllHeight = function () {
    let temp = []
    let data = document.querySelector("#table-wrapper").querySelector("table")
    let monthData = data.querySelector("tbody").querySelector("tr").querySelectorAll("th")
    monthData.forEach(element => {
        if (Number(element.innerText)) {
            temp.push(element.innerText)
        }
    })
    return temp
}
let getMaxHeight = function () {
    let temp = getAllHeight()
    let flag = temp[0]
    for (let i = 0; i < temp.length; i++) {
        if (temp[i] > flag) {
            flag = temp[i]
        }
    }
    return Number.parseInt(flag)
}

let height = getAllHeight()
let maxHeight = getMaxHeight()
//x, y 轴
ctx.beginPath()
ctx.moveTo(10,10)
ctx.lineTo(10,maxHeight + 10)
ctx.lineTo(1500,maxHeight + 10)
ctx.stroke()
//绘制折线
let position = {
    x: 10 + 30 + 10,
    y: height[0],
}
for (let i = 0; i < getAllHeight().length; i++) {
    if (i == 0) {
        ctx.beginPath()
        ctx.moveTo(position.x, position.y)
    }else{
        position.x += 70
        position.y = maxHeight - height[i] + 10
        ctx.lineTo(position.x, position.y)
    }
    ctx.arc(position.x, position.y, 5, 0, Math.PI*2, true)    
}
ctx.stroke()