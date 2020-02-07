$(() => {
  $('.history-add-btn').on('click', function(){
    $('.history-form').removeClass('none');
    $(this).addClass('none');
  });
  $('.history-cancel-btn').on('click', function(){
    $('.history-form').addClass('none');
    $('.history-add-btn').removeClass('none');
  });

  $('.history-add-container').on('ajax:success', 'form', function(e) {
    $('#history_title').val('');
    $('#history_content').val('');
    $('.history-form').addClass('none');
    $('.history-add-btn').removeClass('none');
  });
});