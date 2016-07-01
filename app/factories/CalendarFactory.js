todoListApp.factory('CalendarFactory', function () {
    var methodsCollection = {};

    methodsCollection.getEventsObject = function (tasks) {
        var events = [];

        $.each(tasks, function (index) {
            if (typeof tasks[index].dates != "undefined") {
                if (tasks[index].dates.startDate != null) {
                    events.push({
                        title: tasks[index].title + " (" + moment(tasks[index].dates.endDate).fromNow() + ")",
                        start: tasks[index].dates.startDate,
                        end: tasks[index].dates.endDate,
                        className: (tasks[index].done)? "fc-event-success" : "fc-event-danger"
                    });
                }
            }
        });

        var calendarConfig = {
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true,
            events: events,
            viewRender: function (view) {
                // If monthpicker has been init update its date on change
                if (Picker.hasClass('hasMonthpicker')) {
                    var selectedDate = Calendar.fullCalendar('getDate');
                    var formatted = moment(selectedDate, 'MM-DD-YYYY').format('MM/YY');
                    Picker.monthpicker("setDate", formatted);
                }
                // Update mini calendar title
                var titleContainer = $('.fc-title-clone');
                if (!titleContainer.length) {
                    return;
                }
                titleContainer.html(view.title);
            },
            droppable: true, // this allows things to be dropped onto the calendar
            drop: function () {
                // is the "remove after drop" checkbox checked?
                if (!$(this).hasClass('event-recurring')) {
                    $(this).remove();
                }
            },
            eventRender: function (event, element) {
                // create event tooltip using bootstrap tooltips
                $(element).attr("data-original-title", event.title);
                $(element).tooltip({
                    container: 'body',
                    delay: {
                        "show": 100,
                        "hide": 200
                    }
                });
                // create a tooltip auto close timer  
                $(element).on('show.bs.tooltip', function () {
                    var autoClose = setTimeout(function () {
                        $('.tooltip').fadeOut();
                    }, 3500);
                });
            }
        };
        return calendarConfig;
    };

    return methodsCollection;
});