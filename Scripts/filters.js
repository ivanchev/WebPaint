define([
    'filters/grayscale',
    'filters/invert',
    'filters/blur',
    'filters/sharpen',
    'filters/emboss'
    ], function(grayscale, invert, blur, sharpen, emboss) {
        return {
            grayscale: grayscale,
            invert: invert,
            blur: blur,
            sharpen: sharpen,
            emboss: emboss
        };
    });
