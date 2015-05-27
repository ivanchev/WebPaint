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
            var indexMatrix = getIndexMatrix(canvas.width);
            var index;
            var r, g, b;

            for (var i = 0, l = data.length; i < l; i += 4) {
                r = g = b = 0;

                for(var j = 0; j < indexMatrix.length; j ++) {
                    index = i + indexMatrix[j];

                    if (index < 0 || index > l) {
                        index = i;
                    }

                    r += baseImage[index] * weightMatrix[j];
                    g += baseImage[index + 1] * weightMatrix[j];
                    b += baseImage[index + 2] * weightMatrix[j];
                }

                data[i] = r / divider;
                data[i + 1] = g / divider;
                data[i + 2] = b / divider;
            }
        });
    }

    function applyMorphologyFilter(canvas, getIndex) {
        applyFilter(canvas, function (data) {
            var context = canvas.getContext("2d");
            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            var baseImage = imageData.data;
            var indexMatrix = getIndexMatrix(canvas.width);
            var index;
            var average;
            var values;

            for (var i = 0, l = data.length; i < l; i += 4) {
                values = [];

                for(var j = 0; j < indexMatrix.length; j ++) {
                    index = i + indexMatrix[j];

                    if (index < 0 || index > l) {
                        index = i;
                    }

                    average = 0.2126 * baseImage[index] + 0.7152 * baseImage[index + 1] + 0.0722 * baseImage[index + 2];

                    values.push({index: index, value: average});
                }

                var resolvedIndex = getIndex(values);

                data[i] = baseImage[resolvedIndex];
                data[i + 1] = baseImage[resolvedIndex + 1];
                data[i + 2] = baseImage[resolvedIndex + 2];
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
        applyConvoluteFilter: applyConvoluteFilter,
        applyMorphologyFilter: applyMorphologyFilter,
        getIndexMatrix: getIndexMatrix
    };
});