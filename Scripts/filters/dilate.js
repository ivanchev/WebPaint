define(['filters/base'], function (base) {
    function dilate(canvas) {
        base.applyMorphologyFilter(canvas, function(values) {
            var max = 0;
            var index = -1;

            for(var i = 0, l = values.length; i < l; i ++) {
                if (max < values[i].value) {
                    max = values[i].value;
                    index = values[i].index;
                }
            }

            return index;
        });
    }

    return dilate;
});