import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import logo from './assets/atm_sign.png';
import graffiti from './assets/graffiti.png';
import creditCards from './assets/creditcard_sprite.png';
import sticker from './assets/sticker_graf.png';
import systems from './assets/systems.png';
import Welcome from './pages/welcome';
import LoginAuth from './pages/LoginAuth';
import Transaction from './pages/transaction';
import Deposit from './pages/deposit';
import Withdraw from './pages/withdraw';
import Balance from './pages/balance';
import Transfer from './pages/transfer';
import { saveAs } from 'file-saver';
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import { getRedirectPath1, getRedirectPath2, getRedirectPath3, getRedirectPath4, getRedirectPath5, getRedirectPath6 } from './services/mapService';
import { NipProvider, NipContext } from './services/logicService.tsx';
import * as XLSX from 'xlsx';
import accountsFile from './constants/accounts.xlsx';

interface DataEntry {
    NIP: number;
    ACCOUNT: number;
    BALANCE: number;
    BANK: string;
}

const colorDictionary: { [key: number]: string } = {
    1: 'STAR',
    2: 'PULSE',
    3: 'MAESTRO',
    4: 'MASTERCARD',
    5: 'PLUS',
    6: 'VISA'
};

const bankPercentageDictionary: { [key: string]: { left: number, right: number } } = {
    1: { left: 0, right: 88 },
    2: { left: 15, right: 61 },
    3: { left: 35, right: 45 },
    4: { left: 55, right: 30 },
    5: { left: 0, right: 15 },
    6: { left: 90, right: 0 }
};

const App: React.FC = () => {
    const [showTransition, setShowTransition] = useState(true);
    const [data, setData] = useState<DataEntry[]>([]);
    const [input, setInput] = useState('');
    const [pass, setPass] = useState('');
    const [matchingEntry, setMatchingEntry] = useState<DataEntry | null>(null);
    const { clearNip } = useContext(NipContext) || {};
    const [length, setLength] = useState(0);
    const [triggerTransfer, setTriggerTransfer] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(accountsFile);
                const file = await response.blob();
                const reader = new FileReader();
                reader.onload = (e) => {
                    const binaryStr = e.target?.result as string;
                    const workbook = XLSX.read(binaryStr, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData: DataEntry[] = XLSX.utils.sheet_to_json(worksheet);
                    setData(jsonData);
                };
                reader.readAsBinaryString(file);
            } catch (error) {
                console.error('Error reading file:', error);
            }
            if (location.pathname === '/transaction') {
                setTriggerTransfer(false);
            }
        };

        fetchData();
    }, []);

    const handleTransferTrue = () => setTriggerTransfer(true);
    const handleTransferFalse = () => setTriggerTransfer(false);

    const saveMatchingEntryToFile = (entry: DataEntry) => {
        const bankColor = colorDictionary[parseInt(entry.BANK.toString())];
        const entryData = `
        THE INFORMATION OF YOUR ACCOUNT IS:
        ACCOUNT: ${entry.ACCOUNT}
        BALANCE: ${entry.BALANCE}
        BANK: ${bankColor}
    `;
        const blob = new Blob([entryData], { type: 'text/plain;charset=utf-8' });
        const fileName = `${entry.ACCOUNT}-BALANCE.txt`;
        saveAs(blob, fileName);
    };

    const handleButtonClick = () => {
        setShowTransition(false);
        setTimeout(() => setShowTransition(true), 500);
        if (matchingEntry && input) {
            const amount = parseFloat(input.replace(/[^0-9]/g, ''));
            if (!isNaN(amount)) {
                if (location.pathname === '/deposit') {
                    matchingEntry.BALANCE += amount;
                } else if (location.pathname === '/withdraw') {
                    matchingEntry.BALANCE -= amount;
                }
                setInput('0');
            }
        }
        if (location.pathname === '/login') {
            console.log('Pass:', pass);
        }
        if (matchingEntry && location.pathname === '/balance') {
            saveMatchingEntryToFile(matchingEntry);
        }
        if (location.pathname === '/transfer') {
            handleTransferTrue();
        }
    };

    const handleButtonClick2 = () => {
        if (matchingEntry && location.pathname === '/transaction') {
            console.log('Transaction');
            console.log(length);
            console.log('Matching Entry', matchingEntry);
        }
        if (location.pathname === '/transfer') {
            handleTransferFalse();
        }
    };

    const handleWithdraw = (amount: number) => {
        if (matchingEntry && location.pathname === '/withdraw') {
            if (matchingEntry.BALANCE < amount) {
                alert('Insufficient funds');
                setInput('0');
                return;
            }
            matchingEntry.BALANCE -= amount;
            setInput('0');
        }
    };

    return (
        <NipProvider>
            <Router>
                <AppContent
                    showTransition={showTransition}
                    onButtonClick={handleButtonClick}
                    onButtonClick2={handleButtonClick2}
                    onWithdraw={handleWithdraw}
                    data={data}
                    input={input}
                    setInput={setInput}
                    setPass={setPass}
                    matchingEntry={matchingEntry}
                    setMatchingEntry={setMatchingEntry}
                    setLength={setLength}
                    triggerTransfer={triggerTransfer}
                />
            </Router>
        </NipProvider>
    );
};

const AppContent: React.FC<{
    showTransition: boolean,
    onButtonClick: () => void,
    onButtonClick2: () => void,
    onWithdraw: (amount: number) => void,
    data: DataEntry[],
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    setPass: React.Dispatch<React.SetStateAction<string>>,
    matchingEntry: DataEntry | null,
    setMatchingEntry: React.Dispatch<React.SetStateAction<DataEntry | null>>,
    setLength: React.Dispatch<React.SetStateAction<number>>,
    triggerTransfer: boolean
}> = ({ showTransition, onButtonClick, onButtonClick2, onWithdraw, data, input, setInput, setPass, matchingEntry, setMatchingEntry, setLength, triggerTransfer }) => {
    const location = useLocation();
    const { nip } = useContext(NipContext) || {};
    const navigate = useNavigate();
    const [canRedirect, setCanRedirect] = useState(false);
    const redirectPath1 = getRedirectPath1(location.pathname);
    const redirectPath2 = getRedirectPath2(location.pathname);
    const redirectPath3 = getRedirectPath3(location.pathname);
    const redirectPath4 = getRedirectPath4(location.pathname);
    const redirectPath5 = getRedirectPath5(location.pathname);
    const redirectPath6 = getRedirectPath6(location.pathname);

    const getGradientStyle = (side: 'left' | 'right') => {
        if (location.pathname === '/') return 0;
        if (matchingEntry && location.pathname !== '/login') {
            const bank = parseInt(matchingEntry.BANK.toString(), 10);
            const percentages = bankPercentageDictionary[bank] || { left: 0, right: 0 };
            return side === 'left' ? percentages.left : percentages.right;
        }
        return 0;
    };

    const compareNip = () => {
        const nipInt = parseInt(nip, 10);
        const entry = data.find(entry => entry.NIP === nipInt);
        if (entry) {
            setMatchingEntry(entry);
            setPass('');
            return true;
        }
        setMatchingEntry(null);
        return false;
    };

    useEffect(() => {
        const result = compareNip();
        if ((result || location.pathname !== '/login') && location.pathname !== redirectPath1) {
            setCanRedirect(true);
        } else {
            setCanRedirect(false);
        }
    }, [nip, data, navigate, redirectPath1, location.pathname]);

    return (
        <div className="App">
            <div className="App-header">
                <div className="column">
                    <div className="upper-sign">
                        <img src={logo} alt="Logo" className="upper-sign-image" />
                        <div className='top-image'>
                            <img src={graffiti} alt="Graffiti" className="graffiti-image" />
                        </div>
                    </div>
                    <div className="image-container">
                        <img src={creditCards} alt="CreditCards" className="creditCard-image" />
                        <div className="label-container1" style={{ width: `${getGradientStyle('left')}%` }}>
                            <label className="image-label1">R</label>
                        </div>
                        <div className="label-container2" style={{ width: `${getGradientStyle('right')}%` }}>
                            <label className="image-label2">R</label>
                        </div>
                    </div>
                    <div className='square-container'>
                        <div className={`transition-container ${showTransition ? 'show' : 'hidden'}`}>
                            <Routes>
                                <Route path="/" element={<Welcome />} />
                                <Route path="/login" element={<LoginAuth setNip1={'0'} setNip={setPass} setLength={setLength} />} />
                                <Route path="/transaction" element={<Transaction matchingEntry={matchingEntry} />} />
                                <Route path="/deposit" element={<Deposit matchingEntry={matchingEntry} setInput={setInput} />} />
                                <Route path="/withdraw" element={<Withdraw matchingEntry={matchingEntry} setInput={setInput} />} />
                                <Route path="/balance" element={<Balance matchingEntry={matchingEntry} />} />
                                <Route path="/transfer" element={<Transfer matchingEntry={matchingEntry} setMatchingEntry={setMatchingEntry} data={data} triggerTransfer={triggerTransfer} />} />
                            </Routes>
                        </div>
                    </div>
                    <div className="button-row">
                        <Link to={redirectPath2}>
                            <button className="square-button" style={{ left: '11%', top: '62.5%' }} onClick={onButtonClick2}></button>
                        </Link>
                        <Link to={redirectPath4}>
                            <button className="square-button" style={{ left: '11%', top: '55.5%' }} onClick={() => onWithdraw(200)}></button>
                        </Link>
                        <Link to={redirectPath6}>
                            <button className="square-button" style={{ left: '11%', top: '48.5%' }} onClick={() => onWithdraw(1000)}></button>
                        </Link>
                        <Link to={canRedirect ? redirectPath1 : '#'}>
                            <button className="square-button" style={{ right: '1%', top: '62.5%' }} onClick={(e) => {
                                if (!canRedirect) {
                                    e.preventDefault();
                                    alert('The PIN is incorrect');
                                } else {
                                    onButtonClick();
                                }
                            }}></button>
                        </Link>
                        <Link to={redirectPath3}>
                            <button className="square-button" style={{ right: '1%', top: '55.5%' }} onClick={() => onWithdraw(100)}></button>
                        </Link>
                        <Link to={redirectPath5}>
                            <button className="square-button" style={{ right: '1%', top: '48.5%' }} onClick={() => onWithdraw(500)}></button>
                        </Link>
                        <button className="square-button" style={{ left: '11%', top: '41.5%' }}></button>
                        <button className="square-button" style={{ right: '1%', top: '41.5%' }} onClick={() => onWithdraw(500)}></button>
                    </div>
                    <div className="additional-images">
                        <img src={sticker} alt="sticker" className="sticker-image" />
                        <img src={systems} alt="system" className="systems-image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;