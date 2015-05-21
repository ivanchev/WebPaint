define(['colors/base'], function (base) {
    function brightness(canvas, imageData, offset) {
        base.applyFilter(canvas, imageData, function (data) {
            for (var i = 0, l = data.length; i < l; i += 4) {
                data[i] += offset;
                data[i + 1] += offset;
                data[i + 2] += offset;
            }
        });
    }

    return brightness;
});