export interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: number;
    password: string;
}

export interface Client {
    _id: string;
    firstName: string;
    lastName: string;
    name: string;
    contactNumber: number;
    address: string;
    remarks: string;
    pan: string;
    itPassword: string;
    transactionDetails: Transaction[];
}

export interface Transaction {
    _id: string;
    status: string;
    typeOfAssignment: string;
    fees: number;
    totalIncome: number;
    netIncome: number;
    taxPaid: number;
    taxRefund: number;
    financialYear: string;
    assessmentYear: string; 
    modeOfFiling: string,
    dateOfFiling: string,
}