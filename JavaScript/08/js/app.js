let __main = function() {
    let chBox = CheckBox()
    let newTable = Table()
    
    reg.addEventListener("click",function (e) {
        chBox.changeSelect(e.target,reg)
        newTable.Init()
    },false)
    types.addEventListener("change",function (e) {
        chBox.changeSelect(e.target,types)
        newTable.Init()
    },false)

    newTable.Init()
}

__main()