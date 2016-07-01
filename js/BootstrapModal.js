function BootstrapModal() {
    this.baseUrl = "";

    this.BootstrapModal = function(baseUrl) {
        console.log("ProjectsGridManager.ProjectsGridManager() called !");
        this.baseUrl = baseUrl;
    },

    this.create = function(title, contentString, contentPartialUrl, buttonText, buttonAction) {
        // Set title
        $("#GeneralBootstrapModal").find(".modal-title").html(title);
        // Set content
        if (contentPartialUrl !== "") {
            this.loadPartial(contentPartialUrl);
        } else {
            $("#GeneralBootstrapModal").find(".modal-body").html(contentString);
        }
        // Set button text
        $("#MainActionButton").html(buttonText);
        // Set button action
        $("#MainActionButton").attr("onclick", buttonAction);
        // Open modal dialog
        $("#GeneralBootstrapModal").modal("show");
    },

    this.loadPartial = function(url) {
        $.ajax({
            method: "GET",
            url: this.baseUrl + url,
            contentType: "text/html",
            dataType: "text"
        }).done(function() {
            $("#GeneralBootstrapModal").find(".modal-body").html(msg);
        });
    }
}