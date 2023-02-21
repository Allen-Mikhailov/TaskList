import { getJsonData, storeData } from '../modules/fsstorage.js';
import { DeviceEventEmitter } from 'react-native';
import { useEffect, useState } from 'react';
import { store } from "../store.js"

function DataManager({ datakey, name })
{
    const [ data, setData ] = store.useState(name)
    const [ gotData, setGotData ] = useState(false)

    useEffect(() => {
        getJsonData(datakey).then((d) => {
          setGotData(true)
          if (d)
            setData(d)
        })
      }, [])

      useEffect(() => {
        if (!gotData) {return}
        console.log("Stored "+name+": ", data)
        storeData(datakey, JSON.stringify(data)).then(() => { })
      }, [data])

    return <></>
}

export default DataManager