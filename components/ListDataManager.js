import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getJsonData, storeData } from '../modules/storage.js';

const listKey = "@lists:0.0"

function ListDataManager({setLists, lists})
{
    const [dataGathered, setDataGathered ] = useState(false)

    useEffect(() => {
        getJsonData(listKey).then(data => {
            if (data)
                setLists(data)
            setDataGathered(true)
        })
    }, [])

    useEffect(() => {
        if (dataGathered)  
            storeData(listKey, lists)
    }, [lists])

    return <></>
}

export default ListDataManager