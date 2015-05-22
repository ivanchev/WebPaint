define(function () {
    function applyFilter(canvas, filter) {
        var context = canvas.getContext("2d");
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;

        filter(data);

        context.putImageData(imageData, 0, 0);
    }

    function applyConvoluteFilter(canvas, weightMatrix, divider) {
        applyFilter(canvas, function (data) {
            var context = canvas.getContext("2d");
            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            var baseImage = imageData.data;

            var r, g, b;
            var indexMatrix = getIndexMatrix(canvas.width);

            for (var i = 0, l = data.length; i < l; i += 4) {
                r = g = b = 0;

                for(var j = 0; j < indexMatrix.length; j ++) {
                    r += baseImage[i + indexMatrix[j]] * weightMatrix[j];
                    g += baseImage[i + indexMatrix[j] + 1] * weightMatrix[j];
                    b += baseImage[i + indexMatrix[j] + 2] * weightMatrix[j];
                }

                data[i] = r / divider;
                data[i + 1] = g / divider;
                data[i + 2] = b / divider;
            }
        });
    }

    function getIndexMatrix(width) {
        var matrix = [
            -(width + 1), -width, -(width - 1),
            -1, 0, 1,
            width - 1, width, width + 1
        ];

        for(var i = 0, length = matrix.length; i < length; i++) {
            matrix[i] *= 4;
        }

        return matrix;
    }

    return { 
        applyFilter: applyFilter,
        applyConvoluteFilter: applyConvoluteFilter
    };
});