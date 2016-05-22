define("viewModel", function (require, exports, module) {

    var app = new App();

    var graphWithDate = require('graphWithDate');
    var tableWithDate = require('tableWithDate');
    if (!app.compareMode) {
        tableWithDate.Draw(app.dates, app.numbers)
        graphWithDate.Draw(app.dates, app.numbers);
    }


    $('input[name="graphSwitch"]').on('switchChange.bootstrapSwitch', function (event, state) {
        //var self = $(this);
        // $("#btnCheckStock").trigger("click");
        var text = $('#labelSwitch').text();
        $('#labelSwitch').text(
            text == "Graph Mode" ? "Table Mode" : "Graph Mode");
        $('#tableContainer').toggle(1000, function () {
            $('#chartContainer').toggle(1000, function () {

            });

        });

    }); // input switch event

    $('#btnCheckStock').on('click', function (event, state) {
   
        // string 05/21/2016 12:00 AM
        var fromDate = $('#fromDate').val();
        var toDate = $('#toDate').val();
        if (fromDate && toDate) {
            // Send without time (12:00 AM)
            app.restrictDates(fromDate, toDate);
            if (!app.compareMode) {
                graphWithDate.Draw(app.dates, app.numbers);
                tableWithDate.Draw(app.dates, app.numbers);
            }
            else {
                var investmentFund = $('#investmentFund').val();
                var interestRate = $('#interestRate').val();
                if (investmentFund && interestRate) {
                    graphWithDate.DrawCompare(app.dates, app.numbers, investmentFund, interestRate);
                    tableWithDate.DrawCompare(app.dates, app.numbers, investmentFund, interestRate);
                }
                else {
                    var message = interestRate ? 'investmentFund is missing' : 'interestRate is missing';
                    console.log(message);
                }
            }

        }
        else {
            var message = fromDate ? 'to is missing' : 'from is missing';
            console.log(message);

        }
    }); // btnCheckStock click event


})