$(document).ready((function() {
  console.log("hi");
  $.ajax({  //fetching business news through API
    url: "https://newsapi.org/v2/sources?language=en&category=business&apiKey=8ad7b81062244ec892726aa778e20f45",
    datatype: "json",
    success: function(newsdata) {
      console.log(newsdata);
      console.log(newsdata.sources.length);

      for (var i = 0; i<newsdata.sources.length; i++) {
        $("#LiveNews").append('<a href="#"><li class="list-group-item news-list"></li></a>');
        console.log(newsdata.sources[i].description);
        }
      for (var j = 0; j<newsdata.sources.length; j++) {
        $(".news-list").eq(j).text(newsdata.sources[j].description);
        }


      }});
    }));
