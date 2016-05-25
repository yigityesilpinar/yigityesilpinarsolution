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

    $("#interestRate").focus(function () {
        validator.ShowInfo('Daily interest rate should be less than 2%, try 0.01-0.04 for reasonable results','Interest Rate Information');
    });

    $('input[name="graphSwitch"]').on('switchChange.bootstrapSwitch', function (event, state) {

        var text = $('#labelSwitch span').text();
        $('#labelSwitch span').text(
            text == "TABLE" ? "CHART" : "TABLE");
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
                    var message = interestRate ? 'Please provide the Principal Amount' : 'Please provide the Interest Rate';
                    validator.ShowWarning(message,'Principal Amount and/or Interest Rate is missing!');
                }
            }
        }
        else {
            var message = fromDate ? 'Please provide the End-date for the period' : 'Please provide the Start-date for the period';
            validator.ShowWarning(message, 'Date information is missing!');
        }
    }); // btnCheckStock click event
})