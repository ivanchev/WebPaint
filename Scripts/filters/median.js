define(['filters/base'], function (base) {
    function median(canvas) {
        base.applyMorphologyFilter(canvas, function(values) {
            var min = 256;
            var index = -1;

            values.sort(function(a, b) { return a.value - b.value; });

            return values[Math.floor(values.length / 2)].index;
        });
    }

    return median;
});