todoListApp.filter('checkmark', function () {
    return function (projectId) {
        // Get number of tasks for the current project id
        $scope.getTasksForProjectId(projectId);
        return true;
    };
}).filter('fromNow', function () {
    return function (dateString) {
        return moment(dateString).fromNow();
    };
}).filter('truncate', function () {
    return function (input, length) {
        length = (length)? length : 20; 
        var ret = "";
        if (input.length > length) {
            ret = input.substring(0, length) + "...";
        } else {
            ret = input;
        }
        return ret;
    };
});
