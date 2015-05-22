define(function() {
    var canvas;
    var memCanvas;
    var originalImageData;
    var slider;

    function show(cv, changeCallback, okCallback) {
        slider = createSlider();

        canvas = cv;
        originalImageData = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);

        memCanvas = $("<canvas>")[0];
        memCanvas.width = canvas.width;
        memCanvas.height = canvas.height;

        var memContext = memCanvas.getContext("2d");
        memContext.drawImage(canvas, 0, 0);

        slider.on("click", "#OKButton", function() {
                destroy();

                if (okCallback) {
                    okCallback();
                }
            })
            .on("click", "#CancelButton", function() {
                hide();
            });

        if (changeCallback) {
            slider.on("mousedown", ".slider-handle", function(e) {
                    var handle = this;
                    var x = e.clientX;
                    var startX = parseInt($(handle).css("left"), 10);
                    var deltaX;

                    $(document)
                        .on("mousemove", function(e) {
                            e.preventDefault();

                            deltaX = ((e.clientX - x) + startX) - 100;
                            deltaX = Math.max(-100, Math.min(100, (deltaX)));

                            $(handle).css("left", 100 + deltaX);

                            var imageData = memContext.getImageData(0, 0, memCanvas.width, memCanvas.height);
                            changeCallback(deltaX, imageData);
                        })
                        .on("mouseup", function(e) {
                            //var imageData = memContext.getImageData(0, 0, memCanvas.width, memCanvas.height);
                            //changeCallback(deltaX, imageData);

                            $(document).off();
                        });
                });
        }
    }

    function destroy() {
        if (slider) {
            slider
                .off()
                .remove();
        }

        slider = null;

        memCanvas = null;
        originalImageData = null;
    }

    function hide() {
        if (originalImageData) {
            var context = canvas.getContext("2d");

            context.putImageData(originalImageData, 0, 0);
        }

        destroy();
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
