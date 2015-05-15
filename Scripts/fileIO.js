define(function() {
    function loadFile(input, canvas, callback) {
        var file;
        var fileReader;

        if (typeof window.FileReader !== 'function') {
            alert("The file API isn't supported on this browser yet.");
            return;
        }

        if (!input.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else {
            file = input.files[0];
            fileReader = new FileReader();
            fileReader.onload = function () {
                var imageUrl = fileReader.result;

                loadImage(imageUrl, canvas, callback);
            };
            fileReader.readAsDataURL(file);
        }
    }

    function loadImage(src, canvas, callback) {
        var img = new Image();

        img.onload = function () {
            var ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            if (callback) {
                callback.call(this, canvas);
            }
        };

        img.src = src;
    }

    return {
        loadFile: loadFile
    };
});
