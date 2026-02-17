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

export async function   CreateTask({ title, description, user_id })
{
    const task = new Task({ title, description, user: user_id });
    await task.save();

    return new CreateTaskResponse(task);
}

export async function GetAllTasks(user_id, role)
{
    const tasks = role === 'admin' ? await Task.find({}).populate('user', 'name role') : await Task.find({ user: user_id });
    return new GetAllTasksResponse(tasks, role);
}

export async function GetTaskById(task_id, user_id, role)
{
    const task = await Task.findById(task_id);
    if(!task) throw new Error('Task not found');
    if(task.user.toString() !== user_id && role !== 'admin')
        throw new Error('Unauthorized to access the task');

    return new GetTasksByIdResponse(task);
}

export async function UpdateTask({ id, user_id, role, ...fields })
{
    const task = await Task.findById(id);
    if(!task) throw new Error('Task not found');

    if(task.user.toString() !== user_id && role !== 'admin') 
        throw new Error('Unauthorized to update the task');

    Object.assign(task, fields);
    await task.save();

    return new UpdateTaskResponse(task);
}

export async function DeleteTask({ id, user_id, role })
{
    const task = await Task.findByIdAndDelete(id);
    if(!task) throw new Error('Task not found');

    if(task.user.toString() !== user_id && role !== 'admin') 
        throw new Error('Unauthorized to delete the task');

    await Task.findByIdAndDelete(id);
    return new DeleteTaskResponse(task);
}