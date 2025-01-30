import React, { useState, useContext, useEffect } from 'react';
import GradientButtonRight from '../components/GradientButtonRight.tsx';
import GradientButtonLeft from '../components/GradientButtonLeft.tsx';
import '../styles/loginAuth.css';
import { NipContext } from '../services/logicService.tsx';

interface LoginAuthProps {
    setNip1: (nip1: string) => void;
    setNip: React.Dispatch<React.SetStateAction<string>>;
    setLength: (value: number) => void;
}

const AsteriskInput: React.FC<LoginAuthProps> = ({ setNip, setLength }) => {
    const [localInput, setLocalInput] = useState('');
    const { setNip1 } = useContext(NipContext);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d{0,4}$/.test(value)) {
            setLength(value.length);
            setLocalInput(value);
            setNip(value);
            setNip1(value);
        }
    };

    useEffect(() => {
        if (localInput === '') {
            setNip('');
            setNip1('');
        }
    }, [localInput, setNip, setNip1]);

    return (
        <div className='center-container'>
            PLEASE ENTER YOUR PIN
            <input
                type="password"
                value={localInput}
                onChange={handleChange}
                className="input-style"
                maxLength={4}
            />
            <GradientButtonRight
                text="Correct"
                arrowColor="Green"
                position={{ position: 'absolute', bottom: '35px', right: '5px' }}
            />
            <GradientButtonLeft
                text="Cancel"
                arrowColor="Red"
                position={{ position: 'absolute', bottom: '35px', left: '5px' }}
            />
        </div>
    );
};

export default AsteriskInput;