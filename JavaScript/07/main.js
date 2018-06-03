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
emailInput.addEventListener("keyup",function (e) {
    var liOn = getLiOn()
    if (e.key == "Enter") {
        emailInput.value = liOn.innerText
        unDisplay(emailWrapper)        
    }else if(e.key == "ArrowUp"){
        if (liOn.previousSibling) {
            liOn.previousSibling.className = "li-on"
        }else{
            emailWrapper.lastChild.className = "li-on"
        }
        liOn.className = ""
    }else if(e.key == "ArrowDown"){
        if (liOn.nextSibling) {
            liOn.nextSibling.className = "li-on"
        }else{
            emailWrapper.querySelector("li").className = "li-on"
        }
        liOn.className = ""
    }else{
        if (liOn) {
            liOn.className = ""
        }
        if (emailWrapper.hasChildNodes()) {
            //if hava child 
            emailWrapper.querySelector("li").className = "li-on"
        }
    }
},false)
function getLiOn() {
    return emailWrapper.querySelector(".li-on")
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

