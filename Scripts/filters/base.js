define(function () {
    function applyFilter(canvas, filter) {
        var context = canvas.getContext("2d");
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;

        filter(data);

        context.putImageData(imageData, 0, 0);
    }

    return { 
        applyFilter: applyFilter
    };
});