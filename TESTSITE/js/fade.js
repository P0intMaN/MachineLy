var colors = ["#007AF3" , "purple", "blue", "green","red","brown"];
var currentIndex = 0;

setInterval(function() {
    document.getElementById("titleai").style.color = colors[currentIndex];
	currentIndex++;
	if (currentIndex == undefined || currentIndex >= colors.length) {
		currentIndex = 0;
	}
}, 1000);

