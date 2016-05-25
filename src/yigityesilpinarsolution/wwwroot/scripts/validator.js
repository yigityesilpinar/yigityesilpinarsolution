define("validator", function (require, exports, module) {
    var toastr = require('toastr');
    var ValidateCompare = function (fund, rate, numbers) {

        if (!parseFloat(fund) || parseFloat(fund) < 0) {
            toastr.warning("Please provide a valid number for Principal Amount", 'Incorrect Principal Amount!');
            return false;
        }
        $('#investmentFund').val(parseFloat(fund));

        if (!parseFloat(rate) || parseFloat(rate) >= 2 || parseFloat(rate) < 0) {
            toastr.warning("Please proivde a valid rate value (shoul be less than 2%)", 'Incorrect Interest Rate!');
            return false;
        }
        $('#interestRate').val(parseFloat(rate));

        if (typeof numbers[0] === 'undefined' || numbers.length<2) {
            toastr.warning("There are no records for this period, please change the dates", 'No Data for Dates!');
            return false;
        }

        return true;
    }

    var ValidateHome = function (numbers) {
        if (typeof numbers[0] === 'undefined') {
            toastr.warning("There are no records for this period, please change the dates", 'No Data for Dates!');
            return false;
        }
        return true;
    }

    var ShowWarning = function (msg, title) {
        toastr.warning(msg, title);
    }
    var ShowInfo = function (msg, title) {
        toastr.info(msg, title);
    }
    return {
        ValidateCompare: ValidateCompare,
        ValidateHome: ValidateHome,
        ShowInfo: ShowInfo,
        ShowWarning: ShowWarning
    }
})