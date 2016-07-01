var tasks = [
    {
        id: 1,
        title: "Buy flowers",
        description: "Look for some nice flowers for Jill",
        status: 2,
        project_id: 2,
        dates: {
            startDate: "2016-05-01",
            endDate: "2016-05-01"
        }
    },
    {
        id: 2,
        title: "Create website",
        description: "Buy the layout and install Wordpress on the hosting",
        status: 1,
        project_id: 1,
        dates: {
            startDate: "2016-05-02",
            endDate: "2016-05-03"
        }
    },
    {
        id: 3,
        title: "Update website",
        description: "Install missing plugins and update string translations",
        status: 3,
        project_id: 1,
        dates: {
            startDate: "2016-05-03",
            endDate: "2016-05-04"
        }
    },
    {
        id: 4,
        title: "Check database",
        description: "Create database for the website",
        status: 1,
        project_id: 1,
        dates: {
            startDate: "2016-05-04",
            endDate: "2016-05-05"
        }
    },
    {
        id: 5,
        title: "Clean garage",
        description: "Test website for flaws",
        status: 1,
        project_id: 2,
        dates: {
            startDate: "2016-05-05",
            endDate: "2016-05-06"
        }
    },
];

var projects = [
    {
        id: 1,
        title: "Website",
        description: "Website project containing all the tasks for the website",
        project_type_id: 1
    },
    {
        id: 2,
        title: "Personal errands",
        description: "Some personal stuff to do",
        project_type_id: 2
    }
];

var statuses = [
    { id: 1, title: "Open", color: "text-danger"},
    { id: 2, title: "In progress", color: "text-warning"},
    { id: 3, title: "Finished", color: "text-success"}
];

var projectTypes = [
    { id: 1, description: "Default project"},
    { id: 2, description: "Lesson"}
];