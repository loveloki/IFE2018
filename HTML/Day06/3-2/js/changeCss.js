window.onload = function() {
    var left_box = document.querySelector(".left-box")
    var left_box = document.querySelector(".right-box")
    var css_style = document.querySelectorAll("link")
    var button_float = document.querySelector("#float-css")
    var button_position = document.querySelector("#position-css")
    var button_flexbox = document.querySelector("#flexbox-css")
    button_float.addEventListener("click",function () {
        css_style[1].setAttribute("href", "css/float.css")
    })
    button_position.addEventListener("click",function () {
        css_style[1].setAttribute("href", "css/position.css")
    })
    button_flexbox.addEventListener("click",function () {
        css_style[1].setAttribute("href", "css/flexbox.css")
    })
}