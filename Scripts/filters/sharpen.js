define(['filters/base'], function (base) {
    function sharpen(canvas) {
        var weightMatrix = [
            0, -1,  0,
            -1,  5, -1,
             0, -1,  0
            ];
        var divider = 1;

        base.applyConvoluteFilter(canvas, weightMatrix, divider);
    }

    return sharpen;
});