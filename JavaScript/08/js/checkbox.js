let CheckBox = function() {
    let o = {

    }
    //改变选中状态
    o.changeSelect = function(e, parent) {
        let chBox = parent.querySelectorAll("input:not([name='全选'])")
        if (e.name == "全选") {
            let flag = e.checked
            for (let i = 0; i < chBox.length; i++) {
                chBox[i].checked = flag
            }
        }else if(e.type == "checkbox"){
            let flag = o.getNumbers(chBox)
            if (flag == 3) {
                parent.querySelector("input[name='全选']").checked = true
            }else if(flag == 0){
                e.checked = true
            }else{
                parent.querySelector("input[name='全选']").checked = false
            }
        }
    }
    //取得选中数量
    o.getNumbers = function (list) {
        let flag = 0
        for (let i = 0; i < list.length; i++) {
            if(list[i].checked == true){
                flag++
            }
        }
        return flag
    }
    return o
}