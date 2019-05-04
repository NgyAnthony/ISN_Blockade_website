var c = document.getElementById("canvas");
var ctx = c.getContext("2d");


/* -------------------------------------------------------------------------
 Begin scroll down button
 https://codepen.io/alexandr-kazakov/pen/PmYamP
 * ------------------------------------------------------------------------- */
(function() {
    'use strict';

    var btnScrollDown = document.querySelector('#scroll_down');

    function scrollDown() {
        var windowCoords = document.documentElement.clientHeight;
        (function scroll() {
            if (window.pageYOffset < windowCoords) {
                window.scrollBy(0, 10);
                setTimeout(scroll, 0);
            }
            if (window.pageYOffset > windowCoords) {
                window.scrollTo(0, windowCoords);
            }
        })();
    }

    btnScrollDown.addEventListener('click', scrollDown);
})();
/* -------------------------------------------------------------------------
 Begin animation
 https://codepen.io/mladen___/pen/gbvqBo
 * ------------------------------------------------------------------------- */
function resize() {
    var box = c.getBoundingClientRect();
    c.width = box.width;
    c.height = box.height;
}

var light = {
    x: 160,
    y: 200
}

var colors = ["#54afd6", "#d66c54"];

function Box() {
    this.half_size = Math.floor((Math.random() * 50) + 1);
    this.x = Math.floor((Math.random() * c.width) + 1);
    this.y = Math.floor((Math.random() * c.height) + 1);
    this.r = Math.random() * Math.PI;
    this.shadow_length = 2000;
    this.color = colors[Math.floor((Math.random() * colors.length))];

    this.getDots = function() {

        var full = (Math.PI * 2) / 4;


        var p1 = {
            x: this.x + this.half_size * Math.sin(this.r),
            y: this.y + this.half_size * Math.cos(this.r)
        };
        var p2 = {
            x: this.x + this.half_size * Math.sin(this.r + full),
            y: this.y + this.half_size * Math.cos(this.r + full)
        };
        var p3 = {
            x: this.x + this.half_size * Math.sin(this.r + full * 2),
            y: this.y + this.half_size * Math.cos(this.r + full * 2)
        };
        var p4 = {
            x: this.x + this.half_size * Math.sin(this.r + full * 3),
            y: this.y + this.half_size * Math.cos(this.r + full * 3)
        };

        return {
            p1: p1,
            p2: p2,
            p3: p3,
            p4: p4
        };
    }
    this.rotate = function() {
        var speed = (60 - this.half_size) / 20;
        this.r += speed * 0.002;
        this.x += speed;
        this.y += speed;
    }
    this.draw = function() {
        var dots = this.getDots();
        ctx.beginPath();
        ctx.moveTo(dots.p1.x, dots.p1.y);
        ctx.lineTo(dots.p2.x, dots.p2.y);
        ctx.lineTo(dots.p3.x, dots.p3.y);
        ctx.lineTo(dots.p4.x, dots.p4.y);
        ctx.fillStyle = this.color;
        ctx.fill();


        if (this.y - this.half_size > c.height) {
            this.y -= c.height + 100;
        }
        if (this.x - this.half_size > c.width) {
            this.x -= c.width + 100;
        }
    }
}

var boxes = [];

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].rotate();
    };
    for (var i = 0; i < boxes.length; i++) {
        collisionDetection(i)
        boxes[i].draw();
    };
    requestAnimationFrame(draw);
}

resize();
draw();


while (boxes.length < 14) {
    boxes.push(new Box());
}

window.onresize = resize;
c.onmousemove = function(e) {
    light.x = e.offsetX == undefined ? e.layerX : e.offsetX;
    light.y = e.offsetY == undefined ? e.layerY : e.offsetY;
}


function collisionDetection(b){
    for (var i = boxes.length - 1; i >= 0; i--) {
        if(i != b){
            var dx = (boxes[b].x + boxes[b].half_size) - (boxes[i].x + boxes[i].half_size);
            var dy = (boxes[b].y + boxes[b].half_size) - (boxes[i].y + boxes[i].half_size);
            var d = Math.sqrt(dx * dx + dy * dy);
            if (d < boxes[b].half_size + boxes[i].half_size) {
                boxes[b].half_size = boxes[b].half_size > 1 ? boxes[b].half_size-=1 : 1;
                boxes[i].half_size = boxes[i].half_size > 1 ? boxes[i].half_size-=1 : 1;
            }
        }
    }
}


/* -------------------------------------------------------------------------
 Begin img list scroll animation
 https://jsfiddle.net/maherhossain/a24nymv1/
 * ------------------------------------------------------------------------- */


function animatethis(targetElement, speed) {
    var scrollWidth = $(targetElement).get(0).scrollWidth;
    var clientWidth = $(targetElement).get(0).clientWidth;
    $(targetElement).animate({ scrollLeft: scrollWidth - clientWidth },
        {
            duration: speed,
            complete: function () {
                targetElement.animate({ scrollLeft: 0 },
                    {
                        duration: speed,
                        complete: function () {
                            animatethis(targetElement, speed);
                        }
                    });
            }
        });
}
animatethis($('#container_list'), 30000);


/* -------------------------------------------------------------------------
 Begin scroll top
 https://wprock.fr/blog/javascript-jquery-smooth-scrolling/
  * ------------------------------------------------------------------------- */
$(function() {
    /**
     * Smooth scrolling to the top of page
     **/
    $("html, body").animate({scrollTop : 0}, 200);
});
