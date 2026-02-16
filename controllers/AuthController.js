import 
{ 
    CreateUser as CreateUserService,
    LoginUser as LoginUserService 
} 
from "../services/UserService.js"; 

export async function LoginUser(req,res)
{
    const {email, password} = await req.body;

    if(!email) return res.status(400).json({message: 'Email is required'});
    if(!password) return res.status(400).json({message: 'Password is required'});
    if(password.length < 6) return res.status(400).json({message: 'Password must be at least 6 characters'})

    try
    {
        const {token, ...User} = await LoginUserService({email, password});
        
        res.cookie('token', token, 
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.json(User);
    }
    catch(err)
    {
        console.error('Error occured while login', err);
        return res.json(err)
    }
}

export async function RegisterUser(req, res)
{
    const {name, email, password, role} = await req.body;
    
    if(!name) return res.status(400).json({message: 'Name is required'});
    if(!email) return res.status(400).json({message: 'Email is required'});

    if(!password) return res.status(400).json({message: 'Password is required'});
    if(password.length < 6) return res.status(400).json({message: 'Password must be at least 6 characters'})

    if(!role) return res.status(400).json({message: 'Role is required'});
    if(role != 'admin' && role != 'user') return res.status(400).json({message: 'Invalid Role'})

    try
    {
        const User = await CreateUserService({name, email, password, role});
        return res.json(User);
    }
    catch(err)
    {
        console.log('Error occured while registering user', err);
        return res.json(err);
    }
}