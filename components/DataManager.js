import { getJsonData, storeData } from '../modules/storage.js';
import { DeviceEventEmitter } from 'react-native';
import { useEffect, useState } from 'react';
import { store } from "../store.js"

function DataChild({ datakey, name, checked })
{
    const [ data, setData ] = store.useState(name)
    const [ gotData, setGotData ] = useState(false)

    const [documentsFolder, setDocumentsFolder] = useState('');

    useEffect(() => {
      if (!checked) {return}

        getJsonData(datakey).then((d) => {
          setGotData(true)
          if (d)
            setData(d)
        })
      }, [checked])

      useEffect(() => {
        if (!gotData) {return}
        console.log("Stored "+name+": ", data)
        storeData(datakey, JSON.stringify(data)).then(() => { })
      }, [data])

    return <></>
}

function DataManager({ dataKeys })
{
  const [ checked, setChecked ] = useState(false)

  useEffect(() => {

  }, [])

  return <>
    {Object.keys(dataKeys).map(key => {
      <DataChild datakey={key} name={dataKeys[key]} checked={checked}/>
    })}
  </>
}

export default DataManager