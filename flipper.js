window.onload = function() {
var canvas = document.getElementById('cvs'),
    ctx = canvas.getContext('2d'),
    input = document.getElementById('input'),
    width = +(canvas.width = 480),
    height = +(canvas.height = 400),
    fontFamily = "myFont",
    fontSize = "12px",
    fontColour = "black";
    var img = document.getElementById("flipper");
    ctx.drawImage(img, 0, -50);




function fragmentText(text, maxWidth) {
    var words = text.split(' '),
        lines = [],
        line = "";
    if (ctx.measureText(text).width < maxWidth) {
        return [text];
    }
    while (words.length > 0) {
        while (ctx.measureText(words[0]).width >= maxWidth) {
            var tmp = words[0];
            words[0] = tmp.slice(0, -1);
            if (words.length > 1) {
                words[1] = tmp.slice(-1) + words[1];
            } else {
                words.push(tmp.slice(-1));
            }
        }
        if (ctx.measureText(line + words[0]).width < maxWidth) {
            line += words.shift() + " ";
        } else {
            lines.push(line);
            line = "";
        }
        if (words.length === 0) {
            lines.push(line);
        }
    }
    return lines;
}

function draw() {
    ctx.save();
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, -50);
    ctx.font = "bold " + fontSize + " " + fontFamily;
    ctx.textAlign = "center";
    ctx.fillStyle = fontColour;
    var lines = fragmentText(input.value, width - (parseInt(fontSize,0)));
    lines.forEach(function(line, i) {
        ctx.fillText(line, 232, 130, (i + 1) * (200));
    });
    ctx.restore();
}

input.onkeyup = function(e) { // keyup because we need to know what the entered text is.
    draw();
}
};

