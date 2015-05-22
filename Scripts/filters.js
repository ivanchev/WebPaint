define([
    'filters/grayscale',
    'filters/invert',
    'filters/blur',
    'filters/sharpen'
    ], function(grayscale, invert, blur, sharpen) {
        return {
            grayscale: grayscale,
            invert: invert,
            blur: blur,
            sharpen: sharpen
        };
    });
