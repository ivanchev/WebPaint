define(['filters/base'], function (base) {
    function grayscale(canvas) {
        base.applyFilter(canvas, function (data) {
            var average;

            for (var i = 0, l = data.length; i < l; i += 4) {
                average = (data[i] + data[i + 1] + data[i + 2]) / 3;

                data[i] = average;
                data[i + 1] = average;
                data[i + 2] = average;
            }
        });
    }

    return grayscale;
});