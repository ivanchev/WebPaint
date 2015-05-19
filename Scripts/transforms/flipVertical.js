define(function () {
    function flipVertical(canvas) {
        var context = canvas.getContext("2d");

        var memCanvas = $("<canvas>")[0];
        memCanvas.width = canvas.width;
        memCanvas.height = canvas.height;

        var memContext = memCanvas.getContext("2d");
        memContext.translate(0, canvas.height);
        memContext.scale(1, -1);
        memContext.drawImage(canvas, 0, 0);

        context.drawImage(memCanvas, 0, 0);
    }

    return flipVertical;
});