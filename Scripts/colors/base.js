define(function () {
    function applyFilter(canvas, imageData, filter) {
        var context = canvas.getContext("2d");
        var data = imageData.data;

        filter(data);

        context.putImageData(imageData, 0, 0);
    }

    return { 
        applyFilter: applyFilter
    };
});