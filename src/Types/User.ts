export interface User {
    email: string;
    password: string;
    name: string;
    year: number;
    job: string;
    monthlyIncome: number;
}

export interface DbUser {
    id: number;
    email: string;
    password: string;
    name: string;
    year: number;
    job: string;
    monthlyIncome: number;
}