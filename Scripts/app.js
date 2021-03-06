﻿requirejs.config({
    baseUrl: "scripts",
    paths: {
      "canvasToBlob": "lib/canvastoblob",
      "fileSaver": "lib/filesaver"
    }
});

require(["view", "fileIO", "filters/filters", "transforms/transforms", 'cache/cache', 'zoom/zoom', 'crop', 'colors/colors', 'slider'], function (
    View, FileIO, Filters, Transforms, Cache, Zoom, Crop, Color, Slider) {
    // App logic

    $(".body-wrap").addClass(View.isTouch() ? "touch" : "desktop");
    $(".loading-screen").remove();

    //#region Helpers

    function reset() {
        Slider.hide();
        Crop.hide();
        Cache.current();
    }

    function init() {
        Cache.init(canvas);

        Zoom.init(canvas, zoomChanged);

        View.init($(".body-wrap"));
    }

    function zoomChanged(zoomLevel) {
        Crop.hide();

        zoomList.children[1].textContent = zoomLevel + "%";
    }

    //#endregion

    //#region File IO

    var imageName;

    loadFile.onchange = function () {
        reset();

        if (!this.files.length) {
            return;
        }

        imageName = this.files[0].name;

        FileIO.loadFile(this, canvas, init);
    };

    downloadButton.onclick = function() {
        reset();

        FileIO.saveFile(canvas, imageName);
    };

    //#endregion

    //#region Filters

    function applyFilter(command) {
        Filters[command](canvas);

        if (!View.isTouch()) {
            Cache.store();
        }
    }

    invertButton.onclick = function () {
        applyFilter("invert");
    };

    grayscaleButton.onclick = function () {
        applyFilter("grayscale");
    };

    blurButton.onclick = function () {
        applyFilter("blur");
    };

    sharpenButton.onclick = function () {
        applyFilter("sharpen");
    };

    embossButton.onclick = function () {
        applyFilter("emboss");
    };

    edgeButton.onclick = function () {
        applyFilter("edge");
    };

    sobelButton.onclick = function () {
        applyFilter("sobel");
    };

    erodeButton.onclick = function () {
        applyFilter("erode");
    };

    dilateButton.onclick = function () {
        applyFilter("dilate");
    };

    medianButton.onclick = function () {
        applyFilter("median");
    };

    //#endregion

    //#region Transforms

    function applyTransform(command) {
        Transforms[command](canvas);
        Zoom.refreshZoomWrap();

        if (!View.isTouch()) {
            Cache.store();
        }
    }

    flipHorizontalButton.onclick = function() {
        applyTransform("flipHorizontal");
    };

    flipVerticalButton.onclick = function() {
        applyTransform("flipVertical");
    };

    rotate90Button.onclick = function() {
        applyTransform("rotate90");
    };

    rotate180Button.onclick = function() {
        applyTransform("rotate180");
    };

    rotate270Button.onclick = function() {
        applyTransform("rotate270");
    };

    //#endregion

    //#region Cache

    function applyCache(command) {
        Slider.hide();
        Crop.hide();
        Cache[command]();
        Zoom.refreshZoomWrap();
    }

    undoButton.onclick = function () {
        applyCache("undo");
    };

    redoButton.onclick = function () {
        applyCache("redo");
    };

    resetButton.onclick = function () {
        applyCache("reset");
    };

    //#endregion

    //#region Zoom

    zoomOutButton.onclick = function() {
        Zoom.stepZoom(-1);
    };

    zoomInButton.onclick = function() {
        Zoom.stepZoom(1);
    };

    zoomFitButton.onclick = function() {
        Zoom.fitZoom();
    };

    //#endregion

    //#region Color

    function applyColor(button, command) {
        Slider.hide();
        Cache.current();

        var resetState = function() {
            $(".toolbar-secondary-wrap .selected").removeClass("selected");
        };

        Slider.show(canvas, function changeCallback(x, imageData) {
            Color[command](canvas, imageData, x);
        }, function okCallback() {
            if (!View.isTouch()) {
                Cache.store();
            }

            resetState();
        }, function cancelCallback() {
            Cache.current();

            resetState();
        });

        $(button).parent().find(".selected").removeClass("selected");
        $(button).addClass("selected");
    }

    brightnessButton.onclick = function() {
        applyColor(this, "brightness");
    };

    contrastButton.onclick = function() {
        applyColor(this, "contrast");
    };

    hueButton.onclick = function() {
        applyColor(this, "hue");
    };

    saturationButton.onclick = function() {
        applyColor(this, "saturation");
    };

    thresholdButton.onclick = function() {
        applyColor(this, "threshold");
    };

    //#endregion

    //#region Crop

    function crop() {
        var canvasWrap = $(".canvas-wrap");

        if (View.isTouch()) {
            canvasWrap.css({ "top": "80px" });
        } else {
            canvasWrap.css({ "bottom": "100px" });
        }

        if (canvasWrap.width() < $(".zoom-wrap").width() ||
            canvasWrap.height() < $(".zoom-wrap").height()) {
            Zoom.fitZoom();
        }

        function restore() {
            if (View.isTouch()) {
                View.restore();

                canvasWrap.css({ "top": "0" });
            } else {
                $("#cropButton").removeClass("selected");

                canvasWrap.css({ "bottom": "0" });
            }
        }

        Crop.crop(canvas, Zoom.getZoomLevel(),
            function okCallback() {
                Zoom.refreshZoomWrap();

                Cache.store();

                restore();
            }, function cancelCallback() {
                restore();
            });
    }

    //#endregion

    //#region Mobile Confirm

    applyButton.onclick = function() {
        Cache.store();

        View.restore();
    };

    restoreButton.onclick = function() {
        Cache.current();

        View.restore();
    };

    //#endregion

    //#region Toolbar

    function changePanel(panel, button) {
        if (!View.isTouch()) {
            reset();
        }

        View.show(panel, button);
    }

    transformButton.onclick = function() {
        changePanel(transformList, this);
    };

    filterButton.onclick = function() {
        changePanel(filterList, this);
    };

    colorButton.onclick = function() {
        changePanel(colorList, this);
    };

    cropButton.onclick = function() {
        changePanel(null, this);

        crop();
    };

    //#endregion

    window.onbeforeunload = function (e) {
        Zoom.disposeEvents();
    };

    init();
});
