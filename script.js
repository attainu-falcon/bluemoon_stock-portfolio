
  $(document).ready(function () {
  
   
    $.ajax({
      'url':'/getfolio',
      'type':'get',
      'datatype':'json',
      success:function(userfoliolist){
        
        console.log(userfoliolist);
        for (var i = 0; i<userfoliolist.length; i++) {
  
         
          var company = userfoliolist[i].scripbought;
          buyprice = userfoliolist[i].buy_price;
          $.ajax({
            url: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+company+"&apikey=PUQRIVP3LNMBSDKV",
            datatype: "json",
            success: function(scripdata){
              currentprice = scripdata["Global Quote"]["05. price"];
            
    
  
      
          for(var j=0;j<userfoliolist[i].companies.length;j++)
          {
                console.log(userfoliolist[i].companies[j].scripbought);
                console.log(userfoliolist[i].companies[j].buy_price);


                var buyprice = userfoliolist[i].companies[j].buy_price;
                var qty = userfoliolist[i].companies[j].qty;
                var profit = currentprice - buyprice;
              var grossProfit = profit / buyprice * 100;
              var grossMargin = 100 * (currentprice - buyprice) / currentprice;
              $('.grossProfit').val(grossProfit.toFixed(2));
              $('.grossMargin').val(grossMargin.toFixed(2));
              $('.profit').val(profit);
              portsummary += '<tr>';
              portsummary  +=  '<td class="col-xs-2">'+userfoliofolio[i].companies[j].scrip+'</td>';
              portsummary  +=  '<td class="col-xs-2">'+totalportfolio[i].companies[j].buy_price+'</td>';
              portsummary  +=  '<td class="col-xs-2">'+totalportfolio[i].companies[j].current_price+'</td>';
              portsummary  +=  '<td class="col-xs-2">'+totalportfolio[i].companies[j].qty+'</td>';
              
              portsummary +=  '<td class="col-xs-2">'+profit+'</td>';
              portsummary  +=  '<td class="col-xs-2">'+grossProfit+'</td>';
              portsummary  +=  '<td class="col-xs-2">'+grossMargin+'</td>';
             
             
              
          }
          portsummary += '</tbody></table></div>';
         
          $("#summaryTable").append(sum_tab_row); 
        }
       
      }
    
  
        
  