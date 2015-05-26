define(['filters/base'], function (base) {
    function emboss(canvas) {
        var weightMatrix = [
            -1, -1, 0,
            -1, 0, 1,
            0, 1, 1
        ];
        var divider = 1;

        base.applyConvoluteFilter(canvas, weightMatrix, divider);
    }

    return emboss;
});