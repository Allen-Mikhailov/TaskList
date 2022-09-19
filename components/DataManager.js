import { getJsonData, storeData } from '../modules/storage.js';
import { useEffect, useState } from 'react';

const dataKey = "taskData:0.0"

function DataManager({ data, setData })
{
    const [ gotData, setGotData ] = useState(false)

    useEffect(() => {
        getJsonData(dataKey).then((d) => {
          setGotData(true)
          setData(d || [])
        })
      }, [])

      useEffect(() => {
        if (!gotData) {return}
        // console.log("Stored: ", data)
        storeData(dataKey, JSON.stringify(data)).then(() => { })
      }, [data])

    return <></>
}

export default DataManager