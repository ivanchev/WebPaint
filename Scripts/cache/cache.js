define(function () {
    var cacheArray = [];
    var original = {};
    var capacity = 10;
    var canvas = null;
    var currentIndex = 0;
    var lastIndex = 0;

    function getImageData() {
        var context = canvas.getContext("2d");
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        return imageData;
    }

    function apply(imageData) {
        // TODO width and height
        var context = canvas.getContext("2d");

        context.putImageData(imageData, 0, 0);
    }

    function initArray(data) {
        currentIndex = lastIndex = 0;

        cacheArray = [];

        cacheArray[currentIndex] = data;
    }

    function init(cv) {
        canvas = cv;
        original = getImageData(cv);

        initArray(original);
    }

    function store() {
        var imageData = getImageData(canvas);

        if (currentIndex === capacity - 1) {
            cacheArray = cacheArray.slice(1);
        } else {
            currentIndex = lastIndex = currentIndex + 1;
        }

        cacheArray[currentIndex] = imageData;
    }

    function reset() {
        apply(original);

        initArray(original);
    }

    function undo() {
        var newIndex = currentIndex - 1;

        if (newIndex < 0) {
            return;
        }

        currentIndex = newIndex;
        apply(cacheArray[currentIndex]);
    }

    function redo() {
        var newIndex = currentIndex + 1;

        if (newIndex > lastIndex) {
            return;
        }

        currentIndex = newIndex;
        apply(cacheArray[currentIndex]);
    }

    return {
        init: init,
        reset: reset,
        store: store,
        undo: undo,
        redo: redo
    };
});