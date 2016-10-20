function tileSize() {
  $('.tile').each(function() {
    if (!$(this).hasClass('full')) {
      $(this).height($(this).width());
      $(this).css('line-height', $(this).width() + 'px');
    }
  });
  $('.full').each(function() {
    $(this).offset({
      left: 0,
      top: 0
    });
    $(this).height($('body').height());
    $(this).width($('body').width());
    $(this).find('.heading').css('background', currentTemplate.css('background'));
  });
}

$(window).on('resize', function() {
  tileSize();
});
var currentTemplate = "";

function delayDestroy(obj, time) {
  setTimeout(function() {
    obj.remove();
  }, time);
}

$(document).ready(function() {
  $('.tile').each(function() {
    $(this).on('click', function() {
      currentTemplate = $(this);
      var full = $(this).clone().on('click', function() {
        $(this).offset({
          left: currentTemplate.offset().left,
          top: currentTemplate.offset().top
        });
        $(this).height(currentTemplate.height());
        $(this).width(currentTemplate.width());
        $(this).css('opacity', 0);
        delayDestroy($(this), 510);
      });
      $('body').append(full);
      $(full).css('position', 'absolute');
      $(full).offset({
        left: $(this).offset().left,
        top: $(this).offset().top
      });
      $(full).addClass('full');
      $(full).prepend('<div class="heading"></div>');
      tileSize();
    });
  });
  tileSize();
});
