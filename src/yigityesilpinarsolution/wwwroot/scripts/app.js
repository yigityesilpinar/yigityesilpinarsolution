define("app", function (require, exports, module) {
    var $ = require("jquery");
    var moment = require("moment");
    var datetimepicker = require("datetimepicker");
    var bootstrapSwitch = require("bootstrapSwitch");
    (function ($) {

        $("[name='graphSwitch']").bootstrapSwitch();

        $(function () {
            $('#datetimepicker6').datetimepicker();
            $('#datetimepicker7').datetimepicker({
                useCurrent: false //Important! See issue #1075
            });
            $("#datetimepicker6").on("dp.change", function (e) {
                $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
            });
            $("#datetimepicker7").on("dp.change", function (e) {
                $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
            });
        });
    }(jQuery));
  

   
})