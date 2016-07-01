var todoListApp = angular.module("todoList", ['ngRoute', 'LocalStorageModule', 'daterangepicker', 'yaru22.angular-timeago', 'ui.calendar']);

todoListApp.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('todoListApp')
        .setStorageType('localStorage')
        .setNotify(true, true)
});
