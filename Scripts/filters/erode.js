define(['filters/base'], function (base) {
    function erode(canvas) {
        base.applyMorphologyFilter(canvas, function(values) {
            var min = 256;
            var index = -1;

            for(var i = 0, l = values.length; i < l; i ++) {
                if (min > values[i].value) {
                    min = values[i].value;
                    index = values[i].index;
                }
            }

            return index;
        });
    }

    return erode;
});