define(['filters/base'], function (base) {
    function sobel(canvas) {
        var weightMatrixA = [
            -1, 0, 1,
            -2, 0, 2,
            -1, 0, 1
        ];
        var weightMatrixB = [
            -1, -2, -1,
            0, 0, 0,
            1, 2, 1
        ];

        base.applyFilter(canvas, function (data) {
            var context = canvas.getContext("2d");
            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            var baseImage = imageData.data;

            var r, g, b;
            var indexMatrix = base.getIndexMatrix(canvas.width);

            for (var i = 0, l = data.length; i < l; i += 4) {
                r = g = b = 0;
                r2 = g2 = b2 = 0;

                for(var j = 0; j < indexMatrix.length; j ++) {
                    r += baseImage[i + indexMatrix[j]] * weightMatrixA[j];
                    g += baseImage[i + indexMatrix[j] + 1] * weightMatrixA[j];
                    b += baseImage[i + indexMatrix[j] + 2] * weightMatrixA[j];
                }

                for(var j = 0; j < indexMatrix.length; j ++) {
                    r2 += baseImage[i + indexMatrix[j]] * weightMatrixB[j];
                    g2 += baseImage[i + indexMatrix[j] + 1] * weightMatrixB[j];
                    b2 += baseImage[i + indexMatrix[j] + 2] * weightMatrixB[j];
                }

                data[i] = Math.abs(r) + Math.abs(r2);
                data[i + 1] = Math.abs(g) + Math.abs(g2);
                data[i + 2] = Math.abs(b) + Math.abs(b2);
            }
        });
    }

    return sobel;
});