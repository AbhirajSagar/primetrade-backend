class UserResponse
{
    constructor({name, email, role, token})
    {
        this.name = name;
        this.email = email;
        this.role = role;
        this.token = token;
    }
}

export class CreateUserResponse extends UserResponse
{
    constructor(user)
    {
        super(user);
        this.message = `User Created Successfully`
    }
}

export class LoginUserResponse extends UserResponse
{
    constructor(user)
    {
        super(user);
        this.message = `Login Successful`
    }
}