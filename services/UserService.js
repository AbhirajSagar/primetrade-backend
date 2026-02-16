import User from '../models/User.js';
import { Hash, Compare } from '../lib/Hashing.js';
import { CreateUserResponse, LoginUserResponse } from '../dto/AuthResponses.js';
import jwt from 'jsonwebtoken';

export async function CreateUser({ name, email, password, role })
{
    const hashedPassword = await Hash(password);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    const userData = new CreateUserResponse({...user._doc, token});
    return userData;
}

export async function LoginUser({ email, password })
{
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) throw new Error('Invalid email');

    const isValidPassword = await Compare(password, user.password);
    if (!isValidPassword) throw new Error('Invalid password');

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    const userData = new LoginUserResponse({...user._doc, token});
    return userData;
}
