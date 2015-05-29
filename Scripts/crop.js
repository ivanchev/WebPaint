define(function() {
    var box;
    var actionsWrap;

    function hide() {
        if (box) {
            box.off().remove();
            box = null;
        }

        $(document).off(".crop");

        if (actionsWrap) {
            actionsWrap.off().remove();
            actionsWrap = null;
        }
    }

    function getBoxDimensions() {
        return {
            width: box.outerWidth(),
            height: box.outerHeight(),
            left: parseInt(box.css("left"), 10) || 0,
            top: parseInt(box.css("top"), 10) || 0
        };
    }

    function crop(canvas, zoomLevel, okCallback, cancelCallback) {
        var container = $(".zoom-wrap");
        var containerWidth = container.width() - 2;
        var containerHeight = container.height() - 2;

        box = $("<div class='crop-box'>")
            .width(containerWidth)
            .height(containerHeight)
            .appendTo(container);

        $("<div class='crop-dot crop-dot-TL'></div>" +
            "<div class='crop-dot crop-dot-TR'></div>" +
            "<div class='crop-dot crop-dot-BL'></div>" +
            "<div class='crop-dot crop-dot-BR'></div>")
            .appendTo(box);

        actionsWrap = $("<div class='crop-actions'>" +
            "<ul class='buttonsList'>" +
                "<li id='cropCancel'><span class='icon iconCancel'></span>Cancel</li>" +
                "<li id='cropOK'><span class='icon iconOK'></span>OK</li>" +
            "</ul>")
            .appendTo($(".canvas-wrap"))
            .on("click", "#cropCancel", function() {

                hide();

                cancelCallback();
            })
            .on("click", "#cropOK", function() {
                cropImage(canvas, zoomLevel);

                hide();

                okCallback();
            });

        var isTouch = 'ontouchstart' in window;
        var DOWN = isTouch ? "touchstart" : "mousedown";
        var MOVE = isTouch ? "touchmove" : "mousemove";
        var END = isTouch ? "touchend" : "mouseup";

        box.on(DOWN, ".crop-dot", function(e) {
            var x = isTouch ? e.originalEvent.touches[0].clientX : e.clientX;
            var y = isTouch ? e.originalEvent.touches[0].clientY : e.clientY;
            var dot = $(this);
            var boxSize = getBoxDimensions();

            $(document)
                .on(MOVE + ".crop", function(e) {
                    e.preventDefault();

                    var deltaX = (isTouch ? e.originalEvent.touches[0].clientX : e.clientX) - x;
                    var deltaY = (isTouch ? e.originalEvent.touches[0].clientY : e.clientY) - y;

                    var width;
                    var height;
                    var left = boxSize.left;
                    var top = boxSize.top;

                    if (dot.is(".crop-dot-TL")) {
                        top = Math.max(0, boxSize.top + deltaY);
                        left = Math.max(0, boxSize.left + deltaX);

                        width = boxSize.width + (boxSize.left - left);
                        height = boxSize.height + (boxSize.top - top);
                    } else if (dot.is(".crop-dot-TR")) {
                        top = Math.max(0, boxSize.top + deltaY);

                        width = boxSize.width + deltaX;
                        height = boxSize.height + (boxSize.top - top);
                    } else if (dot.is(".crop-dot-BL")) {
                        left = Math.max(0, boxSize.left + deltaX);

                        width = boxSize.width + (boxSize.left - left);
                        height = boxSize.height + deltaY;
                    } else {
                        width = boxSize.width + deltaX;
                        height = boxSize.height + deltaY;
                    }

                    if (width < 0 || height < 0) {
                        return;
                    }

                    if (width + left > containerWidth) {
                        width = containerWidth - left;
                    }

                    if (height + top > containerHeight) {
                        height = containerHeight - top;
                    }

                    box.width(width)
                        .height(height)
                        .css("top", top)
                        .css("left", left);
                })
                .on(END + ".crop", function(e) {
                    $(document).off(".crop");
                });
        });
    }

    function cropImage(canvas, zoomLevel) {
        var boxSize = getBoxDimensions();
        var zoom = zoomLevel / 100;

        var width = boxSize.width / zoom;
        var height = boxSize.height / zoom;
        var top = boxSize.top / zoom;
        var left = boxSize.left / zoom;

        var memCanvas = $("<canvas>")[0];
        memCanvas.width = width;
        memCanvas.height = height;

        var memContext = memCanvas.getContext("2d");
        memContext.drawImage(canvas, left, top, width, height, 0, 0, width, height);

        canvas.width = width;
        canvas.height = height;

        var context = canvas.getContext("2d");
        context.drawImage(memCanvas, 0, 0);
    }

    return {
        crop: crop,
        hide: hide
    };
});
