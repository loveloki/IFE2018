window.onload = function(){
    var btn = document.querySelector(".btn")
    var line = document.querySelector(".line")
    var IsGoTranstion = true
    btn.addEventListener("click", function() {
            if(IsGoTranstion == true){
                line.className = "line line-transtion"
                IsGoTranstion = false
            }else{
                line.className = "line back-line-transtion"
                IsGoTranstion = true
            }
    }, false)
}