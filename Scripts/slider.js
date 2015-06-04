define(function() {
    var canvas;
    var memCanvas;
    var slider;

    function show(cv, changeCallback, okCallback, cancelCallback) {
        slider = createSlider();

        canvas = cv;

        memCanvas = $("<canvas>")[0];
        memCanvas.width = canvas.width;
        memCanvas.height = canvas.height;

        var memContext = memCanvas.getContext("2d");
        memContext.drawImage(canvas, 0, 0);

        slider.on("click", "#OKButton", function() {
                hide();

                if (okCallback) {
                    okCallback();
                }
            })
            .on("click", "#CancelButton", function() {
                hide();

                if (cancelCallback) {
                    cancelCallback();
                }
            });

        if (changeCallback) {
            var isTouch = 'ontouchstart' in window;
            var DOWN = isTouch ? "touchstart" : "mousedown";
            var MOVE = isTouch ? "touchmove" : "mousemove";
            var END = isTouch ? "touchend" : "mouseup";

            slider.on(DOWN, ".slider-handle", function(e) {
                    var handle = this;
                    var x = isTouch ? e.originalEvent.touches[0].clientX : e.clientX;
                    var startX = parseInt($(handle).css("left"), 10);
                    var deltaX;

                    $(document)
                        .on(MOVE + ".slider", function(e) {
                            e.preventDefault();

                            var clientX = isTouch ? e.originalEvent.targetTouches[0].clientX : e.clientX;

                            deltaX = ((clientX - x) + startX) - 100;
                            deltaX = Math.max(-100, Math.min(100, (deltaX)));

                            $(handle).css("left", 100 + deltaX);

                            if (!isTouch) {
                                var imageData = memContext.getImageData(0, 0, memCanvas.width, memCanvas.height);
                                changeCallback(deltaX, imageData);
                            }
                        })
                        .on(END + ".slider", function(e) {
                            $(document).off(".slider");

                            var imageData = memContext.getImageData(0, 0, memCanvas.width, memCanvas.height);
                            changeCallback(deltaX, imageData);
                        });
                });
        }
    }

    function hide() {
        if (slider) {
            slider
                .off()
                .remove();
        }

        slider = null;

        memCanvas = null;
    }

    function createSlider() {
        var element = $('<div class="toolbar-slider-wrap">' +
                '<div class="slider-wrap">' +
                    '<div class="slider-line"></div>' +
                    '<div class="slider-handle"></div>' +
                '</div>' +
                '<div class="buttons-wrap">' +
                    '<ul class="buttonsList">' +
                        '<li id="CancelButton"><span class="icon iconCancel"></span>Cancel</li>' +
                        '<li id="OKButton"><span class="icon iconOK"></span>OK</li>' +
                    '</ul>' +
                '</div>' +
            '</div>').appendTo($(".content-wrap"));

        return element;
    }

    return {
        show: show,
        hide: hide
    };
});
