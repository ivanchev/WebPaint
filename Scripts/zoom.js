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

        canvas.parentNode.style.width = canvas.width * ratio + "px";
        canvas.parentNode.style.height = canvas.height * ratio + "px";
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
        getZoomLevel: getZoomLevel
    };
});
