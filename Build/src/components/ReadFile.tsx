import React, { useState, useEffect } from 'react';
import { readxcel } from '../components/ReadFile.tsx';
import accountsFile from '../constants/accounts.xlsx'; // Adjust the path as necessary

const ReadExcel = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(accountsFile);
                const file = await response.blob();
                const excelData = await readxcel(file);
                setData(excelData);
            } catch (error) {
                console.error('Error reading file:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Read Excel File</h1>
            <table>
                <thead>
                <tr>
                    {data.length > 0 && data[0].map((key, index) => (
                        <th key={index}>{key}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.slice(1).map((row, index) => (
                    <tr key={index}>
                        {row.map((val, i) => (
                            <td key={i}>{val}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReadExcel;