define(['filters/base'], function (base) {
    function blur(canvas) {
        var weightMatrix = [
            0, 1, 0,
            1, 1, 1,
            0, 1, 0
        ];
        var divider = 5;

        base.applyConvoluteFilter(canvas, weightMatrix, divider);
    }

    return blur;
});