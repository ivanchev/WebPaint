define([
    'colors/brightness',
    'colors/contrast',
    'colors/hue',
    'colors/saturation',
    'colors/threshold'
    ], function(brightness, contrast, hue, saturation, threshold) {
        return {
            brightness: brightness,
            contrast: contrast,
            hue: hue,
            saturation: saturation,
            threshold: threshold
        };
    });
