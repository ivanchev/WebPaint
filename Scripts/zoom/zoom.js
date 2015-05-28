define(function() {
    var zoomSteps = [25, 50, 75, 100, 150, 200, 400];
    var zoomLevel = 100;
    var callback;
    var canvas;

    function init(cv, cb) {
        canvas = cv;

        callback = cb;

        zoomLevel = 100;

        applyZoom();

        initEvents();
    }

    function getTouchDistance(touches) {
        var x1 = touches[0].clientX;
        var x2 = touches[1].clientX;

        var y1 = touches[0].clientY;
        var y2 = touches[1].clientY;

        return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
    }

    function initEvents() {
        disposeEvents();

        $(document)
            .on("touchstart.zoom", function(e) {
                if (e.originalEvent.touches.length == 2) {
                    var originalZoomLevel = zoomLevel;
                    var x = getTouchDistance(e.originalEvent.touches);
                    var y;

                    $(document)
                        .on("touchmove.zoom", function(e) {
                            y = getTouchDistance(e.originalEvent.targetTouches);

                            zoomLevel = originalZoomLevel * (y / x);
                            applyZoom();
                        })
                        .on("touchend.zoom", function(e) {
                            $(document)
                                .off("touchmove.zoom")
                                .off("touchend.zoom");
                        });
                }
            });
    }

    function disposeEvents() {
        $(document).off(".zoom");
    }

    function applyZoom() {
        var ratio = zoomLevel / 100;

        canvas.style.transform = "scale(" + ratio + ")";

        refreshZoomWrap();

        if (callback) {
            callback(zoomLevel);
        }
    }

    function refreshZoomWrap() {
        var ratio = zoomLevel / 100;
        var width = canvas.width * ratio;
        var height = canvas.height * ratio;
        var contentHeight = $(canvas.parentNode.parentNode).height();

        canvas.parentNode.style.width = width + "px";
        canvas.parentNode.style.height = height + "px";

        $(".zoom-wrap").toggleClass("center", (contentHeight > height));
    }

    function stepZoom(direction) {
        var zoomIndex = zoomSteps.indexOf(zoomLevel);

        if (zoomIndex === -1) {
            for(var i = 0, l = zoomSteps.length; i < l; i ++) {
                if (zoomSteps[i] > zoomLevel) {
                    zoomIndex = i;

                    break;
                }
            }

            if (zoomIndex == -1) {
                zoomIndex = zoomSteps.length;
            }
            if (direction == -1) {
                zoomIndex -= 1;
            }
        } else {
            zoomIndex += direction;
        }

        if (zoomIndex > -1 && zoomIndex < zoomSteps.length) {
            zoomLevel = zoomSteps[zoomIndex];

            applyZoom();
        }
    }

    function fitZoom() {
        var container = canvas.parentNode.parentNode;
        var widthDelta = container.offsetWidth / canvas.width;
        var heightDelta = container.offsetHeight / canvas.height;

        zoomLevel = Math.floor(Math.min(widthDelta, heightDelta) * 100);

        applyZoom();
    }

    function getZoomLevel() {
        return zoomLevel;
    }

    return {
        init: init,
        stepZoom: stepZoom,
        fitZoom: fitZoom,
        applyZoom: applyZoom,
        refreshZoomWrap: refreshZoomWrap,
        getZoomLevel: getZoomLevel,
        disposeEvents: disposeEvents
    };
});
