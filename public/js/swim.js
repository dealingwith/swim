var textarea = new TextareaView();
var resultsCollection = new Results();
var resultsView = new ResultsView({
  collection: resultsCollection
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
    console.log(data, search);
    processResults(data, search);
  }).fail(function(error) {
    console.log(error);
  });
}

function processResults(data, search) {
  data.webPages.value.reverse().forEach(function(result) {
    resultsCollection.add(new Result({
      search: search,
      result: result
    }));
  });

  // if (data.images) {
  //   var $imageResults = $(`<div class="reference images"></div>`);
  //   data.images.value.reverse().forEach(function(result) {
  //     populateImageResults($imageResults, result.contentUrl, result.thumbnailUrl);  
  //   });
  //   $imageResults.prependTo($('.reference-results'));
  // }
}

function populateImageResults($imageResults, link, thumb) {
  $imageResults.append(`<a href="${link}" target="_blank"><img src="${thumb}"></a>`);
}
