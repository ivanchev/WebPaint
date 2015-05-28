define(function() {
    var isTouch;
    var container;
    var toolbar;
    var toolbarPrimary;
    var toolbarSecondary;
    var header;
    var animationDuration = 300;

    function isTouch() {
        return 'ontouchstart' in window;
    }

    function init(cntr) {
        container = cntr;
        toolbar = container.find(".toolbar-wrap");
        header = container.find(".header-wrap");
        toolbarPrimary = toolbar.find(".toolbar-primary-wrap");
        toolbarSecondary = toolbar.find(".toolbar-secondary-wrap");
    }

    function transition(toobarCallback, headerCallback) {
        toolbar.animate({
            bottom: "-70px"
        }, animationDuration, function() {
            toobarCallback();

            toolbar.animate({
                bottom: "0px"
            }, animationDuration);
        });

        header.animate({
            top: "-70px"
        }, animationDuration, function() {
            headerCallback();

            header.animate({
                top: "0px"
            }, animationDuration);
        });
    }

    function restore() {
        transition(function toobarCallback() {
            toolbarSecondary
                .hide()
                .find("ul")
                .hide();
            toolbarPrimary.show();
        }, function headerCallback() {
            header.find("ul").show();
            $("#confirmList").hide();
        });
    }

    function show(panel, button) {
        if (isTouch()) {
            transition(function toobarCallback() {
                if (panel) {
                    $(panel).show();
                    toolbarSecondary.show();
                    toolbarPrimary.hide();
                }
            }, function headerCallback() {
                header.find("ul").hide();
                $("#confirmList").show();
            });
        } else {
            toolbarSecondary.find("ul").hide();
            toolbar.find(".selected").removeClass("selected");

            $(panel).show();

            $(button).addClass("selected");
        }
    }

    return {
        init: init,
        isTouch: isTouch,
        restore: restore,
        show: show
    };
});
