var screens =
    [
        {
            anchor: "Main",
            content: "<u>main</u>"
        },

        {
            anchor: "Feedback",
            content: "<b>Feedback</b>"
        },
        {
            anchor: "About",
            content: "<strike>About</strike>"
        }
    ];

$(document).ready(function () {
    var anchorHandler = {
        wheelAngle: 0,
        backOffset: 50,
        columnOffset: 0,
        sBlockHeight: 0,
        $C: $('.container'),
        $SB: $('.scroll-bar'),
        $SC: $('.scroll-caret'),
        currentIndex: 0,
        inAction: false,
        screens: [],
        setCurrent: function (index) {
            this.currentIndex = parseInt(index);
        },
        init: function (screens) {
            var $body = $('body');

            $(window).on('resize', _.debounce(anchorHandler.scale, 200));

            $body.on('click', '[class*=anchor-]', function () {
                anchorHandler.scrollToIndex($(this).attr('data-index'));
            });

            $body.on('click', '#wheel-top', function () {
                anchorHandler.wheelerScroll(-1)
            });
            $body.on('click', '#wheel-bot', function () {
                anchorHandler.wheelerScroll(1)
            });

            this.screens = $.extend(true, {}, screens);

            for (var i = 0; i < screens.length; i++) {
                this.$C.append('<div id="' + screens[i].anchor + '" class="screen">' + screens[i].content + "</div>", {});
                this.$SB.append('<div class="anchor-' + i + '" data-index="' + i + '">' + screens[i].anchor + "</div>", {})
            }

            this.scale();
            return this;
        },
        wheelerScroll: function (direction) {
            var destination = direction + this.currentIndex;
            if (screens[destination]) {
                anchorHandler.scrollToIndex(destination);
            }
            return this;
        },
        scrollToIndex: function (index) {
            if (!this.inAction) {
                this.setCurrent(index);

                this.inAction = true;
                var time = 0.3,
                    caretOffset = $('.anchor-' + index).position().top - this.sBlockHeight / 2 + $('[class*=anchor-]').outerHeight() / 2,
                    delta = this.$SC.position().top - caretOffset;

                this.$C.animate({
                    scrollTop: $('#' + this.screens[index].anchor).position().top
                }, time * 1000);

                if (delta < -1 || delta > 1) {
                    this.backOffset += delta / 100;
                }

                //Landscape
                $('body').css({
                    'transition': 'background-position ' + time + 's linear',
                    'background-position': '0px ' + this.backOffset + "%"
                });

                // Columns
                this.columnOffset += delta;
                this.$C.css({
                    'transition': 'background-position ' + time + 's linear',
                    'background-position': 'left ' + this.columnOffset + ', right ' + this.columnOffset + ', left ' + this.columnOffset + ', right ' + this.columnOffset
                });

                //ScrollBar
                $('.scroll-caret').css({
                    'transition': 'top ' + time + 's linear',
                    'top': caretOffset
                });
                $('.scroll-bar').css({
                    'transition': 'background-position ' + time + 's linear',
                    'background-position': '0px ' + caretOffset + "px"
                });

                //Wheels
                this.wheelAngle += delta / 2;
                $('.rope-part').css({
                    'transition': 'background-position ' + time + 's linear',
                    'background-position': '0px ' + (caretOffset + 6) + "px"
                });

                $('.wheel-spinner').css({
                    'transition': 'transform ' + time + "s linear",
                    'transform': 'rotate(' + this.wheelAngle + 'deg)'
                });

                setTimeout(function () {
                    anchorHandler.inAction = false;
                }, time * 1000);
            }
            return this;
        },
        scale: function () {
            anchorHandler.$SB.css('height', $('.wrapper')[0].clientHeight - $('.wheel').first().outerHeight() * 2);

            var bH = anchorHandler.$SB[0].clientHeight,
                $arrow = $('.arrow'),
                $anchors = $('[class*=anchor-]');

            anchorHandler.sBlockHeight = (bH / screens.length);

            anchorHandler.$SC.css('height', anchorHandler.sBlockHeight);
            $arrow.css('top', anchorHandler.$SC.outerHeight() / 2 - $arrow.outerHeight() / 2);

            $anchors.each(function (index, el) {
                $(el).css({
                    "top": (anchorHandler.sBlockHeight * (index + 1) - (anchorHandler.sBlockHeight / 2)) - $anchors.outerHeight() / 2,
                    "left": anchorHandler.$SB.outerWidth() + 15
                })
            });

            anchorHandler.wheelerScroll(0);
            return this;
        }
    };

    anchorHandler.init(screens);
});