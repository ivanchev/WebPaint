define(['colors/base'], function (base) {
    function saturation(canvas, imageData, offset) {
        base.applyFilter(canvas, imageData, function (data) {

            for (var i = 0, l = data.length; i < l; i += 4) {
                var res = base.rgbToHsl(data[i], data[i+1], data[i+2]);

                var sat = Math.min(1, Math.max(0, res[1] + offset / 100.0));

                res = base.hslToRgb(res[0], sat, res[2]);

                data[i] = res[0];
                data[i + 1] = res[1];
                data[i + 2] = res[2];
            }
        });
    }

    return saturation;
});