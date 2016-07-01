todoListApp.factory('LocalStorageFactory', function (localStorageService) {

    var methodsCollection = {};

    methodsCollection.setupStorage = function ($scope) {
        if (localStorageService.isSupported) {
            // Store models if not stored yet
            if (localStorageService.get('tasks') == null) {
                console.log("Setting up storage space...");
                localStorageService.set('tasks', tasks);
                localStorageService.set('projects', projects);
                localStorageService.set('projectTypes', projectTypes);
                $scope.tasks = tasks;
                $scope.projects = projects;
                $scope.projectTypes = projectTypes;
            } else {
                console.log("Reading tasks from storage...");
                $scope.tasks = localStorageService.get('tasks');
                $scope.projects = localStorageService.get('projects');
                $scope.projectTypes = localStorageService.get('projectTypes');
                //$scope.unbind = localStorageService.bind($scope.tasks, 'allTasks');
            }

        }
    };

    methodsCollection.setLocalStorage = function () {
        // Initialize local storage if not done already
        console.log("Getting storage type: " + localStorageService.getStorageType());
        if (localStorageService.get('tasks') == undefined) {
            console.log('Initializing local storage');
            localStorageService.set('tasks', tasks);
        }
    };

    methodsCollection.updateStorage = function (key, value) {
        localStorageService.set(key, value);
    };

    methodsCollection.checkStorageSpace = function () {
        var free = unescape(encodeURIComponent(JSON.stringify(localStorage))).length * 8;
        return free * 100 / 5000000;
    };

    methodsCollection.clearStorage = function ($scope) {
        localStorageService.clearAll();
        $scope.tasks = {};
        methodsCollection.setupStorage($scope);
    };

    return methodsCollection;

});