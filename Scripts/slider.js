define(function() {
    var canvas;
    var memCanvas;
    var slider;

    function show(cv, changeCallback, okCallback, cancelCallback) {
        var isTouch = 'ontouchstart' in window;

        if (isTouch) {
            $(".header-wrap").hide();
        }

        slider = createSlider();

        canvas = cv;

        memCanvas = $("<canvas>")[0];
        memCanvas.width = canvas.width;
        memCanvas.height = canvas.height;

        var memContext = memCanvas.getContext("2d");
        memContext.drawImage(canvas, 0, 0);

        var updateImage = function(offset) {
            var imageData = memContext.getImageData(0, 0, memCanvas.width, memCanvas.height);
            changeCallback(offset, imageData);
        };

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
            var DOWN = isTouch ? "touchstart" : "mousedown";
            var MOVE = isTouch ? "touchmove" : "mousemove";
            var END = isTouch ? "touchend" : "mouseup";

            slider.on(DOWN, ".slider-handle", function(e) {
                    var handle = this;
                    var x = isTouch ? e.originalEvent.touches[0].clientX : e.clientX;
                    var startX = parseInt($(handle).css("left"), 10);
                    var deltaX = 0;

                    $(document)
                        .on(MOVE + ".slider", function(e) {
                            e.preventDefault();

                            var clientX = isTouch ? e.originalEvent.targetTouches[0].clientX : e.clientX;

                            deltaX = ((clientX - x) + startX) - 100;
                            deltaX = Math.max(-100, Math.min(100, (deltaX)));

                            $(handle).css("left", 100 + deltaX);

                            if (!isTouch) {
                                updateImage(deltaX);
                            }
                        })
                        .on(END + ".slider", function(e) {
                            $(document).off(".slider");

                            updateImage(deltaX);
                        });
                });

            updateImage(0);
        }
    }

    function hide() {
        if (slider) {
            slider
                .off()
                .remove();
        }

        if ('ontouchstart' in window) {
            $(".header-wrap").show();
        }

        slider = null;

        memCanvas = null;
    }

    function createSlider() {
        var element = $('<div class="actions-wrap">' +
                '<div class="slider-wrap">' +
                    '<div class="slider-line"></div>' +
                    '<div class="slider-handle"></div>' +
                '</div>' +
                '<div class="buttons-wrap">' +
                    '<ul class="buttons-list">' +
                        '<li id="OKButton"><span class="icon icon-ok"></span></li>' +
                        '<li id="CancelButton"><span class="icon icon-cancel"></span></li>' +
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
