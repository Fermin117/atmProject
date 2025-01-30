import React, { createContext, useState, ReactNode } from 'react';

interface NipContextProps {
    nip: string;
    setNip1: (nip: string) => void;
    clearNip: () => void;
}

export const NipContext = createContext<NipContextProps | undefined>(undefined);

export const NipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [nip, setNip1] = useState('');

    const clearNip = () => {
        setNip1('');
    };

    return (
        <NipContext.Provider value={{ nip, setNip1, clearNip }}>
            {children}
        </NipContext.Provider>
    );
};