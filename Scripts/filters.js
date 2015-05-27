define([
    'filters/grayscale',
    'filters/invert',
    'filters/blur',
    'filters/sharpen',
    'filters/emboss',
    'filters/edge',
    'filters/sobel'
    ], function(grayscale, invert, blur, sharpen, emboss, edge, sobel) {
        return {
            grayscale: grayscale,
            invert: invert,
            blur: blur,
            sharpen: sharpen,
            emboss: emboss,
            edge: edge,
            sobel: sobel
        };
    });
