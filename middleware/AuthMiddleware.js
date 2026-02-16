import jwt from 'jsonwebtoken';

export default function VerifyToken(req, res, next)
{
    const Header = req.headers['authorization'];
    if(!Header) return res.status(201).json({message: 'Missing Headers for Authentication'})
    
    const Token = Header.split(' ')[1];
    if(!Token) return res.status(201).json({message: 'Missing Token for Authentication'})

    try
    {
        const DecodedToken = jwt.verify(Token, process.env.JWT_SECRET_KEY);
        req.user = DecodedToken;
        next()
    }
    catch(err)
    {
        console.log(err);
        return res.status(401).json({message: "Invalid Token"});
    }
}