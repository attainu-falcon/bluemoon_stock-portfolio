$(document).ready(function () {
  var buyprice, profit, grossMargin, currentprice, grossProfit;
  $.ajax({
    url: "/getfolio",
    type: "GET",
    datatype: "json",
    success: function(userfoliolist){
      console.log(userfoliolist);
      for (var i = 0; i<userfoliolist.length; i++) {
        var company = userfoliolist[i].scripbought;
        buyprice = userfoliolist[i].buy_price;
        $.ajax({
          url: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+company+"&apikey=PUQRIVP3LNMBSDKV",
          datatype: "json",
          success: function(scripdata){
            currentprice = scripdata["Global Quote"]["05. price"];
          }});
          if (currentprice>0 && buyprice>0) {
              profit      = currentprice - buyprice;
              grossProfit = profit / buyprice * 100;
              grossMargin = 100 * (currentprice - buyprice) / currentprice;
              $('.grossProfit').val(grossProfit.toFixed(2));
              $('.grossMargin').val(grossMargin.toFixed(2));
              $('.profit').val(profit);
          }
          var sum_tab_row = '<tr><td>'+company+'</td><td>'+buyprice+'</td><td>'+currentprice+'</td><td>'+grossProfit+'</td><td>'+grossMargin+'</td></tr>';
          $("#summaryTable").append(sum_tab_row);
        }
      }
    });
  });
