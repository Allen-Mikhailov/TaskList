const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function getNewId(dict)
{
    let id = ""
    for (let i = 0; i < 10; i++)
    {
        id += characters.charAt(Math.floor(Math.random()*characters.length))
    }

    if (dict[id])
        return getNewId(dict)
    return id
}

export function findCommonElement(array1, array2) {
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (array1[i] === array2[j]) {
          return true;
        }
      }
    }
    return false;
  }

export function newListTemplate()
{
    return {

    }
}
