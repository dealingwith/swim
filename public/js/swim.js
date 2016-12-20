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

  $('.reference-results').on('click', function(e) {
    var $target = $(e.target);

    // menu links
    var $menu = $target.closest('.menu');
    if ($menu.length) {
      // create link
      if ($menu.hasClass('create-link')) {
        createLink($menu.closest('.reference').data('href'), 
          $menu.closest('.reference').prev('.reference-subhead').find('.search-term').text());
        return;
      }
      // create footnote
      if ($menu.hasClass('create-footnote')) {
        console.log('create footnote clicked');
        return;
      }
      // create new
      if ($menu.hasClass('create-new')) {
        console.log('create new clicked');
        return;
      }
    }


    // clicking the result somewhere else opens the result in a new tab
    var $reference = $target.closest('.reference');
    if ($reference.data('href')) {
      var win = window.open($target.data('href'), '_blank');
      win.focus();
      return;
    }

  });

  // test data
  processResults({
    webPages: {
      value: [{
        name: 'Lorem ipsum dolor sit amet',
        url: 'http://example.com',
        snippet: 'consectetur adipisicing elit. Aut quasi et consectetur voluptates vero culpa eveniet illum vel tenetur dignissimos? Aut itaque tenetur dolores sapiente quis, porro, vero natus autem!'
      }, {
        name: 'Migas neutra occupy humblebrag green juice',
        url: 'http://example.com',
        snippet: 'Everyday carry roof party church-key hell of waistcoat. Scenester squid polaroid selfies gluten-free single-origin coffee butcher. Fanny pack air plant hammock, tofu try-hard austin umami franzen polaroid authentic selfies chartreuse.'
      }]
    }
  }, 'Lorem ipsum');
  $('.main-textarea').val('{Lorem ipsum}')

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
    processResults(data, search);
  }).fail(function(error) {
    console.log(error);
  });
}

function processResults(data, search) {
  data.webPages.value.reverse().forEach(function(result) {
    populateWebResults(result.name, result.url, result.snippet);
  });

  if (data.images) {
    var $imageResults = $(`<div class="reference images"></div>`);
    data.images.value.reverse().forEach(function(result) {
      populateImageResults($imageResults, result.contentUrl, result.thumbnailUrl);  
    });
    $imageResults.prependTo($('.reference-results'));
  }
  
  $('.reference-results').prepend(`<div class="reference-subhead yellow"><span class="glyphicon glyphicon-tint"></span> <span class="search-term">${search}</span></div>`);  
  var backgroundTimeout = setTimeout(function() {
    $('.reference-subhead').removeClass('yellow');
  }, 3000);
}

function populateWebResults(title, link, description) {
  var referenceResultsTemplate = Handlebars.compile($('#template-result').html() || "");
  var referenceResultsHtml = referenceResultsTemplate({
    title: title,
    link: link,
    description: description
  });
  $(referenceResultsHtml).prependTo($('.reference-results'));
}

function populateImageResults($imageResults, link, thumb) {
  $imageResults.append(`<a href="${link}" target="_blank"><img src="${thumb}"></a>`);
}

function createLink(link, text) {
  var $textarea = $('.main-textarea');
  var val = $textarea.val();
  var newval = val.replace(`{${text}}`, `[${text}](${link})`);
  $textarea.val(newval);
} 
