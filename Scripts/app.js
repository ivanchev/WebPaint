requirejs.config({
    baseUrl: "scripts"
})

define(["fileIO", "filters", "transforms", 'cache/cache', 'zoom', 'crop'], function (
    FileIO, Filters, Transforms, Cache, Zoom, Crop) {
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

    function init() {
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
        Cache.undo();
        Zoom.refreshZoomWrap();
    };

    redoButton.onclick = function () {
        Cache.redo();
        Zoom.refreshZoomWrap();
    };

    resetButton.onclick = function () {
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

    //#region Nav Toolbar

    var imageData = null;
    function activateTool() {
        $(".body-wrap").addClass("activeTool");

        var context = canvas.getContext("2d");
        imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    }

    function deactivateTool() {
        $(".body-wrap").removeClass("activeTool");
    }

    OKButton.onclick = function() {
        deactivateTool();
    };

    CancelButton.onclick = function() {
        deactivateTool();

        var context = canvas.getContext("2d");

        canvas.width = imageData.width;
        canvas.height = imageData.height;
        context.putImageData(imageData, 0, 0);

        Zoom.refreshZoomWrap();
        Cache.store();

        imageData = null;
    };

    //#endregion

    //#region Toolbar

    transformButton.onclick = function() {
        $(".buttonsListSecondary").hide();

        activateTool();

        $(transformList).show();
    };

    cropButton.onclick = function() {
        $(".buttonsListSecondary").hide();

        activateTool();

        Zoom.fitZoom();

        Crop.crop(canvas, Zoom.getZoomLevel(), function okCallback() {
            Zoom.refreshZoomWrap();

            Cache.store();

            deactivateTool();
        }, function cancelCallback() {
            deactivateTool();
        });
    };

    filterButton.onclick = function() {
        $(".buttonsListSecondary").hide();

        activateTool();

        $(filterList).show();
    };

    colorButton.onclick = function() {
        $(".buttonsListSecondary").hide();

        activateTool();

        $(colorList).show();
    };

    //#endregion

    init();

});
