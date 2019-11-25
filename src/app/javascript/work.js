$(function(){
  function buildWorkHTML(data){

    const zeroPadding = (num) => `0${num}`.substr(-2);

    var skillText = '';
    for (var skill of data.skills) {
      skillText += '<span>' + skill.name + ' </span>';
    }

    var date = new Date(data.release_at);
    var status = ['ポートフォリオに公開しない', 'ポートフォリオに公開/ネットに公開', 'ポートフォリオに公開/ネットに未公開', '注目作品(トップページに表示)'];

    $('#work-image').attr('src', data.image);
    var html = $('.work-right-content').empty();
    html.append('<h1>Title: ' + data.title + '</h1>');
    html.append('<p>関連url: ' + data.url + '</p>');
    html.append('<p>status: ' + status[data.status] + '</p>');
    html.append('<p>公開日: ' + date.getFullYear() + '/' +  zeroPadding(date.getMonth() + 1) + '/' + zeroPadding(date.getDate())+ '</p>');
    html.append('<p>制作期間: ' + data.period + '</p>');
    html.append('<div><p>Skill</p>' + skillText + '</div>');
    $('.work-content-text').empty().append(data.content);
    $('.work-reason-text').empty().append(data.reason);
    $('.work-appeal-text').empty().append(data.appeal);
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
    });
  });

  $('.work-add-btn').on('click', function(){
    $('.work-form').removeClass('none');
    $(this).addClass('none');
  });
  $('.work-cancel-btn').on('click', function(){
    $('.work-form').addClass('none');
    $('.work-add-btn').removeClass('none');
  });
  
  $('.work-add-container').on('ajax:success', 'form', function(e) {
    console.log(e.detail[0])
    $('#work_title').val('');
    $('#work_content').val('');
    $('#work_url').val('');
    $('#work_title').val('');
    $('.works').append('<li value=' + e.detail[0]['id'] + '>' + e.detail[0]['title'] +'</li>');
    $('.work-form').addClass('none');
    $('.work-add-btn').removeClass('none');
  });
});