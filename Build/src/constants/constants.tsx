interface Account {
    nip: string;
    account: string;
    balance: number;
}

export const accounts: Account[] = [
    { nip: '1234', account: 'ACC123', balance: 1000 },
    { nip: '5678', account: 'ACC456', balance: 2000 },
    { nip: '9101', account: 'ACC789', balance: 3000 }
];
