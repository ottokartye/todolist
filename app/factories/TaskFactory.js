todoListApp.factory('TaskFactory', function() {
    var methodsCollection = {};
    
    methodsCollection.getTasksByProjectId = function (tasks, projectId) {
        var retTasks = [];
        $.each(tasks, function(index) {
            if (tasks[index].project_id == projectId) {
                retTasks.push(tasks[index]);
            }
        });
        return retTasks;
    };
    
    methodsCollection.getTasksByStatus = function (tasks, status) {
        var retTasks = [];
        $.each(tasks, function(index) {
            if (tasks[index].status == status) {
                retTasks.push(tasks[index]);
            }
        });
        return retTasks;
    };
    
    methodsCollection.getTasksByStatusAndProjectId = function (tasks, status, projectId) {
        // Filter by projectId if it's the case
        if (projectId != null) {
            tasks = methodsCollection.getTasksByProjectId(tasks, projectId);
        }
        // Filter by status if it's the case
        if (status != null) {
            tasks = methodsCollection.getTasksByStatus(tasks, status);
        }        
        
        return tasks;
    };
    
    methodsCollection.getProjectTypeDescription = function (types, typeId) {
        var typeDescription = "";
        $.each(types, function(index) {
            if (types[index].id === typeId) {
                typeDescription = types[index].description;
            }
        });
        return typeDescription;
    };
    
    methodsCollection.getTasksCompletionPercentage = function (tasks, status, projectId) {
        var completedTasks = methodsCollection.getTasksByStatusAndProjectId(tasks, status, projectId).length;
        var totalTasks = methodsCollection.getTasksByStatusAndProjectId(tasks, null, projectId).length;
        var completionPercentage = completedTasks * 100 / totalTasks;
        return completionPercentage;
    }
    
    return methodsCollection;
});