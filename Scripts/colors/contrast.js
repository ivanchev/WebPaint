define(['colors/base'], function (base) {
    function contrast(canvas, imageData, offset) {
        var f = (259 * (offset + 255)) / (255 * (259 - offset));

        base.applyFilter(canvas, imageData, function (data) {
            for (var i = 0, l = data.length; i < l; i += 4) {
                data[i] = f * (data[i] - 128) + 128;
                data[i + 1] = f * (data[i + 1] - 128) + 128;
                data[i + 2] = f * (data[i + 2] - 128) + 128;
            }
        });
    }

    return contrast;
});