let reg = document.querySelector("#region-select")
let types = document.querySelector("#types-select")
let resultDiv = document.querySelector("#table-wrapper")
let regChBox = reg.querySelectorAll("input:not([name='全选'])")
let typesChBox = types.querySelectorAll("input:not([name='全选'])")

let getPosition = function() {
    let chBox = CheckBox()
    let flag
    let reg = chBox.getNumbers(regChBox)
    let types = chBox.getNumbers(typesChBox)
    if (reg == types == 1) {
        flag = 1
    }else if(reg == 1 && types > 1){
        flag = 0
    }else if(reg > 1 && types == 1){
        flag = 1
    }else{
        flag = 1
    }
    return flag
}
let Table = function() {
    let o = {

    }
    // 合并重复单元格
    o.mergeCells = function() {
        let tr = resultDiv.querySelectorAll("table tr")
        let temp = []//存储不变的th
        let change = []//存储改变的th
        let remove = []//存储删除的th
        let flag = 1
        for (let i = 0; i < tr.length; i++) {
            let th = tr[i].cells[0]
            if (temp.includes(th.innerText)) {
                remove.push(th)
            }else{
                temp.push(th.innerText)
                change.push(th)
            }
        }
        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < remove.length; j++) {
                if (remove[j].innerText == temp[i]) {
                    remove[j].parentNode.removeChild(remove[j])
                    change[i].rowSpan++
                }
            }
        }    
    }
    
    //获取CheckBox选中项目
    o.getRegSelectedData = function() {
        //将所有数据存为数组
        let temp = []
        let regValue = []
        let typesValue = []
    
        regChBox.forEach(element => {
            if (element.checked) {
                regValue.push(element.id)
            }
        })
        typesChBox.forEach(element => {
            if (element.checked) {
                typesValue.push(element.id)
            }
        })
        
        sourceData.forEach(element => {
            if (regValue.includes(element.region) && typesValue.includes(element.product)) {
                let t = []
                if (getPosition() == 0) {
                    t.push(element.region,element.product,...element.sale)    
                } else {
                    t.push(element.product,element.region,...element.sale)
                }
                
                temp.push(t)
            }
        })
        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < temp[i].length; j++) {
                temp[i][j] = "<th>" +temp[i][j] + "</th>"
            }
        }
        return temp
    }
    //设置table内容
    o.setRegSelectedData = function() {
        let temp = o.getRegSelectedData()
        let data = ""
        for (let i = 0; i < temp.length; i++) {
            data += "<tr>"
            for (let j = 0; j < temp[i].length; j++) {
                data += temp[i][j]
            }
            data += "</tr>"
        }
        document.querySelector("#table-wrapper").querySelector("table").innerHTML += data
    }
    //初始化table
    o.Init = function() {
        let month = (function () {
            let temp = ""
            for (let i = 0; i < 12; i++) {
                temp += `<th>${i+1}月</th>`
            }
            return temp
        })()
        let t
        let flag = getPosition()
        if (flag == 1) {
            t = `<table>
                    <thead>
                        <tr>
                            <th>商品</th>
                            <th>地区</th>
                            ${month}
                    </thead>
                </table>`
        }else{
            t = `<table>
                    <thead>
                        <tr>
                            <th>地区</th>
                            <th>商品</th>
                            ${month}
                    </thead>
                </table>`
        }
        
        resultDiv.innerHTML = t
        o.setRegSelectedData()
        o.mergeCells()
    }
    return o
}