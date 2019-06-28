$(document).ready(setInterval(function() {
  var list_of_stocks = [];
  var i, arg;
  $.ajax({  //start ajax1 for live 3 stock prices at random every minute() - LIVE STOCK UPDATES
    url: "Scrip_Codes_global.json", // later to be replaced with /companyMasterData
    datatype: "json",
    success: function(scripsymbdata) {
      var j = 0;
      for (i = 0; i < 3; i++) {
        var data = scripsymbdata[Math.floor(Math.random() * 100)].symb;
        arg = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + data + "&apikey=RYLSU4235GZEDB77";
        $.ajax({  //start ajax2
          url: arg,
          datatype: "json",
          success: function(arg) {
            for (var prop in arg) {
              for (var k = 0; k < scripsymbdata.length; k++) {
                if (arg[prop]["01. symbol"] === scripsymbdata[k].symb) {
                  $("#LiveStocks .list-group-item").eq(j).text(scripsymbdata[k].company + "    $" + arg[prop]["05. price"]);
                }
              }
              j++;
            }
          }
        });  //end ajax2
      }
    }
  }); //end ajax1
  $.ajax({  //start ajax3  : for LIVE INDIAN MARKET INDICES
      url: "mkt_indx_list.json", // later to be replaced with /marketindex
      datatype: "json",
      success: function(mkt_indx_data) {

      // console.log(mkt_indx_data.length);
      var q = 0;
      for (var p = 0; p < mkt_indx_data.length; p++) {
        var targetAPI = "https://api.worldtradingdata.com/api/v1/stock?symbol=" + mkt_indx_data[p].symbol + "&api_token=oM44Ev1u7yrV9pVQ4eVFpfyQJfazeZdvZbB5sMTEhagF37CaBBgWPEvoAtZG";
        console.log(p);
        console.log(targetAPI);
        $.ajax({  //start ajax4
          url: targetAPI,
          datatype: "json",
          success: function(mktIndxOut) {
            console.log(mktIndxOut);
            console.log(mktIndxOut.data[0]["name"] + "       " + mktIndxOut.data[0]["price"]);
            $("#MarketIndex li.list-group-item").eq(q).text(mktIndxOut.data[0]["name"] + "       " + mktIndxOut.data[0]["price"]);
            q++;
            // }
          }
        }); //end ajax4
      }
    }
  });  //end ajax3
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




/*

  BSE Sensex
  API Links with keys:
  https://api.worldtradingdata.com/api/v1/stock?symbol=^SENSEX&api_token=iZXB3r7cjjT7xUufJT8HOvJyupusBji4pPYDZQB9OMY0g7XnjmlmqX7Vn0yE

  ----------------------------------------

  NIFTY50
  API Links:
  https://api.worldtradingdata.com/api/v1/stock?symbol=NIFTY.NS&api_token=iZXB3r7cjjT7xUufJT8HOvJyupusBji4pPYDZQB9OMY0g7XnjmlmqX7Vn0yE

  ----------------------------------------

  NIFTY100
  API Links with keys:
  https://api.worldtradingdata.com/api/v1/stock?symbol=CNX100.NS&api_token=iZXB3r7cjjT7xUufJT8HOvJyupusBji4pPYDZQB9OMY0g7XnjmlmqX7Vn0yE

  ----------------------------------------

  NIFTY500
  API Links with keys:
  https://api.worldtradingdata.com/api/v1/stock?symbol=CNX500.NS&api_token=iZXB3r7cjjT7xUufJT8HOvJyupusBji4pPYDZQB9OMY0g7XnjmlmqX7Vn0yE

*/