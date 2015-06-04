requirejs.config({
    baseUrl: "scripts"
});

define(["view", "fileIO", "filters", "transforms", 'cache/cache', 'zoom/zoom', 'crop', 'colors', 'slider'], function (
    View, FileIO, Filters, Transforms, Cache, Zoom, Crop, Color, Slider) {
    // App logic

    $(".body-wrap").addClass(View.isTouch() ? "touchDevice" : "desktopDevice");
    $(".loading-screen").remove();

    //#region Helpers

    function applyCache(command) {
        Slider.hide();
        Crop.hide();
        Cache[command]();
        Zoom.refreshZoomWrap();
    }

    function applyFilter(command) {
        Filters[command](canvas);

        if (!View.isTouch()) {
            Cache.store();
        }
    }

    function applyTransform(command) {
        Transforms[command](canvas);
        Zoom.refreshZoomWrap();

        if (!View.isTouch()) {
            Cache.store();
        }
    }

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
        Slider.hide();
        Crop.hide();
        Cache.current();

        if (!this.files.length) {
            return;
        }

        imageName = this.files[0].name;

        FileIO.loadFile(this, canvas, init);
    };

    downloadButton.onclick = function() {
        Slider.hide();
        Crop.hide();
        Cache.current();

        FileIO.saveFile(canvas, imageName);
    };

    //#endregion

    //#region Filters

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
        View.show(panel, button);

        if (!View.isTouch()) {
            Slider.hide();
            Cache.current();
            Crop.hide();
        }
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
        View.show(null, this);

        if (!View.isTouch()) {
            Slider.hide();
            Cache.current();
            Crop.hide();
        }

        if ($(".canvas-wrap").width() < $(".zoom-wrap").width()) {
            Zoom.fitZoom();
        }

        Crop.crop(canvas, Zoom.getZoomLevel(), function okCallback() {
            Zoom.refreshZoomWrap();

            Cache.store();
        }, function cancelCallback() {

        });
    };

    //#endregion

    init();

    window.onbeforeunload = function (e) {
        Zoom.disposeEvents();
    };

});
