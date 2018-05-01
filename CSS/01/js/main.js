window.onload = function(){
    var btn = document.querySelector(".btn")
    var line = document.querySelector(".line")
    var text = document.querySelector("h1")
    var IsGoTranstion = true //记录是否进行transtion
    btn.addEventListener("click", function() {
            if(IsGoTranstion == true){
                line.className = "line line-transtion"
                text.style.color = "#35f"
                IsGoTranstion = false
            }else{
                line.className = "line"
                IsGoTranstion = true
                text.style.color = "#000"
            }
    }, false)
}