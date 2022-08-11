import {useState} from 'react';

export const useLocalStorage = (key) => {
    const [value, setValue] = useState(() => {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : undefined;
    })

    const setLocalStorage = (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue));

        setValue(newValue);
    }

    return [
        value,
        setLocalStorage,
    ];
}

