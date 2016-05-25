define("graphWithDate", function (require, exports, module) {

    function createChartTwo(data1,data2) {
       var chart= new CanvasJS.Chart("stockChart",
		{

		    title:{
		        text: "Stock vs Deposit",
		        fontSize: 30
		    },
		    animationEnabled: true,
		    axisX:{
		        labelAngle: 30,
		        gridColor: "Silver",
		        tickColor: "silver",
		        valueFormatString: "DD/MM/YYYY"
		    },                        
		    toolTip:{
		        shared:true
		    },
		    theme: "theme2",
		    axisY: {
		        gridColor: "Silver",
		        tickColor: "silver"
		    },
		    legend:{
		        verticalAlign: "center",
		        horizontalAlign: "right"
		    },
		    data: [
			{        
			    type: "line",
			    showInLegend: true,
			    lineThickness: 2,
			    name: "Stock Gain/Loss",
			    markerType: "square",
			    color: "#F08080",
			    dataPoints: data1
			},
			{        
			    type: "line",
			    showInLegend: true,
			    name: "Interest Gain",
			    color: "#20B2AA",
			    lineThickness: 2,
			    dataPoints: data2
			}		
		    ]  ,legend:{
		    cursor:"pointer",
		    itemclick:function(e){
		        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		            e.dataSeries.visible = false;
		        }
		        else{
		            e.dataSeries.visible = true;
		        }
		        chart.render();
		    }
    }
		});
       return chart;
    }


    function createChart(data) {
        return new CanvasJS.Chart("stockChart", {
            zoomEnabled: true,
            title: {
                text: "Stock Price over Period"
            },
            animationEnabled: true,
            axisX: {
                labelAngle: 30
            },

            axisY: {
                includeZero: false
            },

            data: data  

        }); // CanvasJS.Chart

   
    }

    var Draw = function (dates,numbers) {
        // model Coming from Razor View
        var data = [];
        var dataSeries = { type: "line" };
        var dataPoints = [];
        for (var i = 0; i < numbers.length; i += 1) {
            dataPoints.push({
                x: dates[i],
                y: numbers[i]
            });
        }
        dataSeries.dataPoints = dataPoints;
        data.push(dataSeries);


        var chart = createChart(data);
        chart.render();
        return chart;
    }
    var DrawCompare = function (dates, numbers, fund, rate) {
        fund = parseFloat(fund);
        rate = parseFloat(rate / 100);
        var moneyOnDeposit = fund;
        var initalValue = parseFloat(numbers[0]);

        var shares = parseFloat(fund / initalValue);


        var stockDifference = parseFloat((parseFloat(numbers[numbers.length - 1]) - initalValue) * shares);
        var MoneyOnStock = fund + stockDifference;
        var differenceClass = stockDifference < 0 ? 'text-danger' : 'text-success';
        var timeDiff = Math.abs(dates[0].getTime() - dates[dates.length - 1].getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));


        dataStock=[];
        dataDeposit=[];
        var previous= 0;
        for (var i = 1; i < dates.length; i++) {
            dataStock[i] = (numbers[i] - initalValue) * shares;
            dataDeposit[i] = previous + (moneyOnDeposit * rate);
            previous=dataDeposit[i];
            moneyOnDeposit = moneyOnDeposit + moneyOnDeposit * rate
        }
        
      
        var templateResult = `
            <div class ="row">
                <div class="${differenceClass}">Your ${stockDifference > 0 ? 'profit' : 'loss'} by stock ${stockDifference.toFixed(2)} &#163; </div>
                <div class ="text-success">Your profit by Interest: ${(moneyOnDeposit - fund).toFixed(2)}  &#163</div>
            </div>
            <div class="row">
                <div>Your money at the end by Stocks: ${MoneyOnStock.toFixed(2)}</div>
                <div>Your money at the end by Interest: ${moneyOnDeposit.toFixed(2)}</div>
            </div>
            `;
     
        //$('#chartContainer').before(templateResult);
        // model Coming from Razor View
        var data = [];
        var dataSeries = { type: "line" };
        var dataPoints = [];
        for (var i = 0; i < numbers.length; i += 1) {
            dataPoints.push({
                x: dates[i],
                y: dataStock[i]
            });
        }

        var dataPoints2 = [];
        for (var i = 0; i < numbers.length; i += 1) {
            dataPoints2.push({
                x: dates[i],
                y: dataDeposit[i]
            });
        }
        
       
        var chart = createChartTwo(dataPoints, dataPoints2);
        chart.render();
        return chart;
    }
    return {
        Draw: Draw,
        DrawCompare:DrawCompare
    }
})
