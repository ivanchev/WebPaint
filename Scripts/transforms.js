define([
    'transforms/flipHorizontal',
    'transforms/flipVertical',
    'transforms/rotate90',
    'transforms/rotate180',
    'transforms/rotate270'
    ], function(flipHorizontal, flipVertical, rotate90, rotate180, rotate270) {
        return {
            flipHorizontal: flipHorizontal,
            flipVertical: flipVertical,
            rotate90: rotate90,
            rotate180: rotate180,
            rotate270: rotate270
        };
    });
