$.ajax({    //start ajax5  : for LIVE GLOBAL MARKET INDICES
    url: "global_indx_list.json", // later to be replaced with /globalindex in Mongo
    datatype: "json",
    success: function(global_indx_data) {

    // console.log(global_indx_data.length);
    var m = 0;
    for (var n = 0; n<global_indx_data.length; n++) {
      var targetAPI = "https://api.worldtradingdata.com/api/v1/stock?symbol="+global_indx_data[n].symbol+"&api_token=iZXB3r7cjjT7xUufJT8HOvJyupusBji4pPYDZQB9OMY0g7XnjmlmqX7Vn0yE"
      console.log(n);
      console.log(targetAPI);
      $.ajax({    //start ajax6
        url: targetAPI,
        datatype: "json",
        success: function(globalIndxOut) {
          console.log(globalIndxOut);
          console.log(globalIndxOut.data[0]["name"] + "       " + globalIndxOut.data[0]["price"]);
          $("#GlobalIndex li.list-group-item").eq(m).text(globalIndxOut.data[0]["name"] + "      -       " + globalIndxOut.data[0]["price"]);
          m++;
          // }
        }
      });    //end ajax6
    }
  }
});  //end ajax5
}, 60100));

