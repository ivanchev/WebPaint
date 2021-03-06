﻿define(function () {
    function rotate270(canvas) {
        var context = canvas.getContext("2d");

        var memCanvas = $("<canvas>")[0];
        memCanvas.width = canvas.height;
        memCanvas.height = canvas.width;

        var memContext = memCanvas.getContext("2d");
        memContext.translate(0, memCanvas.height);
        memContext.rotate(270 * Math.PI/180);
        memContext.drawImage(canvas, 0, 0);

        canvas.width = memCanvas.width;
        canvas.height = memCanvas.height;

        context.drawImage(memCanvas, 0, 0);
    }

    return rotate270;
});