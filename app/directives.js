todoListApp.directive('checkTask', function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            // Determine initial checked boxes
            var index = scope.tasks.indexOf(scope.task);
            if (scope.tasks[index].status === 3) {
                elem[0].checked = true;
            }

            // Update array on click
            elem.bind('click', function () {
                var index = scope.tasks.indexOf(scope.task);
                //console.log("Clicked task index is " + index);
                // Add if checked
                scope.updateTaskStatus(index);

            });
        }
    }
}).directive('getNumberOfTasks', function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            elem[0].innerHTML = scope.getProjectTasks(attrs.id);

            scope.$watch('tasks', function (newValue, oldValue) {
                if (newValue)
                    elem[0].innerHTML = scope.getProjectTasks(attrs.id);

            }, true);
        }
    }
}).directive('getTotalTasks', function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            elem[0].innerHTML = scope.tasks.length

            scope.$watch('tasks', function (newValue, oldValue) {
                if (newValue)
                    elem[0].innerHTML = scope.tasks.length;

            }, true);
        }
    }
}).directive('getProjectTitle', function () {
    return {
        restrict: "A",
        link: function (scope, elem, attrs) {
            elem[0].innerHTML = scope.getProjectTitle(attrs.id);

            scope.$watch('projects', function (newValue, oldValue) {
                if (newValue)
                    elem[0].innerHTML = scope.getProjectTitle(attrs.id);

            }, true);
        }
    }
}).directive('onLastRepeat', function () {
    return function (scope, element, attrs) {
        console.log("onLastRepeat directive called");
        if (scope.$last) {
            var scriptElement = angular.element(document.querySelector("#" + attrs.scriptid));
            if (scriptElement.length > 0) {
                console.log("Deleting " + attrs.scriptid + " from DOM");
                scriptElement.remove();
            };
            angular.element(document.querySelector("#main")).parent().append("<script id='" + attrs.scriptid + "'> " + attrs.run + "</script>");
        }
    }
}).directive('runScript', function () {
    return function (scope, element, attrs) {
        angular.element(document.querySelector("#main")).parent().append("<script id='" + attrs.scriptid + "'> " + attrs.run + "</script>");
    }
}).directive('initFootable', function () {
    return function (scope, element) {
        var footableTable = element.parents('table');

        scope.$evalAsync(function () {

            if (!footableTable.hasClass('footable-loaded')) {
                footableTable.footable();
            }

            footableTable.trigger('footable_initialized');
            footableTable.trigger('footable_resize');
            footableTable.data('footable').redraw();

        });
    };
});
