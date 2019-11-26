$(function(){

  function reBuild(data) {
    var profileHtml = `<h1>${data.name}/${data.en_name}</h1><p>年齢: ${data.age}歳</p><p>職業: ${data.profession}</p>`;
    var contentHtml = `<p>${data.content}</p>`;
    var serviceHtml = `<p>${data.service}</p>`;

    $('#user-image').attr('src', data.image);
    $('.profile').empty().append(profileHtml);
    $('.user-content p').empty().append(contentHtml);
    $('.user-service p').empty().append(serviceHtml);
  }

  $('.user-edit-btn').on('click', function(){
    $(this).addClass('none');
    $('.user-edit-cancel-btn').removeClass('none');
    $('.user-edit-save-btn').removeClass('none');
    $('.user-age').empty().append('年齢: <input class="user-number-input user-age-input" type="number" value="'+ gon.user.age +'">歳');
    $('.user-profession').empty().append('職業: <input class="user-profession-input" type="text" value="'+ gon.user.profession +'">');
    $('.profile h1').empty().append('<input class="user-text-input user-name-input" type="text" value="'+ gon.user.name +'">/<input class="user-text-input user-enname-input" type="text" value="'+ gon.user.en_name +'">');
    $('.user-content p').empty().append('<textarea class="user-textarea-input user-content-input" rows="5">' + gon.user.content + '</textarea>');
    $('.user-service p').empty().append('<textarea class="user-textarea-input user-service-input" rows="5">' + gon.user.service + '</textarea>');
  });

  $('.user-edit-cancel-btn').on('click', function(){
    $(this).addClass('none');
    $('.user-edit-save-btn').addClass('none');
    $('.user-edit-btn').removeClass('none');
    reBuild(gon.user);
  });

  $('.user-edit-save-btn').on('click', function(){
    $(this).addClass('none');
    $('.user-edit-cancel-btn').addClass('none');
    $('.user-edit-btn').removeClass('none');

    var name = $('.user-name-input').val();
    var enName = $('.user-enname-input').val();
    var age = $('.user-age-input').val();
    var profession = $('.user-profession-input').val();
    var content = $('.user-content-input').val();
    var service = $('.user-service-input').val();

    $.ajax({      
      dataType: 'json',
      contentType: "application/json",
      url: '/users/1',
      type: "PUT",
      data: JSON.stringify({
      'name': name,
      'en_name': enName,
      'image': 'image',
      'age': age,
      'profession': profession,
      'content': content,
      'service': service
      })
    })
    .done(function(data) {
      reBuild(data);
      gon.user = data;
    })
    .fail(function() {
      alert('edit error');
    });
  });
});