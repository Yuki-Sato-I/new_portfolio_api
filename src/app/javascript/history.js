const zeroPadding = num => `0${num}`.substr(-2);
const imageChange = (event) => {
  var image = event.target.files[0]
  var reader = new FileReader();
  reader.onload = () => $('#history-image').attr('src', reader.result);
  reader.readAsDataURL(image);
};

var selectedHistory = {
  id: 0,
  title: "",
  image_url: "",
  content: "",
  start_at: ""
}

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

  const reBuild = (data, point) => {
    var startDate = new Date(data.start_at);
    $(point).parent().parent().siblings('.history-startDate').empty().append(startDate);
    $(point).parent().siblings('.history-title').empty().append(data.title);
    $(point).parent().siblings('.history-content').empty().append(data.content);
    $(point).parent().parent().find('.history-image-container').empty().append(`<img src="${data.image_url}" id="history-image" class="history-image" width="400" height="250">`);
    $(point).parent().parent().siblings('.cbp_tmtime').children('span:eq(0)').empty().append(startDate.getFullYear());
    $(point).parent().parent().siblings('.cbp_tmtime').children('span:eq(1)').empty().append(`${zeroPadding(startDate.getMonth()+1)}/${zeroPadding(startDate.getDate())}`);
  }

  $(document).on('click', '.history-edit-btn', function(){
    $(this).siblings('.history-edit-cancel-btn').removeClass('none');
    $(this).siblings('.history-edit-save-btn').removeClass('none');
    $(this).addClass('none');

    var id = $(this).parent().parent().parent().attr('value');
    var image_url = $(this).parent().parent().find('.history-image').attr('src');
    var title = $(this).parent().siblings('.history-title').text();
    var content = $(this).parent().siblings('.history-content').text();
    var startDate = new Date($(this).parent().parent().siblings('.history-startDate').text());

    selectedHistory.id = id;
    selectedHistory.image_url = image_url;
    selectedHistory.title = title;
    selectedHistory.content = content;
    selectedHistory.start_at = startDate;

    var inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/jpg,image/jpeg,image/png";
    inputElement.id = "history-edit-image";
    inputElement.addEventListener("change", imageChange, false);

    $(this).parent().siblings('.history-title').empty().append(`<input class="history-title-input history-text-input" type="text" value="${title}">`);
    $(this).parent().siblings('.history-content').empty().append(`<textarea class="history-content-input history-textarea-input" rows="5">${content}</textarea>`);
    $(this).parent().parent().find('.history-image-container').empty().append(`<img src="${image_url}" id="history-image" class="history-image" width="400" height="250">`).append(inputElement);
    $(this).parent().parent().siblings('.cbp_tmtime').children('span:eq(0)').empty().append(`<input class="history-year-input history-number-input" type="number" value="${startDate.getFullYear()}">`);
    $(this).parent().parent().siblings('.cbp_tmtime').children('span:eq(1)').empty().append(`<input class="history-month-input history-number-input" type="number" value="${startDate.getMonth()+1}">/<input class="history-date-input history-number-input" type="number" value="${startDate.getDate()}">`);
  });

  $(document).on('click', '.history-edit-cancel-btn', function(){
    $(this).addClass('none');
    $(this).next().addClass('none');
    $(this).next().next().removeClass('none');
    reBuild(selectedHistory, this);
  });

  $(document).on('click', '.history-edit-save-btn', function(){
    $(this).addClass('none');
    $(this).prev().addClass('none');
    $(this).next().removeClass('none');

    var id = $(this).parent().parent().parent().attr('value');
    var title = $('.history-title-input').val();
    var content = $('.history-content-input').val();
    var imageFile = document.getElementById("history-edit-image").files[0];
    var startAt = new Date($('.history-year-input').val(),$('.history-month-input').val()-1,$('.history-date-input').val());
    var endAt = new Date($('.history-endDate').text());

    var formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if(imageFile){
      formData.append('image', imageFile);
    }
    formData.append('start_at', startAt);
    formData.append('end_at', endAt);

    $.ajax({
      url: `/histories/${id}`,
      contentType: false,
      processData: false,
      type: "PUT",
      data: formData,
    })
    .done(data => reBuild(data, this))
    .fail(() => alert('edit error'));
  });
});