import React, { useState, useEffect } from 'react';
import GradientButtonRight from "../components/GradientButtonRight.tsx";
import GradientButtonLeft from "../components/GradientButtonLeft.tsx";

interface DataEntry {
    NIP: number;
    ACCOUNT: number;
    BALANCE: number;
    BANK: string;
}

interface TransferProps {
    matchingEntry: DataEntry | null;
    setMatchingEntry: React.Dispatch<React.SetStateAction<DataEntry | null>>;
    data: DataEntry[];
    triggerTransfer: boolean; // Add triggerTransfer to the props
}

const Transfer: React.FC<TransferProps> = ({ matchingEntry, setMatchingEntry, data, triggerTransfer }) => {
    const [targetAccount, setTargetAccount] = useState('');
    const [amount, setAmount] = useState('');

    const handleTransfer = () => {
        if (!matchingEntry) {
            alert('No matching entry found');
            return;
        }

        const targetEntry = data.find(entry => entry.ACCOUNT === parseInt(targetAccount, 10));
        if (!targetEntry) {
            alert('Target account not found');
            return;
        }

        const transferAmount = parseInt(amount, 10);
        if (isNaN(transferAmount) || transferAmount <= 0) {
            alert('Invalid transfer amount');
            return;
        }

        if (matchingEntry.BALANCE < transferAmount) {
            alert('Insufficient funds');
            return;
        }

        matchingEntry.BALANCE -= transferAmount;
        targetEntry.BALANCE += transferAmount;

        setMatchingEntry({ ...matchingEntry });
        alert('Transfer successful');
    };

    useEffect(() => {
        console.log(triggerTransfer);
        if (triggerTransfer && targetAccount && amount) {
            handleTransfer();
        }
    }, [triggerTransfer]);

    return (
        <div>
            <h2>Transfer Funds</h2>
            <div>
                <label>
                    Target Account:
                    <input className="input-style-transfer"
                        type="number"
                        value={targetAccount}
                        onChange={(e) => setTargetAccount(e.target.value)}
                        pattern="\d*"
                    />
                </label>
            </div>
            <div>
                <label>
                    Amount:
                    <input className="input-style-transfer"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        pattern="\d*"
                    />
                </label>
            </div>
            <GradientButtonRight text="Transfer" arrowColor={'Green'}
                                 position={{position: 'absolute', bottom: '35px', right: '5px'}}/>
            <GradientButtonLeft text="Cancel" arrowColor={'Red'}
                                position={{position: 'absolute', bottom: '35px', left: '5px'}}/>
        </div>
    );
};

export default Transfer;