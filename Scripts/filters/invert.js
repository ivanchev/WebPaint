define(['filters/base'], function (base) {
    function invert(canvas) {
        base.applyFilter(canvas, function (data) {
            for (var i = 0, l = data.length; i < l; i += 4) {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            }
        });
    }

    return invert;
});