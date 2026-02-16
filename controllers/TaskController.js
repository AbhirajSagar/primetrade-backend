import 
{ 
    GetAllTasks as GetAllTasksService, 
    GetTaskById as GetTaskByIdService,
    CreateTask as CreateTaskService,
    UpdateTask as UpdateTaskService,
    DeleteTask as DeleteTaskService
} 
from "../services/TaskService.js";

export async function ListAllTasks(req, res)
{
    const {id, role} = await req.user;

    try
    {
        const Tasks = await GetAllTasksService(id, role);
        return res.json(Tasks);
    }
    catch(err)
    {
        console.error('Error while listing all tasks', err);
        return res.json(err);
    }
}

export async function GetTaskById(req, res)
{
    const {id} = await req.params;
    if(!id) return res.status(400).json({message: 'Id is required'});

    try
    {
        const Task = await GetTaskByIdService(id);
        return res.json(Task);
    }
    catch(err)
    {
        console.error('Error while fetching task by id', err);
        return res.json(err);
    }
}

export async function CreateTask(req, res)
{
    console.log(req.user);
    const {id} = req.user;
    const {title, description} = await req.body;
    if(!title) return res.status(400).json({message: 'Title is required'});
    if(!description) return res.status(400).json({message: 'Description is required'});

    try
    {
        const Task = await CreateTaskService({title, description, id});
        return res.json(Task);
    }
    catch(err)
    {
        console.error('Error while creating task', err);
        return res.json(err);
    }
}

export async function UpdateTask(req, res)
{   
    const {id} = await req.params;
    if(!id) return res.status(400).json({message: 'Id is required'});

    const {title, description, status} = await req.body;
    if(!title && !description && !status) return res.status(400).json({message: 'One field is required to update'});

    try
    {
        const Task = await UpdateTaskService({id, title, description, status});
        return res.json(Task);
    }
    catch(err)
    {
        console.error('Error while updating task', err);
        return res.json(err);
    }
}   

export async function DeleteTaskById(req, res)
{
    const {id} = await req.params;
    if(!id) return res.status(400).json({message: 'Id is required'});

    try
    {
        const Task = await DeleteTaskService(id);
        return res.json(Task);
    }
    catch(err)
    {
        console.error('Error while trying to delete task', err);
        return res.json(err);
    }
}