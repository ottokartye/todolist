todoListApp.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
         when('/dashboard', {
            templateUrl: 'partials/dashboard.html'
        }).
        when('/calendar', {
            templateUrl: 'partials/calendar.html'
        }).
        when('/tasks', {
            templateUrl: 'partials/task-list-details.html'
        }).
        otherwise({
            redirectTo: '/dashboard'
        });
  }]);
