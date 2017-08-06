
var BarbaWidget = {
    init: function() {
        var scope = this;
        Barba.Pjax.start();
        Barba.Prefetch.init();
        Barba.Pjax.getTransition = function() {
            return scope.MovePage;
        };
    },
    MovePage: Barba.BaseTransition.extend({
        start: function() {
            Promise.all([this.newContainerLoading]).then(this.movePages.bind(this));
        },
        movePages: function() {
            var scope = this;

            TweenLite.set(this.newContainer, {
                visibility: 'hidden'
            });

            TweenLite.to(this.oldContainer, 0.7, { alpha: 0 });
            TweenLite.to(this.newContainer, 0.7, { alpha: 1, onComplete: function() {
            TweenLite.set(scope.newContainer, { clearProps: 'all' });
                scope.done();
            }});
        }
    })
};

document.addEventListener("DOMContentLoaded", function() {
    BarbaWidget.init();
});


/* navigation */

Array.from(document.querySelectorAll('.nav__link'),function(el){

  el.addEventListener('mousemove',function(e){
    el.style.setProperty('--px', e.clientX - el.offsetLeft);
    el.style.setProperty('--py', e.clientY - el.offsetTop);
  });

});



