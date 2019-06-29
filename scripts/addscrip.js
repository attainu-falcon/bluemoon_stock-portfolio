$(document).ready(function(){
  var modalForm = '<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
  modalForm += '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header">';
  modalForm += '<h5 class="modal-title" id="exampleModalLabel">Scrip Details to Buy</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close">';
  modalForm += '<span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="input-group mb-3">';
  modalForm += '<div class="input-group-prepend"><label class="input-group-text" for="inputGroupSelect01">Options</label>';
  modalForm += '</div></div><div class="input-group mb-3"><div class="input-group-prepend">';
  modalForm += '<span class="input-group-text" id="inputGroup-sizing-default">Quantity</span>';
  modalForm += '</div><input type="number" class="form-control" aria-label="Sizing example input" size="4" aria-describedby="inputGroup-sizing-default"></div>';
  modalForm += '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>';
  modalForm += '<button type="button" class="btn btn-primary">Buy</button></div></div></div></div>';
  $('body').append(modalForm);
  $.ajax({
    url: "../dbfolder/Scrip_Codes_global.json",
    datatype: "json",
    success: function(stock_symbol){
      var scrip_list = '<select class="custom-select" id="inputGroupSelect01"><option selected>Choose...</option>';
      for (var key in stock_symbol) {
        scrip_list += '<option value='+key+'>, '+stock_symbol[key]+'</option>';
      }
      scrip_list += '</select>';
      console.log(scrip_list);
      $("#inputGroupSelect01").append(scrip_list);
        }
      });
    });






//var target_scrip = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + data + "&apikey=PUQRIVP3LNMBSDKV";







//'<form action="/addscrip" method="get">scrip_list<input type="submit" value="Submit"></form>
