import { getJsonData, storeData } from '../modules/storage.js';
import { DeviceEventEmitter } from 'react-native';
import { useEffect, useState } from 'react';

function DataManager({ data, setData, datakey, name })
{
    const [ gotData, setGotData ] = useState(false)

    useEffect(() => {
        getJsonData(datakey).then((d) => {
          setGotData(true)
          if (d)
            setData(d)
          DeviceEventEmitter.emit("event.data."+name, data)
        })
      }, [])

      useEffect(() => {
        DeviceEventEmitter.emit("event.data."+name, data)
        if (!gotData) {return}
        console.log("Stored "+name+": ", data)
        storeData(datakey, JSON.stringify(data)).then(() => { })
      }, [data])

    return <></>
}

export default DataManager