const imageChange = (event) => {
  var image = event.target.files[0]
  var reader = new FileReader();
  reader.onload = () => $('#user-image').attr('src', reader.result);
  reader.readAsDataURL(image);
};

$(() => {
  const reBuild = data => {
    var profileHtml = `<h1>${data.name}/${data.en_name}</h1><p class="user-age">年齢: ${data.age}歳</p><p class="user-profession">職業: ${data.profession}</p>`;
    var contentHtml = `${data.content}`;
    var serviceHtml = `${data.service}`;

    $('.user-image-container').empty().append(`<img src="${data.image_url}" id="user-image" width="200" height="200">`)
    $('.profile').empty().append(profileHtml);
    $('.user-content p').empty().append(contentHtml);
    $('.user-service p').empty().append(serviceHtml);
  }

  $('.user-edit-btn').click(function(){
    $(this).addClass('none');
    var image = $('#user-image').attr('src');
    var inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "image/jpg,image/jpeg,image/png";
    inputElement.id = "user-edit-image";
    inputElement.addEventListener("change", imageChange, false);
    $('.user-image-container').empty().append(`<img src="${image}" id="user-image" width="200" height="200">`).append(inputElement);
    $('.user-edit-cancel-btn').removeClass('none');
    $('.user-edit-save-btn').removeClass('none');
    $('.user-age').empty().append('年齢: <input class="user-number-input user-age-input" type="number" value="'+ gon.user.age +'">歳');
    $('.user-profession').empty().append('職業: <input class="user-profession-input" type="text" value="'+ gon.user.profession +'">');
    $('.profile h1').empty().append('<input class="user-text-input user-name-input" type="text" value="'+ gon.user.name +'">/<input class="user-text-input user-enname-input" type="text" value="'+ gon.user.en_name +'">');
    $('.user-content p').empty().append('<textarea class="user-textarea-input user-content-input" rows="5">' + gon.user.content + '</textarea>');
    $('.user-service p').empty().append('<textarea class="user-textarea-input user-service-input" rows="5">' + gon.user.service + '</textarea>');
  });

  $('.user-edit-cancel-btn').click(function(){
    $(this).addClass('none');
    $('.user-edit-save-btn').addClass('none');
    $('.user-edit-btn').removeClass('none');
    reBuild(gon.user);
  });

  $('.user-edit-save-btn').click(function(){
    $(this).addClass('none');
    $('.user-edit-cancel-btn').addClass('none');
    $('.user-edit-btn').removeClass('none');

    var name = $('.user-name-input').val();
    var enName = $('.user-enname-input').val();
    var imageFile = document.getElementById("user-edit-image").files[0];
    var age = $('.user-age-input').val();
    var profession = $('.user-profession-input').val();
    var content = $('.user-content-input').val();
    var service = $('.user-service-input').val();

    var formData = new FormData();
    formData.append('name', name);
    formData.append('en_name', enName);
    if(imageFile){
      formData.append('image', imageFile);
    }
    formData.append('age', age);
    formData.append('profession', profession);
    formData.append('content', content);
    formData.append('service', service);

    $.ajax({
      url: '/users/1',
      contentType: false,
      processData: false,
      type: "PUT",
      data: formData,
    })
    .done(data => {
      reBuild(data);
      gon.user = data;
    })
    .fail(() => alert('edit error'));
  });
});