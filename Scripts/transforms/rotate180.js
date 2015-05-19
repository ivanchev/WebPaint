define(function () {
    function rotate180(canvas) {
        var context = canvas.getContext("2d");

        var memCanvas = $("<canvas>")[0];
        memCanvas.width = canvas.width;
        memCanvas.height = canvas.height;

        var memContext = memCanvas.getContext("2d");
        memContext.translate(canvas.width, canvas.height);
        memContext.rotate(Math.PI);
        memContext.drawImage(canvas, 0, 0);

        context.drawImage(memCanvas, 0, 0);
    }

    return rotate180;
});