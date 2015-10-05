// Function used to ensure canvas fits parent accurately
function fitToContainer(canvas){
  	canvas.style.width ='100%';
  	canvas.style.height='100%';
  	canvas.width  = canvas.offsetWidth;
  	canvas.height = canvas.offsetHeight;
}

// Function used to get a random color from the appropriate palette
function getColor(pal) {
	if (pal === "warm") {
		r = getRandomInt(150,255);
		g = getRandomInt(0,100);
		b = getRandomInt(0,100);
		return rgbToHex(r,g,b);
	}
	else if (pal === "blue") {
		r = getRandomInt(0,100);
		g = getRandomInt(0,100);
		b = getRandomInt(150,255);
		return rgbToHex(r,g,b);
	}
	else if (pal === "lblue") {
		r = getRandomInt(100,150);
		g = getRandomInt(100,150);
		b = getRandomInt(200,255);
		return rgbToHex(r,g,b);
	}
	else if (pal === "nature") {
		r = getRandomInt(0,100);
		g = getRandomInt(100,200);
		b = getRandomInt(0,100);
		return rgbToHex(r,g,b);
	}
	else if (pal === "matrix") {
		options = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,220,0],[0,200,0],[0,153,0]];
		c = options[Math.floor(Math.random() * options.length)];
		return rgbToHex(c[0],c[1],c[2]);
	}
	else if (pal === "bw") {
		options = [[0,0,0],[255,255,255]];
		c = options[Math.floor(Math.random() * options.length)];
		return rgbToHex(c[0],c[1],c[2]);
	}
	else if (pal === "rainbow") {
		options = [[255,0,0],[255,127,0],[255,255,0],[0,255,0],[0,0,255],[75,0,130],[139,0,255]];
		c = options[Math.floor(Math.random() * options.length)];
		return rgbToHex(c[0],c[1],c[2]);
	}
	else if (pal === "totalrandom") {
		r = getRandomInt(0,255);
		g = getRandomInt(0,255);
		b = getRandomInt(0,255);
		return rgbToHex(r,g,b);
	}
	if (pal === "purple") {
		r = getRandomInt(100,200);
		g = getRandomInt(0,50);
		b = getRandomInt(100,200);
		return rgbToHex(r,g,b);
	}
}

// Function used to draw the "art" based off of the given parameters
function draw(canvas, pixel, pal, alg) {
	var ctx=canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var w = canvas.offsetWidth;
	var h = canvas.offsetHeight;
	var colorCount = {};
	var totalPixels = Math.round((w*h)/(pixel*pixel)*100)/100;
	var start = new Date().getTime();

	if (alg === "standard") {
		for (var i=0;i<(w/pixel);i++) {
			for (var j=0;j<(h/pixel);j++) {
				color = getColor(pal);
				ctx.fillStyle=color;
				ctx.fillRect(pixel*i,pixel*j,p,p);
				// Track stats
				if (colorCount[color]) ++colorCount[color];
				else colorCount[color] = 1;
			}
		}
	}
	if (alg === "hline") {
		for (var i=0;i<(h/pixel);i++) {
			var lastColor = getColor(pal);
			for (var j=0;j<(w/pixel);j++) {
				if (getRandomInt(1,10)%2 === 0) color = lastColor;
				else color = getColor(pal);
				ctx.fillStyle=color;
				ctx.fillRect(pixel*j,pixel*i,p,p);
				// Track stats
				if (colorCount[color]) ++colorCount[color];
				else colorCount[color] = 1;
			}
		}
	}

	if (alg === "vline") {
		for (var i=0;i<(w/pixel);i++) {
			var lastColor = getColor(pal);
			for (var j=0;j<(h/pixel);j++) {
				if (getRandomInt(1,10)%2 === 0) color = lastColor;
				else color = getColor(pal);
				ctx.fillStyle=color;
				ctx.fillRect(pixel*i,pixel*j,p,p);
				// Track stats
				if (colorCount[color]) ++colorCount[color];
				else colorCount[color] = 1;
			}
		}
	}

	if (alg === "blotch") {
		var lastColor = getColor(pal);
		for (var i=0;i<(w/pixel);i++) {
			for (var j=0;j<(h/pixel);j++) {
				if (getRandomInt(1,4) >= 2) color = lastColor;
				else color = getColor(pal);
				ctx.fillStyle=color;
				ctx.fillRect(pixel*i,pixel*j,p,p);
				// Track stats
				if (colorCount[color]) ++colorCount[color];
				else colorCount[color] = 1;
			}
		}
	}

	if (alg === "smear") {
		var lastColor = getColor(pal);
		for (var i=0;i<(w/pixel);i++) {
			for (var j=0;j<(h/pixel);j++) {
				if (getRandomInt(1,10) >= 2) color = lastColor;
				else lastColor = color = getColor(pal);
				ctx.fillStyle=color;
				ctx.fillRect(pixel*i,pixel*j,p,p);
				// Track stats
				if (colorCount[color]) ++colorCount[color];
				else colorCount[color] = 1;
			}
		}
	}

	if (alg === "winds") {
		var lastColor = getColor(pal);
		for (var i=0;i<(h/pixel);i++) {
			for (var j=0;j<(w/pixel);j++) {
				if (getRandomInt(1,30) >= 2) color = lastColor;
				else lastColor = color = getColor(pal);
				ctx.fillStyle=color;
				ctx.fillRect(pixel*j,pixel*i,p,p);
				// Track stats
				if (colorCount[color]) ++colorCount[color];
				else colorCount[color] = 1;
			}
		}
	}

	if (alg === "boxes") {
		var mainColor = getColor(pal);
		for (var i=0;i<(w/pixel);i++) {
			for (var j=0;j<(h/pixel);j++) {
				if (i%Math.floor(w/(pixel*10))===0) color = mainColor;
				else {
					if (j%Math.floor(w/(pixel*10))===0) color = mainColor;
					else color = getColor(pal);
				}
				ctx.fillStyle=color;
				ctx.fillRect(pixel*i,pixel*j,p,p);
				// Track stats
				if (colorCount[color]) ++colorCount[color];
				else colorCount[color] = 1;
			}
		}
	}
	
	var end = new Date().getTime();
	var time = end - start;
	fillStats(colorCount, totalPixels, time);

	// Change favicon dynamically
	var hC = document.getElementById("hidden-canv");
	var hCtx = hC.getContext("2d");
	var thumbImg = document.createElement('img');

	thumbImg.src = canvas.toDataURL();
	thumbImg.onload = function() {
	    hCtx.save();
	    hCtx.beginPath();
	    hCtx.arc(50, 50, 50, 0, Math.PI * 2, true);
	    hCtx.closePath();
	    hCtx.clip();
	    hCtx.drawImage(thumbImg, 0, 0, 100, 100);
	    hCtx.restore();
	    document.getElementById("icon").href = hC.toDataURL();
	};
}

// Determine and fill the stats section
function fillStats(cC, tP, t) {
	var top5 = [];
	cCSorted = getSortedKeys(cC).reverse();
	max = cC[cCSorted[0]];
	total = cCSorted.length;

	var currMin = 765;
	var finRGB;
	for (var j=0;j<cCSorted.length;j++) {
		currRGB = hexToRgb(cCSorted[j]);
		currVal = currRGB[0]+currRGB[1]+currRGB[2];
		if (currVal<currMin) {
			currMin = currVal;
			finRGB = currRGB;
		}
	}

	var darkColor = rgbToHex(finRGB[0],finRGB[1],finRGB[2]);

	stat = document.getElementById('top');
	stat.innerHTML = "";
	misc = document.getElementById('misc');
	misc.innerHTML = "";

	stat.innerHTML += "<div class='top-title'>3 Most Used Colors</div>";
	for (var i=0;i<3;i++) {
		if (cCSorted[i]) {
			stat.innerHTML += "<div class='bn-back' style='background-color:"+cCSorted[i]+"'><div class='bar-name'>"+cCSorted[i]+" - "+cC[cCSorted[i]]+" times</div></div><div class='bar' style='background-color:"+cCSorted[i]+";width:"+(cC[cCSorted[i]]/max*70)+"%;'></div><div style='clear:both;'></div>";
		}
	}
	misc.innerHTML += "<div class='stat-misc'>Unique Colors - "+total+"</div>";
	misc.innerHTML += "<div class='stat-misc'>Pixel Count - "+tP+"</div>";
	misc.innerHTML += "<div class='stat-misc'>Time Elapsed - "+t+"ms</div>";
	misc.innerHTML += "<div class='stat-misc'>Darkest Color - <span style='color:"+darkColor+"'>"+darkColor+"</span></div>";
}

// Clear and download canvas button functionality
function clearCanvas() {
	var ctx=document.getElementById('paper').getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	stat = document.getElementById('top');
	stat.innerHTML = "Generate an image to get stats";
	misc = document.getElementById('misc');
	misc.innerHTML = "Generate an image to get stats";
}

function downloadCanvas(link, canvasId, filename) {
	console.log("here");
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

// Functions used to toggle canvas
function enlargeCanvas() {
	var ccont = document.getElementById('paper-cont');
	var copt = document.getElementById('options');
	ccont.parentNode.removeChild(ccont);

	copt.style.width = "100%";
	copt.style.height = "auto";
	copt.style.marginLeft = "0";
	document.getElementById('largec').appendChild(ccont);
	large = true;

	clearCanvas();
    fitToContainer(document.getElementById('paper'));
}

function minimizeCanvas() {
	var ccont = document.getElementById('paper-cont');
	var copt = document.getElementById('options');
	ccont.parentNode.removeChild(ccont);

	ccont.removeAttribute("style");
	copt.removeAttribute("style");
	document.getElementById('ccanv').insertBefore(ccont, document.getElementById('ccanv').firstChild);
	large = false;

	clearCanvas();
    fitToContainer(document.getElementById('paper'));
}

// Utility functions used throughout the program
function getSortedKeys(obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[a]-obj[b]});
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

// Handle window resize, in particular zooming in to mobile size
window.onresize = function() {
    if (window.innerWidth < 960) minimizeCanvas();
}

// First load initialization
var large = false;
var canvas = document.getElementById('paper');
fitToContainer(canvas);

// Handle clicking of the generate canvas button
document.getElementById("generate").addEventListener("click", function() {
	fitToContainer(document.getElementById('paper')); // Ensure canvas is properly sized

	// Fetch user inputs
	p = document.getElementById('pixel').value; 
	pal = document.getElementById('palette').value;
	alg = document.getElementById('algorithm').value;

	// Regular expression to ensure the user entered a valid pixel size
	var regex=/^[0-9]+([.][0-9]+)?$/;
    if (p.match(regex) && p!=="0") draw(canvas, p, pal, alg);
    else alert("That's not a valid number you silly goose.")
}, false);

// Handle clicking of canvas save button
document.getElementById('save').addEventListener('click', function() {
    downloadCanvas(this, 'paper', 'totallyart.png');
}, false);

// Handle clicking of canvas clear
document.getElementById('clear').addEventListener('click', function() {
    clearCanvas();
}, false);

// Handle clicking of canvas toggle
document.getElementById('large').addEventListener('click', function() {
	if (!large) enlargeCanvas();
	else minimizeCanvas();
}, false);