import { getJsonData, storeData } from '../modules/storage.js';
import { useEffect, useState } from 'react';

const settingsKey = "setting:0.0"

const defaultSettings = {
    theme: "light",
}

function SettingsData({ settings, setSettings }) {
    const [gotSettings, setGotSettings] = useState(false)
    useEffect(() => {
        getJsonData(settingsKey).then((d) => {
            setGotSettings(true)
            setSettings(d || [])
        })
    }, [])

    useEffect(() => {
        if (!gotSettings) { return }
        // console.log("Stored: ", data)
        storeData(settingsKey, JSON.stringify(settings)).then(() => { })
    }, [settings])
}

export { defaultSettings, SettingsData }