define(['filters/base'], function (base) {
    function edge(canvas) {
        var weightMatrix = [
            1, 1, 1,
            1, -8, 1,
            1, 1, 1
        ];
        var divider = 1;

        base.applyConvoluteFilter(canvas, weightMatrix, divider);
    }

    return edge;
});