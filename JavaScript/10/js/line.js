let drawLine = function (tr) {
    //get height data
    
    let getColumns = function (tr) {
        if (!tr) {
            tr = document.querySelector("#table-wrapper").querySelector("table").querySelectorAll("tr")[1]
        }
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
        //console.log(temp)
        let result = temp[0]
        
        for (let i = 0; i < temp.length; i++) {
            if (result < temp[i]) {
                result = temp[i]
            }
        }
        return result
    }
    if (!tr) {
        getMaxHeight = function () {
            let trs = document.querySelector("table").querySelectorAll("tr")    
            trs = [...trs].slice(1,trs.length)
            let temp = []
            for (let i = 0, len = trs.length; i < len; i++) {
                temp.push(...getColumns(trs[i]))
            }
            let result = temp[0]
            for (let i = 1, len2 = temp.length; i < len2; i++) {
                if (result < temp[i]) {
                    result = temp[i]
                }
            }
            return result
        }
    }

    //clean old canvas
    let cvs = document.querySelector("canvas")
    cvs.innerHTML = ""

    //draw line
    let ctx = cvs.getContext("2d")
    let line = document.querySelector("#line")
    let lineWidth = line.offsetWidth - 20
    let lineHeight = 400
    let maxHeight = getMaxHeight()
    cvs.setAttribute("width", lineWidth)
    cvs.setAttribute("height", lineHeight)

    //draw x, y轴
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(0,lineHeight)
    ctx.lineTo(lineWidth,lineHeight)
    ctx.stroke()
    //绘制折线
    let draw = function (drawTr,index) {
        let temp = getColumns(drawTr)
        let colors = ["#60acfc", "#32d3eb", "#5bc49f", "#feb64d", "#ff7c7c", "#9287e7", "#A252A9", "#5B7FC0", "#000"]
        for (let i = 0, len = temp.length; i < len; i++) {
            let x = lineWidth/12 * i + lineWidth/24
            let y = lineHeight - lineHeight / maxHeight *temp[i]
            if (i == 0) {
                ctx.beginPath()
                ctx.strokeStyle=colors[index];
                ctx.moveTo(x, y)
            }else{
                ctx.lineTo(x, y)
            }
        }
        ctx.stroke()
        //绘制折点处圆圈
        for (let i = 0, len = temp.length; i < len; i++) {
            let x = lineWidth/12 * i + lineWidth/24
            let y = lineHeight - lineHeight / maxHeight *temp[i]
            ctx.beginPath()
            ctx.arc(x, y, 5, 0, Math.PI*2, true)
            ctx.fillStyle=colors[index]
            ctx.fill()
            ctx.stroke()
        }    
    }
    if (!tr) {
        let trs = document.querySelector("table").querySelectorAll("tr")    
        trs = [...trs].slice(1,trs.length)        
        for (let i = 0; i < trs.length; i++) {
            let temp = trs[i]
            draw(temp,i)
        }    
    }else{
        draw(tr)
    }
    
    
}