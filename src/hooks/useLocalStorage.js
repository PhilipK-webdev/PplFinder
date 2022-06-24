import { useCallback, useState, useEffect } from "react";

export function useLocalStorage(key, defaultValue) {
    return useStorage(key, defaultValue, window.localStorage);
}

function useStorage(key, defaultValue, storageObject) {
    const [value, setValue] = useState(() => {
        const object = JSON.parse(storageObject.getItem(key));
        const jsonValue = object?.map((item) => Boolean(item))
        console.log(jsonValue);
        if (jsonValue !== null) return jsonValue;
        if (typeof initialValue === "function") {
            return defaultValue();
        } else {
            return defaultValue;
        }
    })


    useEffect(() => {
        if (value === undefined) {
            return storageObject.removeItem(key);
        }
        storageObject.setItem(key, JSON.stringify(value));
    }, [key, value, storageObject])

    const remove = useCallback(() => setValue(undefined), []);
    return [value, setValue, remove]
}
