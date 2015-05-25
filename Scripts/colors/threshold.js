define(['colors/base'], function (base) {
    function threshold(canvas, imageData, threshold) {
        base.applyFilter(canvas, imageData, function (data) {
            var average;

            threshold += 100;

            for (var i = 0, l = data.length; i < l; i += 4) {
                average = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];

                data[i] = data[i + 1] = data[i + 2] = (average >= threshold) ? 255 : 0;
            }
        });
    }

    return threshold;
});