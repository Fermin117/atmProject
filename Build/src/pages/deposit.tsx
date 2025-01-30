import React, { useState } from 'react';
import GradientButtonRight from '../components/GradientButtonRight.tsx';
import GradientButtonLeft from '../components/GradientButtonLeft.tsx';
import '../styles/loginAuth.css';

interface BalanceProps {
    matchingEntry: {
        NIP: number;
        ACCOUNT: string;
        BALANCE: number;
        BANK: string;
    } | null;
    setInput: React.Dispatch<React.SetStateAction<string>>;
}

const Deposit: React.FC<BalanceProps> = ({ setInput }) => {
    const [localInput, setLocalInput] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setLocalInput(value);
        setInput(value);
    };

    const handleBlur = () => {
        setLocalInput((prevInput) => {
            const number = parseFloat(prevInput);
            if (isNaN(number)) return '';
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
        });
    };

    const handleFocus = () => {
        setLocalInput((prevInput) => prevInput.replace(/[^0-9]/g, ''));
    };

    return (
        <div className='center-container'>
            AMOUNT TO DEPOSIT
            <input
                type="text"
                value={localInput}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className="input-style"
                pattern="\d*"
            />
            <GradientButtonRight text="Accept" arrowColor={'Green'}
                                 position={{position: 'absolute', bottom: '35px', right: '5px'}}/>
            <GradientButtonLeft text="Cancel" arrowColor={'Red'}
                                position={{position: 'absolute', bottom: '35px', left: '5px'}}/>
        </div>
    );
};

export default Deposit;