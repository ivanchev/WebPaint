define([
    'colors/brightness',
    'colors/contrast',
    'colors/hue',
    'colors/saturation'
    ], function(brightness, contrast, hue, saturation) {
        return {
            brightness: brightness,
            contrast: contrast,
            hue: hue,
            saturation: saturation
        };
    });
