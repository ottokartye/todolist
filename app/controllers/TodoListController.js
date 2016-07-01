todoListApp.controller("TodoListController", function ($scope, LocalStorageFactory, CalendarFactory, TaskFactory) {
    // Checks if the browser support the current storage type and setting up storage    
    $scope.bodyClass = "";
    LocalStorageFactory.setupStorage($scope);
    $scope.completionPercentage = 0;
    $scope.newTask = undefined;
    $scope.filterByProjectId = [];
    $scope.eventSources = CalendarFactory.getEventsObject($scope.tasks);
    $scope.currentProject = $scope.projects[0];
    $scope.storageSpaceUsagePercentage = LocalStorageFactory.checkStorageSpace();
    $scope.testProjects = [
        {
            name: "First project",
            ticked: false
        },
        {
            name: "Second project",
            ticked: false
        },
        {
            name: "Third project",
            ticked: false
        }
    ];

    $scope.getTasksByStatusAndProjectId = function (status, projectId) {
        return TaskFactory.getTasksByStatusAndProjectId($scope.tasks, status, projectId);
    };

    $scope.getProjectTypeDescription = function (typeId) {
        return TaskFactory.getProjectTypeDescription($scope.projectTypes, typeId);
    };

    $scope.$on('taskStateChanged', function (event, data) {
        $scope.$apply(function () {
            $scope.getTasksCompletionPercentage();
            //$scope.eventSources = CalendarFactory.getEventsObject($scope.tasks);
        });
    });

    $scope.updateTaskStatus = function (index) {
        if ($scope.tasks[index].status === 3) {
            $scope.tasks[index].status = 1;
            $scope.tasks[index].dates.finishedDate = undefined;
        } else {
            $scope.tasks[index].status = 3;
            $scope.tasks[index].dates.finishedDate = Date.now();
        }

        $scope.$broadcast('taskStateChanged', {
            id: $scope.tasks[index].id,
            title: $scope.tasks[index].title,
            state: $scope.tasks[index].done
        });

        LocalStorageFactory.updateStorage('tasks', $scope.tasks);
        $scope.eventSources = CalendarFactory.getEventsObject($scope.tasks);
    };

    $scope.getTasksCompletionPercentage = function (status, projectId) {
        $scope.completionPercentage = TaskFactory.getTasksCompletionPercentage($scope.tasks, status, projectId);
        return $scope.completionPercentage;
    };

    $scope.test = function (projectId) {
        console.log(projectId);
        return 10;
    };

    $scope.getCompletedTasksCount = function (projectId) {
        var completedTasks = 0;

        $.each($scope.tasks, function (index) {

            if ($scope.tasks[index].status === 3) {
                if (projectId == undefined) {
                    completedTasks += 1;
                } else if ($scope.tasks[index].project_id === projectId) {
                    completedTasks += 1;
                }

            }
        });

        return completedTasks;
    };

    $scope.getOpenTasksCount = function (projectId) {
        var completedTasks = 0;

        $.each($scope.tasks, function (index) {

            if ($scope.tasks[index].status === 1) {
                if (projectId == undefined) {
                    completedTasks += 1;
                } else if ($scope.tasks[index].project_id === projectId) {
                    completedTasks += 1;
                }

            }
        });

        return completedTasks;
    };

    $scope.openTaskWizard = function (taskId) {
        if (taskId != null) {
            $.each($scope.tasks, function (index) {
                if ($scope.tasks[index].id === taskId) {
                    $scope.newTask = $scope.tasks[index];
                    return;
                }
            });
        } else {
            $scope.newTask = {
                id: 0,
                title: "",
                description: "",
                dates: {
                    startDate: null,
                    endDate: null
                }
            };
        }
        return false;
    };

    $scope.openWizard = function () {
        angular.element(document.querySelector('#taskWizardModal')).modal("show");
    };

    $scope.saveTask = function (taskId) {
        console.log("Saving task. TaskId passed is " + taskId);
        if (taskId === 0) {
            $scope.newTask.status = 1;
            $scope.newTask.id = $scope.tasks.length + 1;
            $scope.tasks.push($scope.newTask);
        } else {
            var task = $scope.getTaskById(taskId);
            task = $scope.newTask;
        }
        console.log($scope.newTask);
        // Cleam temp task container
        $scope.newTask = undefined;
        // Update local storage
        LocalStorageFactory.updateStorage('tasks', $scope.tasks);
        // Update storage usage
        $scope.storageSpaceUsagePercentage = LocalStorageFactory.checkStorageSpace();
        // Update calendar
        $scope.eventSources = CalendarFactory.getEventsObject($scope.tasks);
    };

    $scope.startTask = function (taskId) {
        var task = $scope.getTaskById(taskId);
        task.status = 2;
        LocalStorageFactory.updateStorage("tasks", $scope.tasks);
    };

    $scope.processTask = function (taskId) {
        $scope.currentTask = $scope.getTaskById(taskId);
    };

    $scope.cancelTask = function () {
        $scope.newTask = undefined;
        $scope.currentTask = undefined;
        // Overcome design bug
        angular.element(document.querySelector('#body')).css("padding-right", 0);
    };

    $scope.getTasksForProjectId = function (projectId) {
        var numberOfTasks = 0;
        $.each($scope.tasks, function (index) {
            if ($scope.tasks[index].project_id === projectId)
                numberOfTasks += 1;
        });
        return numberOfTasks;
    };

    $scope.getProjectTasks = function (projectId) {
        var numberOfTasks = 0;
        $.each($scope.tasks, function (index) {
            if (projectId != "") {
                if ($scope.tasks[index].project_id == projectId) {
                    numberOfTasks += 1;
                }
            } else {
                numberOfTasks += 1;
            }
        });

        return numberOfTasks;
    };

    $scope.getAllTasks = function () {
        var allTasks = [];
        $.each($scope.tasks, function (index) {
            if ($scope.filterByProjectId.length != 0) {
                var i = $scope.filterByProjectId.indexOf($scope.tasks[index].project_id);
                if (i !== -1) {
                    allTasks.push($scope.tasks[index]);
                }
            } else {
                allTasks.push($scope.tasks[index]);
            }
        });
        return allTasks;
    };

    $scope.getTaskById = function (taskId) {
        var task = {};
        $.each($scope.tasks, function (index) {
            if ($scope.tasks[index].id === taskId) {
                task = $scope.tasks[index];
                return;
            }
        });

        return task;
    };

    $scope.getTasksByStatus = function (status) {
        var foundTasks = [];
        $.each($scope.tasks, function (index) {
            if ($scope.filterByProjectId.length != 0) {
                var i = $scope.filterByProjectId.indexOf($scope.tasks[index].project_id);
                if (i !== -1) {
                    if (status != null) {
                        if ($scope.tasks[index].status === status) {
                            foundTasks.push($scope.tasks[index]);
                        }
                    } else {
                        foundTasks.push($scope.tasks[index]);
                    }
                }
            } else {
                if (status != null) {
                    if ($scope.tasks[index].status === status) {
                        foundTasks.push($scope.tasks[index]);
                    }
                } else {
                    foundTasks.push($scope.tasks[index]);
                }

            }
        });
        return foundTasks;
    };

    $scope.getProjectTitle = function (projectId) {
        var projectTitle = "not found";
        $.each($scope.projects, function (index) {
            if ($scope.projects[index].id == projectId) {
                projectTitle = $scope.projects[index].title;
            }
        });
        return projectTitle;
    };

    $scope.changeProjectFilter = function (projectId) {
        // Add it to collection if not inside
        var index = $scope.filterByProjectId.indexOf(projectId);
        if (index !== -1) {
            $scope.filterByProjectId.splice(index, 1);
        } else {
            $scope.filterByProjectId.push(projectId);
        }
        //console.log($scope.filterByProjectId);

    };

    $scope.clearStorage = function () {
        LocalStorageFactory.clearStorage($scope);
    };

    $scope.deleteTask = function (taskId) {
        // Delete task from collection
        var obj = $scope.tasks.filter(function (obj) {
            return obj.id === taskId;
        })[0];

        var index = $scope.tasks.indexOf(obj);
        if (index !== -1) {
            $scope.tasks.splice(index, 1);
            LocalStorageFactory.updateStorage("tasks", $scope.tasks);
            return true;
        } else {
            return false;
        }
    };

    $scope.isProjectSelected = function (projectId) {
        return $scope.filterByProjectId.indexOf(projectId) !== -1;
    };
});
