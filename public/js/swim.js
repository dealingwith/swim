$(function() {

  $('.main-textarea').focus().on('keyup', function(keyupEvent) {
    var key = keyupEvent.key;
    var $textarea = $('.main-textarea');
    if (key == '}') {
      var text = $textarea.val();
      var re = /\{([\s\S]*?)\}/g; //capture everything between brackets
      var results;
      var lastResult;
      while ((results = re.exec(text)) !== null) {
        lastResult = results[1];
      }

      doSearch(lastResult);
    }
  });

  $('body').on('click', function(e) {
    var $target = $(e.target).closest('.reference');
    if ($target.data('href')) {
      var win = window.open($target.data('href'), '_blank');
      win.focus();
    }
  });

});

function doSearch(search) {
  $.ajax({
    beforeSend: function (xhr) {  
      xhr.setRequestHeader("Ocp-Apim-Subscription-Key", BING_KEY);  
    },
    url: BING_URL,
    data: {
      q: search,
      mkt: 'en-us'
    },
    contentType: 'application/json'
  }).done(function(data) {
    console.log(data);
    
    data.webPages.value.forEach(function(result) {
      populateWebResults(result.name, result.url, result.snippet);
    });

    if (data.images) {
      var $imageResults = $(`<div class="reference images"></div>`);
      data.images.value.forEach(function(result) {
        populateImageResults($imageResults, result.contentUrl, result.thumbnailUrl);  
      });
      $imageResults.prependTo($('.reference-results'));
    }
    
    $('.reference-results').prepend(`<div class="reference-subhead yellow">${search}</div>`);  
    var backgroundTimeout = setTimeout(function() {
      $('.reference-subhead').removeClass('yellow');
    }, 2000);
  }).fail(function(error) {
    console.log(error);
  });
}

function populateWebResults(title, link, description) {
  var $referenceResults = $(`<div class="reference" data-href="${link}"></div>`);
  $referenceResults.append(`<p class="head">${title}</p>`);
  $referenceResults.append(`<p>${description}</p>`);
  $referenceResults.prependTo($('.reference-results'));
}

function populateImageResults($imageResults, link, thumb) {
  $imageResults.append(`<a href="${link}" target="_blank"><img src="${thumb}"></a>`);
}
