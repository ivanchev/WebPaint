define([
    'filters/grayscale',
    'filters/invert'
    ], function(grayscale, invert) {
        return {
            grayscale: grayscale,
            invert: invert
        };
    });
