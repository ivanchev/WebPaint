requirejs.config({
    baseUrl: "scripts"
});

define(["fileIO", "filters", "transforms", 'cache/cache', 'zoom', 'crop', 'colors', 'slider'], function (
    FileIO, Filters, Transforms, Cache, Zoom, Crop, Color, Slider) {
    // App logic

    //#region Helpers

    function applyFilter(command) {
        Filters[command](canvas);
        Cache.store();
    }

    function applyTransform(command) {
        Transforms[command](canvas);
        Zoom.refreshZoomWrap();
        Cache.store();
    }

    function applyColor(command) {
        Slider.hide();

        Slider.show(canvas, function(x, imageData) {
            Color[command](canvas, imageData, x);
        }, function() {
            Cache.store();

            $(".buttonsListSecondary .selected").removeClass("selected");
            $(".body-wrap").removeClass("edit-slider");
        }, function() {
            $(".buttonsListSecondary .selected").removeClass("selected");
            $(".body-wrap").removeClass("edit-slider");
        });
    }

    function init() {
        Slider.hide();
        Crop.hide();

        Cache.init(canvas);

        Zoom.init(canvas, zoomChanged);
    }

    function zoomChanged(zoomLevel) {
        zoomList.children[1].textContent = zoomLevel + "%";
    }

    //#endregion


    //#region File IO

    loadFile.onchange = function () {
        FileIO.loadFile(this, canvas, init);
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
        Slider.hide();
        Crop.hide();
        Cache.undo();
        Zoom.refreshZoomWrap();
    };

    redoButton.onclick = function () {
        Slider.hide();
        Crop.hide();
        Cache.redo();
        Zoom.refreshZoomWrap();
    };

    resetButton.onclick = function () {
        Slider.hide();
        Crop.hide();
        Cache.reset();
        Zoom.refreshZoomWrap();
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

    function selectColor(button, command) {
        applyColor(command);

        $(".body-wrap").addClass("edit-slider");

        $(button).parent().find(".selected").removeClass("selected");
        $(button).addClass("selected");
    }

    brightnessButton.onclick = function() {
        selectColor(this, "brightness");
    };
    
    contrastButton.onclick = function() {
        selectColor(this, "contrast");
    };
    
    hueButton.onclick = function() {
        selectColor(this, "hue");
    };
    
    saturationButton.onclick = function() {
        selectColor(this, "saturation");
    };

    thresholdButton.onclick = function() {
        selectColor(this, "threshold");
    };

    //#endregion

    //#region Mobile Confirm

    function finishEdit() {
        $(".body-wrap").removeClass("edit");
        $(".buttonsListSecondary").hide();
        $(".selected").removeClass("selected");
    }

    applyButton.onclick = function() {
        // TODO Cache

        finishEdit();
    };

    restoreButton.onclick = function() {
        finishEdit();
    };

    //#endregion

    //#region Toolbar

    function changePanel(panel) {
        $(".buttonsListSecondary").hide();
        $(".selected").removeClass("selected");

        Slider.hide();
        Crop.hide();

        $(panel).show();
        $(".body-wrap").addClass("edit");
    }

    transformButton.onclick = function() {
        changePanel(transformList);
        $(this).addClass("selected");
    };

    filterButton.onclick = function() {
        changePanel(filterList);
        $(this).addClass("selected");
    };

    colorButton.onclick = function() {
        changePanel(colorList);
        $(this).addClass("selected");
    };

    cropButton.onclick = function() {
        $(".buttonsListSecondary").hide();
        $(".selected").removeClass("selected");

        Slider.hide();
        Crop.hide();

        $(this).addClass("selected");

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
