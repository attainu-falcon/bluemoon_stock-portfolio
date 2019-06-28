$(document).ready(function(){
  alert("portfoio page is loaded");
    $("#newportfolio").click(function() {
      var folioheader = '<div class="row"><div class="col"><div class=" card0">';
      folioheader+= '<div class="card-body"><h5 class="card-title">'+folioname.value;
      folioheader+= '</h5><p class="card-text"><table class="table table-hover">';
      folioheader+= '<thead><tr><th scope="col">#</th><th scope="col">Scrip</th>';
      folioheader+= '<th scope="col">Buy Price</th><th scope="col">Current Price</th>';
      folioheader+= '</tr></thead></table></p></div></div></div></div>';

      $('body').append(folioheader);
      var addscrip = '<button type="button" class="btn btn-primary btn-sm">Add Scrip ...</button>';
      $('table').append(addscrip);
    });
  });
