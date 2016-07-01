var fullscreenOn = false;
var tempPath = "";

$(document).ready(function () {
    // Enable fullscreen button
    $('.request-fullscreen').click(function () {
        if (fullscreenOn === false) {
            $('body').fullscreen();
            fullscreenOn = true;
        } else {
            $.fullscreen.exit();
            fullscreenOn = false;
        }
        return false;
    });


    api.alertFacade.insertAlertsIntoMenu();
});

kendo.culture("@Global.KendoCulture");
var modelChanged = false;
var projectGridManager;

function isModelChanged() {
    if (modelChanged) {
        tempPath = event.currentTarget.href;
        event.preventDefault();
        $("#OkButton").bind("click", {
            actionUrl: tempPath
        }, onOk);
        $("#ExitEditConfirmationDialog").modal("show");
    }
}
