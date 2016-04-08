var app = angular.module('angularApp', []);

app.controller('Controller', function($scope, $http) {
  $http.get("https://assignment-1-jmarasco94.c9users.io/Births").then(function (response) {
    //Go back to this stuff//
      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(function() {
          formatDataTable (response.data);
      });
  });
});

//Formatting//
 function formatDataTable(chartdata) {
     var data= [];
     var header = ['Births', 'State'];
     data.push(header);
     
     for (var i=0; i<chartdata.length;i++) {
         var temp = [];
         temp.push(chartdata[i]._STATE);
         temp.push(chartdata[i].BIRTHS);
         data.push(temp);
     }
     
     var g_data= google.visualization.arrayToDataTable(data);
     var chart= new google.visualization.ScatterChart(document.getElementById('chart_div'));
     chart.draw(g_data, getOptions());
     
     function getOptions ()
     {
         var options = {
             title: 'Number of Births by State in 2014',
             chatArea: {width: '50%'},
             hAxis: {
                 title: 'States',
    minvalue: 0
             },
             vAxis: {
                 title: 'Number of Births',
             },
         };
         return options;
     }
 }
     
 