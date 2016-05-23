define("viewModel", function (require, exports, module) {

    var validator = require('validator');
    var app = new App();
    var chart;
    var graphWithDate = require('graphWithDate');
    var tableWithDate = require('tableWithDate');

    if (!app.compareMode) {
        tableWithDate.Draw(app.dates, app.numbers)
        chart = graphWithDate.Draw(app.dates, app.numbers);
    }

    $('input[name="graphSwitch"]').on('switchChange.bootstrapSwitch', function (event, state) {
        //var self = $(this);
        // $("#btnCheckStock").trigger("click");
        var text = $('#labelSwitch').text();
        $('#labelSwitch').text(
            text == "Graph Mode" ? "Table Mode" : "Graph Mode");
        $('#tableContainer').toggle(1000, function () {
            $('#chartContainer').toggle(1000, function () {
                if(chart)
                chart.render();
            });

        });

    }); // input switch event

    $('#btnCheckStock').on('click', function (event, state) {
        
        // string 05/21/2016 12:00 AM
        var fromDate = $('#fromDate').val();
        var toDate = $('#toDate').val();
        if (fromDate && toDate) {      
         
            app.restrictDates(fromDate, toDate);
            if (!app.compareMode) {  // for Home Controller 
                if (!validator.ValidateHome(app.numbers))
                    return;
                chart = graphWithDate.Draw(app.dates, app.numbers);
                tableWithDate.Draw(app.dates, app.numbers);
                validator.ShowInfo("On Chart Mode you can ZOOM and Drag by using Mouse!",'Zoom into Chart')
            }
            else { // for Compare Controller
                var investmentFund = $('#investmentFund').val();
                var interestRate = $('#interestRate').val();
                if (investmentFund && interestRate) {
                    if (!validator.ValidateCompare(investmentFund, interestRate,app.numbers))
                        return;
                    chart = graphWithDate.DrawCompare(app.dates, app.numbers, investmentFund, interestRate);
                    tableWithDate.DrawCompare(app.dates, app.numbers, investmentFund, interestRate);
                }
                else {
                    var message = interestRate ? 'investmentFund is missing' : 'interestRate is missing';                 
                    validator.ShowWarning(message,'Title');
                }
            }

        }
        else {
            var message = fromDate ? 'to is missing' : 'from is missing';
            validator.ShowWarning(message, 'Title');

        }
    }); // btnCheckStock click event


})