const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function getNewId(dict)
{
    let id = ""
    for (let i = 0; i < 10; i++)
    {
        id += characters.charAt(Math.floor(Math.random()*characters.length))
    }

    if (dict[id])
        return GetNewId(dict)
    return id
}