let reg = document.querySelector("#region-select")
let types = document.querySelector("#types-select")
let resultDiv = document.querySelector("#table-wrapper")
let regChBox = reg.querySelectorAll("input:not([name='全选'])")
let typesChBox = types.querySelectorAll("input:not([name='全选'])")

let getPosition = function () {
    let chBox = CheckBox()
    let flag
    let reg = chBox.getNumbers(regChBox)
    let types = chBox.getNumbers(typesChBox)
    if (reg == types == 1) {
        flag = 1
    } else if (reg == 1 && types > 1) {
        flag = 0
    } else if (reg > 1 && types == 1) {
        flag = 1
    } else {
        flag = 1
    }
    return flag
}
let Table = function () {
    let o = {

    }
    // 合并重复单元格
    o.mergeCells = function () {
        let tr = resultDiv.querySelectorAll("table tr")
        let temp = []//存储不变的td
        let change = []//存储改变的td
        let remove = []//存储删除的td
        let flag = 1
        for (let i = 0; i < tr.length; i++) {
            let td = tr[i].cells[0]
            if (temp.includes(td.innerText)) {
                remove.push(td)
            } else {
                temp.push(td.innerText)
                change.push(td)
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
    o.getRegSelectedData = function () {
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

        //判断是否有缓存,有的话从缓存读取
        //没有的话新建缓存
        if (window.localStorage) {
            if (!localStorage.getItem("sourceData")) {
                let temp = JSON.stringify(sourceData)
                localStorage.setItem("sourceData", temp)
            }
            sourceData = JSON.parse(localStorage.getItem("sourceData"))
        }

        sourceData.forEach(element => {
            if (regValue.includes(element.region) && typesValue.includes(element.product)) {
                let t = []
                if (getPosition() == 0) {
                    t.push(element.region, element.product, ...element.sale)
                } else {
                    t.push(element.product, element.region, ...element.sale)
                }

                temp.push(t)
            }
        })
        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < temp[i].length; j++) {
                temp[i][j] = "<td>" + temp[i][j] + "</td>"
            }
        }
        return temp
    }
    //设置table内容
    o.setRegSelectedData = function () {
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

    //注册事件,调用bar,line绘制出来

    o.addEvents = function () {
        //点击td,注册td的事件
        let trs = document.querySelector("table").querySelectorAll("tr")
        let tds = document.querySelector("table").querySelectorAll("td")
        
        //鼠标移入时draw tr
        let show = function () {
            for (let i = 1; i < trs.length; i++) {
                //show one tr
                trs[i].addEventListener("mouseover", function () {
                    drawHistogram(trs[i])
                    drawLine(trs[i])
                    //trs[i].style.background = "#60acfc"
                    trs[i].style.cursor = "pointer"
                }, false)

                //show all tr
                trs[i].addEventListener("mouseout", function () {
                    drawHistogram(trs[i])
                    drawLine()
                    //trs[i].style.background = "#fff"
                }, false)
                
            }
        }
        show()

        //td 点击编辑
        let tdClick = function () {
            //点击td
            for (let i = 0; i < tds.length; i++) {
                tds[i].addEventListener("click",function (e) {
                    let temp = Number(tds[i].innerText)
                    if (Number.isInteger(temp)) {
                        showEdit(e.target)
                    }
                    
                }, false)
            }

            //showEdit
            function showEdit (td) {
                
                

                if (td.nodeName == "TD") {
                    var oldNumber = td.innerText
                    cancelEditWhenClickOther(td, oldNumber)
                    td.innerHTML = `<div class="onEdit">
                                    <input type="number" id="number" value=${oldNumber}></input>` + `<span id="enter"></span><span id="cancel"></span>
                                    </div>`


                    td.classList.add("onEdit")
                    if (document.querySelector(".onEdit")) {
                        numberKeyUp(td, oldNumber)
                        buttonClick(td, oldNumber)
                    }
                    
                }
            }
            function cancelEditWhenClickOther(td, original) {
                document.addEventListener('click', function (e) {
                    var target = e.target;
                    if (target !== td) {
                        // && !target.parentNode.classList.contains("onEdit")
                        
                        td.innerHTML = original;
                        td.classList.remove("onEdit")
                    }
                },false)
            }

            //input框
            let numberKeyUp = function (td, oldNumber) {
                let number = document.querySelector("#number")
                number.addEventListener("keyup", function (e) {
                    switch (e.key) {
                        case "Escape":
                            cancelEditClick(td, oldNumber)
                            break;
                        case "Enter":
                            enterEditClick(td)
                            break;
                        default:
                            break;
                    }
                }, false)
            }

            //按钮
            let buttonClick = function (td, oldNumber) {
                let enter = document.querySelector("#enter")
                let cancel = document.querySelector("#cancel")

                enter.addEventListener("click", function () {
                    enterEditClick(td)
                })

                cancel.addEventListener("click", function () {
                    cancelEditClick(td, oldNumber)
                })
            }

            let cancelEditClick = function (td, oldNumber) {
                td.innerHTML = oldNumber
                td.classList.remove("onEdit")
            }
            let enterEditClick = function (td) {
                let number = document.querySelector("#number")
                td.innerHTML = number.value
                td.classList.remove("onEdit")

                let colIndex = td.cellIndex - 2
                let rowIndex = td.parentNode.rowIndex - 1
                sourceData[rowIndex].sale[colIndex] = Number(number.value)
                let temp = JSON.stringify(sourceData)
                localStorage.sourceData = temp
                cancelEditWhenClickOther(td, number.value)//重置cancel函数，因为不知道为什么还会触发，导致td值表面变回编辑之前的值

            }



        }
        tdClick()
        
        
    }
    //初始化table
    o.Init = function () {
        let month = (function () {
            let temp = ""
            for (let i = 0; i < 12; i++) {
                temp += `<th>${i + 1}月</th>`
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
        } else {
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
        o.addEvents()
    }
    return o
}