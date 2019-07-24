$(document).ready(function () {
  var trendingQueryURL = "https://api.giphy.com/v1/gifs/trending?api_key=eXoUeSum3cCH28874SgX9XJL7UHYlGoj&limit=10&rating=pg";
  var searchQueryURL = "https://api.giphy.com/v1/gifs/search?api_key=eXoUeSum3cCH28874SgX9XJL7UHYlGoj&limit=10&rating=pg&q=";
  var searchArr = [];
  $.ajax({
      url: trendingQueryURL,
      method: "GET"
  }).then(function (response) {
      console.log(response);
      var gifArr = response.data;
      for (var i = 0; i < gifArr.length; i++) {
          $('#trending').append("<div class='ratings'> Rating:  " + (gifArr[i].rating) + " </div>");
          console.log(gifArr[i].images.downsized.url);
          $('#trending').append("<img src ='" + gifArr[i].images.downsized_still.url + " 'data-still=' " + gifArr[i].images.downsized_still.url + " ' data-animate=' " + gifArr[i].images.downsized.url + "' data-state='still' class='gifs'>");
      }
  });
  $('#search').click(function () {
      var searchTerm = $('#input1').val();
      if (searchTerm.length > 0) {
          $('#input1').val("");
          $.ajax({
              url: searchQueryURL + searchTerm,
              method: "GET"
          }).then(function (response) {
              $('#buttonArea').append('<button data-index="' + searchArr.length + '" class="searchButtons">' + searchTerm + '</button>');
              searchArr.push(response);
              var gifArr = response.data;
              $('#history').empty();
              for (var i = 0; i < gifArr.length; i++) {
                  $('#history').append("<div class='ratings'> Rating:  " + (gifArr[i].rating) + " </div>");
                  console.log(gifArr[i].images.downsized.url);
                  $('#history').append("<img src ='" + gifArr[i].images.downsized_still.url + " 'data-still=' " + gifArr[i].images.downsized_still.url + " ' data-animate=' " + gifArr[i].images.downsized.url + "' data-state='still' class='gifs'>");
              }
              console.log(response)
          });
          console.log(searchTerm)
      }
  });
  $(document).on('click', 'button.searchButtons', function () {
      var index = $(this).attr('data-index');
      var gifArr = searchArr[index].data;
      $('#history').empty();
      for (var i = 0; i < gifArr.length; i++) {
          console.log(gifArr[i].images.downsized.url);
          $('#history').append("<div class='ratings'> Rating:  " + (gifArr[i].rating) + " </div>");
          $('#history').append("<img src ='" + gifArr[i].images.downsized_still.url + " 'data-still=' " + gifArr[i].images.downsized_still.url + " ' data-animate=' " + gifArr[i].images.downsized.url + "' data-state='still' class='gifs'>");
      }
      console.log(index)
  });
  $(document).on('click', 'img.gifs', function () {
      var state = $(this).attr('data-state');
      if (state == 'still') {
          $(this).attr('src', $(this).attr("data-animate"));
          $(this).attr('data-state', 'animate');
      } else {
          $(this).attr('src', $(this).attr("data-still"));
          $(this).attr('data-state', 'still');
      }
  });
  $("#form").submit(function (e) {
      e.preventDefault();
  });
});
