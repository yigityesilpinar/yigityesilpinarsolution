define("tableWithDate", function (require, exports, module) {

    var accounting = require('accounting');
    Date.prototype.yyyymmdd = function () {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = this.getDate().toString();
        return (dd[1] ? dd : "0" + dd[0]) + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + yyyy; // padding
    };
    Date.prototype.addDays = function (days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    }
    function fMoney(money) {
        return accounting.formatMoney(money, { symbol: "GBP", format: "%v %s" });
    }

    var templateStart = function (mode, interestTag) {
        return `
            <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>
                            Date dd/mm/yyyy
                        </th>
                        <th>
                            ${mode}
                        </th>
                        ${interestTag}
                    </tr>
                </thead>
                <tbody>
                `;
    }

    var templateEnd = `
            </tbody></table>
            `;

    var Draw = function (dates, numbers) {

        mode = 'Value';
        var templateBody = '';
        var arrow = '';
        var stockClass = 'text-info';
        for (var i = 0; i < dates.length; i++) {
            if (i > 0) {
                var isUp = numbers[i] - numbers[i - 1]>0;
                 stockClass = isUp ? 'text-success' : 'text-danger';
                 arrow = isUp ? '<i class="fa fa-arrow-up" aria-hidden="true"></i>' : '<i class="fa fa-arrow-down" aria-hidden="true"></i>';
            }
            if (numbers[i] - numbers[i - 1] == 0 && i != 0) {
                arrow = '';
                stockClass = 'text-info';
            }
            templateBody += `
               <tr>
               <td>${dates[i].yyyymmdd()}</td>
               <td class ="${stockClass}">${fMoney(numbers[i].toFixed(2))}${arrow}</td>
               </tr>
                `;
        }
        var template = templateStart('Value', '') + templateBody + templateEnd;
        $('#stockTable').html(template);
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
       

        var templateBody = '';

        for (var i = 1; i < dates.length; i++) {
            var isUp = (numbers[i] - initalValue) > 0;
            var stockClass = isUp ? 'text-success' : 'text-danger';
            var arrow = isUp ? '<i class="fa fa-arrow-up" aria-hidden="true"></i>' : '<i class="fa fa-arrow-down" aria-hidden="true"></i>';
            var sign = isUp ? '+' : '';
            if ((numbers[i] - initalValue) == 0) {
                arrow = '';
                stockClass = 'text-info';
            }
            templateBody += `
               <tr>
                  <td>${dates[i].yyyymmdd()}</td>
                  <td class ="${stockClass}">${sign} ${fMoney((numbers[i]-initalValue).toFixed(2))}${arrow}</td>
                  <td class ="text-success">${fMoney((moneyOnDeposit * rate).toFixed(2))}</td>
               </tr>
                `;
            moneyOnDeposit = moneyOnDeposit + moneyOnDeposit * rate
        }

        var templateResult = `
            <div class ="row">
                <div class="${differenceClass}">Your ${stockDifference > 0 ? 'profit' : 'loss'} by stock ${fMoney(stockDifference.toFixed(2))} &#163; </div>
                <div class ="text-success">Your profit by Interest: ${fMoney((moneyOnDeposit - fund).toFixed(2))}  &#163</div>
            </div>
            <div class="row">
                <div>Your money at the end by Stocks: ${fMoney(MoneyOnStock.toFixed(2))}</div>
                <div>Your money at the end by Interest: ${fMoney(moneyOnDeposit.toFixed(2))}</div>
            </div>
            `;
        $('#resultInfo').html(templateResult);
       
        var template = templateStart('Profit/Loss Per Share', '<th>Profit by Deposit</th>') + templateBody + templateEnd;
        $('#stockTable').html(template);
    }
    return {
        Draw: Draw,
        DrawCompare: DrawCompare
    }
})
