$(function(){
  $('.skill-add-btn').on('click', function(){
    $('.skill-form').removeClass('none');
    $(this).addClass('none');
  });
  $('.skill-cancel-btn').on('click', function(){
    $('.skill-form').addClass('none');
    $('.skill-add-btn').removeClass('none');
  });

  $('.skill-add-container').on('ajax:success', 'form', function(e) {
    console.log(e.detail[0])
    $('#skill_name').val('');
    $('.skills').append('<div class="skill-block"><span><img src="' + e.detail[0]['image_url'] +'" width="50" height="50">' + '</span>' + '<span class="skill-name">' + e.detail[0]['name'] + '</span></div>');
    $('.skill-form').addClass('none');
    $('.skill-add-btn').removeClass('none');
  })
});