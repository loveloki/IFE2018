var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net']
var emailInput = document.querySelector("#email-input")
var emailWrapper = document.querySelector("#email-sug-wrapper")
emailInput.addEventListener("input",Prompt,false)
emailWrapper.addEventListener("click",function (e) {
    if (e.target) {
        emailInput.value = e.target.innerText
        unDisplay(emailWrapper)
    }
},false)

var nowSelectTipIndex = 0
emailInput.addEventListener("keyup",function (e) {
    var liOn = getLiOn()
    if (e.key == "Enter") {
        emailInput.value = liOn.innerText
        unDisplay(emailWrapper)        
    }else{
        if(e.key == "ArrowUp"){
            if (nowSelectTipIndex == 0) {
                nowSelectTipIndex = emailWrapper.querySelectorAll("li").length - 1
            }else{
                nowSelectTipIndex --
            }
        }else if(e.key == "ArrowDown"){
            if (nowSelectTipIndex == emailWrapper.querySelectorAll("li").length - 1) {
                nowSelectTipIndex = 0
            }else{
                nowSelectTipIndex++
            }
        }
        Prompt()
    }
},false)
function getLiOn() {
    return emailWrapper.querySelectorAll("li")[nowSelectTipIndex]
}
function Prompt() {
    var text = getText()
    var li = createLi(text)
    addUlElement(li)
    displayUl(emailWrapper)
}

function getText() {
    var text = emailInput.value.trim()
    return text
}

function createLi(text) {
    // text = encodeURI(text)
    var flag = text.indexOf("@")
    var pre = ""
    if (flag != -1) {
        pre = text.slice(flag + 1)
        text = text.slice(0,flag)
    }else{
        text = text
    }
    var liArray = []
    postfixList.forEach(element => {
        if (pre == "") {
            liArray.push(text+"@"+element)
        }else{
            if (element.slice(0, pre.length) == pre) {
                liArray.push(text+"@"+element)
            }else if(pre.search(element.slice(0, pre.length)) != -1){
                //输入a@qq.comm->出现提示框，出现qq提示
                liArray.push(text+"@"+element)
            }
        }
        
    })
    return liArray
}
function addUlElement(li) {
    emailWrapper.innerHTML = ""
    li.forEach(element => {
        // emailWrapper.innerHTML += "<li>" + element +"</li>"
        var li = document.createElement("li")
        li.innerText = element
        emailWrapper.appendChild(li)
    });
    emailWrapper.querySelectorAll("li")[nowSelectTipIndex].className = "li-on"
}

function displayUl(element) {
    if(element.hasChildNodes() && element.childNodes[0].innerText[0] !== "@"){
        display(element)
    }else{
        unDisplay(element)
    }
}
function display(element) {
    element.style.display = "block"
}
function unDisplay(element) {
    element.style.display = "none"
}

