import Task from '../models/Task.js'
import
{ 
    GetAllTasksResponse,
    GetTasksByIdResponse,
    CreateTaskResponse,
    UpdateTaskResponse,
    DeleteTaskResponse
} 
from '../dto/TaskResponses.js';

export async function CreateTask({title, description, id})
{
    const task = new Task({title, description, user: id});
    await task.save();

    const TaskRes = new CreateTaskResponse(task);
    return TaskRes;
}

export async function GetAllTasks(id, role)
{
    const tasks = role == 'admin' ? await Task.find({}).populate('user', 'name role') : await Task.find({user: id});
    const TaskRes = new GetAllTasksResponse(tasks);
    return TaskRes;
}

export async function GetTaskById(id)
{
    const task = await Task.findById(id);
    const TaskRes = new GetTasksByIdResponse(task);
    return TaskRes;
}

export async function UpdateTask({id, ...fields})
{
    const task = await Task.findByIdAndUpdate(id, {...fields}, {returnDocument: 'after'});
    const TaskRes = new UpdateTaskResponse(task)
    return TaskRes;
}

export async function DeleteTask(id)
{
    const task = await Task.findByIdAndDelete(id);
    const TaskRes = new DeleteTaskResponse(task);
    return TaskRes;
}