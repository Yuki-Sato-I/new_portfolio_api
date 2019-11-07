$(function(){
  $('.selection-bar li span').on('click', function(){
    $('.selection-bar li').removeClass('selected-tab');
    $(this).parent().addClass('selected-tab');
    console.log('tanavklnkal');
  });

  $('.about').on('click', function(){
    $('.profile-container, .work-container, .skill-container, .history-container').addClass('none');
    $('.profile-container').removeClass('none');
  });

  $('.work').on('click', function(){
    $('.profile-container, .work-container, .skill-container, .history-container').addClass('none');
    $('.work-container').removeClass('none');
  });

  $('.skill').on('click', function(){
    $('.profile-container, .work-container, .skill-container, .history-container').addClass('none');
    $('.skill-container').removeClass('none');
  });
  
  $('.history').on('click', function(){
    $('.profile-container, .work-container, .skill-container, .history-container').addClass('none');
    $('.history-container').removeClass('none');
  });
});