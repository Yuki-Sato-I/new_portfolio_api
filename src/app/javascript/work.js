$(function(){
  function buildWorkHTML(data){

    const zeroPadding = (num) => `0${num}`.substr(-2);

    var skillText = '';
    for (var skill of data.skills) {
      skillText += '<span>' + skill.name + ' </span>';
    }

    var date = new Date(data.release_at);

    $('#work-image').attr('src', data.image);
    var html = $('.work-right-content').empty();
    html.append('<h1>Title: ' + data.title + '</h1>');
    html.append('<p>関連url: ' + data.url + '</p>');
    html.append('<p>status: ' + data.status + '</p>');
    html.append('<p>公開日: ' + date.getFullYear() + '/' +  zeroPadding(date.getMonth() + 1) + '/' + zeroPadding(date.getDate())+ '</p>');
    html.append('<div><p>Skill</p>' + skillText + '</div>');
    $('#work-content').empty().append(data.content);
  }

  $('.work-scroll ul li').click(function() {

    var id = $(this).val();
    $('.selected-work').removeClass('selected-work');
    $(this).addClass('selected-work');

    $.ajax({
      type:'GET',
      url: '/works/' + id
    })
    .done(function(data){
      console.log(data)
      buildWorkHTML(data);
    })
    .fail(function(){
      alert('検索に失敗しました');
    })
  })
});