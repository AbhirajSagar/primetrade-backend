class TaskResponse
{
    constructor(task) 
    {
        this.task = {};
        this.task.id = task._id;
        this.task.title = task.title;
        this.task.description = task.description;
        this.task.status = task.status;
        this.task.user = task.user;
        this.task.createdAt = task.createdAt;
        this.task.updatedAt = task.updatedAt;
    }
}

export class GetTasksByIdResponse extends TaskResponse 
{
    // Not a typo, intentionally left blank
}

export class CreateTaskResponse extends TaskResponse 
{
    constructor(task) 
    {
        super(task);
        this.message = 'Task created successfully';
    }
}

export class GetAllTasksResponse 
{
    constructor(tasks) 
    {
        this.tasks = tasks.map(task => new TaskResponse(task));
        this.count = tasks.length;
        this.message = `Retrieved ${tasks.length} task${tasks.length == 1 ? '' : 's'}`;
    }
}

export class UpdateTaskResponse extends TaskResponse 
{
    constructor(task)
    {
        super(task);
        this.message = 'Task updated successfully';
    }
}

export class DeleteTaskResponse
{
    constructor(task)
    {
        this.id = task._id;
        this.message = 'Task deleted successfully';
    }
}