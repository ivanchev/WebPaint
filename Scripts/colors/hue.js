define(['colors/base'], function (base) {
    function hue(canvas, imageData, offset) {
        base.applyFilter(canvas, imageData, function (data) {

            for (var i = 0, l = data.length; i < l; i += 4) {
                var res = base.rgbToHsl(data[i], data[i+1], data[i+2]);

                var hue = res[0] + offset / 200.0;

                res = base.hslToRgb(hue, res[1], res[2]);

                data[i] = res[0];
                data[i + 1] = res[1];
                data[i + 2] = res[2];
            }
        });
    }

    return hue;
});