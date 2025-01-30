import React from 'react';
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
}

const colorDictionary: { [key: number]: string } = {
    1: 'STAR',
    2: 'PULSE',
    3: 'MAESTRO',
    4: 'MASTERCARD',
    5: 'PLUS',
    6: 'VISA'
};

const Balance: React.FC<BalanceProps> = ({ matchingEntry }) => {
    const getBank = (entry: BalanceProps['matchingEntry']) => {
        return entry ? colorDictionary[parseInt(entry.BANK.toString())] : '';
    };

    return (
        <div className='upper-container'>
            <h2>Current Balance</h2>
            <p>Your account is {matchingEntry ? matchingEntry.ACCOUNT : ''}</p>
            <p>Your balance is ${matchingEntry ? matchingEntry.BALANCE.toFixed(2) : '0.00'}</p>
            <p>Your Bank is {getBank(matchingEntry)}</p>
            <GradientButtonRight
                text="Print"
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

export default Balance;