import * as React from "react";

interface ICustomer {
    id: number;
    name: string;
    address: string;
    taxCode: string;
    phone: string;
    email: string;
    website: string;
    description: string;
}

export class CustomerModel implements ICustomer {
    id: number;
    name: string;
    address: string;
    taxCode: string;
    phone: string;
    email: string;
    website: string;
    description: string;
}