define([
    'filters/grayscale',
    'filters/invert',
    'filters/blur',
    'filters/sharpen',
    'filters/emboss',
    'filters/edge',
    'filters/sobel',
    'filters/erode',
    'filters/dilate',
    'filters/median'
    ], function(grayscale, invert, blur, sharpen, emboss, edge, sobel, erode, dilate, median) {
        return {
            grayscale: grayscale,
            invert: invert,
            blur: blur,
            sharpen: sharpen,
            emboss: emboss,
            edge: edge,
            sobel: sobel,
            erode: erode,
            dilate: dilate,
            median: median
        };
    });
