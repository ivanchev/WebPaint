define(['filters/base'], function (base) {
    function grayscale(canvas) {
        base.applyFilter(canvas, function (data) {
            var average;

            for (var i = 0, l = data.length; i < l; i += 4) {
                average = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];

                data[i] = average;
                data[i + 1] = average;
                data[i + 2] = average;
            }
        });
    }

    return grayscale;
});