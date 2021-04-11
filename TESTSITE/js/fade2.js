var colors = ["yellow","orange","white","brown","gold","red"];
var currentIndex = 0;

setInterval(function() {
    document.getElementById("titlereset").style.color = colors[currentIndex];
	currentIndex++;
	if (currentIndex == undefined || currentIndex >= colors.length) {
		currentIndex = 0;
	}
}, 1000);