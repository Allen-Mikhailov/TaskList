import RNFS from 'react-native-fs';

const mainFolderPath = "taskListData"

async function DirHasFolder(dir, folder)
{
    const dirStuff = await RNFS.readDir(dir)

    for (let i = 0; i < dirStuff.length; i++)
    {
        if (dirStuff[i].name == folder && dirStuff[i].isDirectory())
            return true
    }
    return false
}

async function storageInit()
{
    const mainDir = await RNFS.readDir(RNFS.DocumentDirectoryPath)

    if (!await DirHasFolder(mainDir, mainFolderPath))
    {
        await RNFS.mkdir(RNFS.DocumentDirectoryPath+"/"+mainFolderPath);
    }
}

function storeData(key, data)
{

}

function getData(key)
{

}

function getJsonData(key)
{
    
}


export { storeData, getData, getJsonData, storageInit }