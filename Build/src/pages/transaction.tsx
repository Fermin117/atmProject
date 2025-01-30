import React from 'react';
import '../styles/transaction.css';
import GradientButtonRight from "../components/GradientButtonRight.tsx";
import GradientButtonLeft from "../components/GradientButtonLeft.tsx";

interface BalanceProps {
    matchingEntry: {
        NIP: number;
        ACCOUNT: string;
        BALANCE: number;
        BANK: string;
    } | null;
}

const Transaction: React.FC<BalanceProps> = ({matchingEntry}) => {

    return (
        <div className='upper-container'>
            <div className="transaction-heading">
                <h2>Bank Transactions</h2>
                <p>Your balance is ${matchingEntry ? matchingEntry.BALANCE.toFixed(2) : '0.00'}</p>
            </div>
            <GradientButtonRight text="Transfer" arrowColor={'Blue'}
                                 position={{position: 'absolute', bottom: '160px', right: '5px' }} />
            <GradientButtonRight text="Deposit" arrowColor={'Blue'} position={{ position: 'absolute', bottom: '97px', right: '5px' }} />
            <GradientButtonRight text="Withdrawal" arrowColor={'Blue'} position={{ position: 'absolute', bottom: '35px', right: '5px' }} />
            <GradientButtonLeft text="Cancel" arrowColor={'Red'} position={{ position: 'absolute', bottom: '35px', left: '5px' }} />
            <GradientButtonLeft text="Receipt" arrowColor={'Blue'} position={{ position: 'absolute', bottom: '97px', left: '5px' }} />
        </div>
    );
};

export default Transaction;