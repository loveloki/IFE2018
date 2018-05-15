window.onload = function(){
    var o = document.querySelector(".right")
    var d = document.createElement("div")
    d.className = "row"
    d.innerHTML = "<a>点击查看更多</a>"
    var a = d.querySelector("a")
    a.style.fontSize = "18px"
    a.style.color = "red"
    a.style.marginBottom = "10px"
    a.addEventListener("click",function () {
        a.innerHTML = "<h2>《人间失格》</h2>"
        d.innerHTML += "<p>太宰治的《人间失格》一书以某作家为口吻写成。“我”（即作家）在二战后于船桥认识酒吧的老板娘，后来老板娘把大庭叶藏（主角）寄来的三本笔记簿和三张照片交给故事中的“我”，三本笔记分别为“第一手札”、“第二手札”、“第三手札”（第三手札又分为两部分）。“我”为其题上了“前言”与“后记”，并将三封手札原封不动地呈现。这三本笔记的作者大庭叶藏写了自己从青少年到中年，如何酗酒、沉溺女色、参加“非法”左翼团体、企图自杀的经历。主人公称自己十分惧怕“人类”，只能在其面前冒着被揭穿的风险而终日演戏；曾因注射吗啡过量被送进医院，又曾被送进精神病院。《人间失格》是太宰治透过主角的人生遭遇，太宰治巧妙地将自己的一生与思想表达出来。《人间失格》亦可当作是太宰治本人的自传，主角大庭叶藏就是以太宰治本人为原型。</p>"
    },false)
    o.appendChild(d)

    var left = document.querySelector(".left")
    var hours = parseInt(new Date().getHours())
    var messages = ""
    if (hours < 10 ) {
        messages = "一日之计在于晨~新的一天请继续加油~"
    } else if (hours < 15) {
        messages = "中午好~要好好午休~"
    }else if (hours < 19) {
        messages = "下午到了~还有什么事情没有忙完吗？"
    }else{
        messages = "喔现在是晚上呀~今天怎么样呢~"
    }
    var p = document.createElement("p")
    p.innerHTML = messages
    p.style.color = "#ee856a"
    left.appendChild(p)
}