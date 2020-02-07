const statusLabels = ['ポートフォリオに公開しない', 'ポートフォリオに公開/ネットに公開', 'ポートフォリオに公開/ネットに未公開', '注目作品(トップページに表示)'];
var selectedWork = {};
const zeroPadding = num => `0${num}`.substr(-2);

$(() => {
  const buildWorkHTML = data => {
    var skillText = '';

    if(data.skills){//skillの編集まだ実装してないから一時的
      for (var skill of data.skills) {
        skillText += '<span>' + skill.name + ' </span>';
      }
    } else {
      skillText = $('.skill-content').html();
    }

    var date = new Date(data.release_at);

    $('#work-image').attr('src', data.image_url);
    var html = $('.work-right-content').empty();
    html.append('<h1>Title: <span>' + data.title + '</span></h1>');
    html.append('<p>関連url: <span>' + data.url + '</span></p>');
    html.append('<p>status: <span id="' + data.id +'">' + statusLabels[data.status] + '</span></p>');
    html.append('<p>公開日: <span>' + date.getFullYear() + '/' +  zeroPadding(date.getMonth() + 1) + '/' + zeroPadding(date.getDate())+ '</span></p>');
    html.append('<p>制作期間: <span>' + data.period + '</span></p>');
    if(data.skills){//skillの編集まだ実装してないから一時的
      html.append('<div class="skill-content"><p>Skill</p>' + skillText + '</div>');
    } else {
      html.append(`<div class="skill-content">${skillText}</div>`);
    }
    $('.work-content-text').empty().append(data.content);
    $('.work-reason-text').empty().append(data.reason);
    $('.work-appeal-text').empty().append(data.appeal);
  }

  $('.work-scroll ul li').click(function() {
    const id = $(this).val();
    $('.selected-work').removeClass('selected-work');
    $(this).addClass('selected-work');
    $('.work-edit-btn').removeClass('none');
    $('.work-edit-cancel-btn').addClass('none');
    $('.work-edit-save-btn').addClass('none');

    $.ajax({
      type:'GET',
      url: '/works/' + id
    })
    .done(data => buildWorkHTML(data))
    .fail(() => alert('検索に失敗しました'));
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
    $('#work_title').val('');
    $('#work_content').val('');
    $('#work_url').val('');
    $('#work_title').val('');
    $('.works').append('<li value=' + e.detail[0]['id'] + '>' + e.detail[0]['title'] +'</li>');
    $('.work-form').addClass('none');
    $('.work-add-btn').removeClass('none');
  });

  $('.work-edit-btn').click(function(){
    $(this).addClass('none');
    $('.work-edit-cancel-btn').removeClass('none');
    $('.work-edit-save-btn').removeClass('none');
    var id = $('.selected-work').attr('value');
    var title = $('.work-right-content h1 span').text();
    var url = $('.work-right-content p:eq(0) span').text();
    var status = $('.work-right-content p:eq(1) span').attr('id');
    var tempDate = $('.work-right-content p:eq(2) span').text();
    var releaseDate = new Date(tempDate);
    var period = $('.work-right-content p:eq(3) span').text();
    var content = $('.work-content-text').text();
    var reason = $('.work-reason-text').text();
    var appeal = $('.work-appeal-text').text();

    selectedWork = {
      id: id,
      title: title,
      url: url,
      status: status,
      release_at: releaseDate,
      period: period,
      content: content,
      reason: reason,
      appeal: appeal
    }

    var statusHtml = '<select class="work-status-input">';
    statusLabels.forEach((value, index) => {
      if(status != index){
        statusHtml += `<option value=${index}>${value}</option>`;
      } else {
        statusHtml += `<option selected value=${index}>${value}</option>`;
      }
    });
    statusHtml += "</select>";

    $('.work-right-content h1').empty().append('Title: <input class="work-text-input work-title-input" type="text" value="'+ title +'">');
    $('.work-right-content p:eq(0)').empty().append('関連url: <input class="work-text-input work-url-input" type="text" value="'+ url +'">');
    $('.work-right-content p:eq(1)').empty().append(`status: ${statusHtml}`);
    $('.work-right-content p:eq(2)').empty().append(`公開日: <input class="work-number-input work-release-year-input" type="number" value="${releaseDate.getFullYear()}">/<input class="work-number-input work-release-month-input" type="number" value="${releaseDate.getMonth() + 1}">/<input class="work-number-input work-release-date-input" type="number" value="${releaseDate.getDate()}">`);
    $('.work-right-content p:eq(3)').empty().append('制作期間: <input class="work-text-input work-period-input" type="text" value="'+ period +'">');
    $('.work-content-text').empty().append('<textarea class="work-textarea-input work-content-input" rows="5">' + content + '</textarea>');
    $('.work-reason-text').empty().append('<textarea class="work-textarea-input work-reason-input" rows="5">' + reason + '</textarea>');
    $('.work-appeal-text').empty().append('<textarea class="work-textarea-input work-appeal-input" rows="5">' + appeal + '</textarea>');
  });

  $('.work-edit-cancel-btn').on('click', function(){
    $(this).addClass('none');
    $('.work-edit-save-btn').addClass('none');
    $('.work-edit-btn').removeClass('none');
    buildWorkHTML(selectedWork);
  });

  $('.work-edit-save-btn').on('click', function(){
    $(this).addClass('none');
    $('.work-edit-cancel-btn').addClass('none');
    $('.work-edit-btn').removeClass('none');

    var id = $('.selected-work').attr('value');
    var title = $('.work-title-input').val();
    var url = $('.work-url-input').val();
    var status = $('.work-status-input option:selected').attr('value');
    var releaseDate = new Date($('.work-release-year-input').val(),$('.work-release-month-input').val()-1,$('.work-release-date-input').val())
    var period = $('.work-period-input').val();
    var content = $('.work-content-input').val();
    var reason = $('.work-reason-input').val();
    var appeal = $('.work-appeal-input').val();

    $.ajax({
      dataType: 'json',
      contentType: "application/json",
      url: `/works/${id}`,
      type: "PUT",
      data: JSON.stringify({
        'title': title,
        'url': url,
        'image': 'image',
        'status': status,
        'release_at': releaseDate,
        'period': period,
        'reason': reason,
        'content': content,
        'appeal': appeal
      })
    })
    .done(data =>  buildWorkHTML(data))
    .fail(() => alert('edit error'));
  });
});