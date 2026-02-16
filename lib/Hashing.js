import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export async function Hash(text)
{
    const hashed = await bcrypt.hash(text, SALT_ROUNDS);
    return hashed;
}

export async function Compare(text, hash)
{
    const result = await bcrypt.compare(text, hash);
    return result;
}
