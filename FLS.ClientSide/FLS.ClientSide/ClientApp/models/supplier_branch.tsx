import * as React from "react";

interface ISupplierBranch {
    id: number;
    name: string;
    supplierId: number;
    isMain: boolean | null;
    address: string;
    taxCode: string;
    phone: string;
    email: string;
    website: string;
    description: string;
}

export class SupplierBranchModel implements ISupplierBranch {
    id: number;
    name: string;
    supplierId: number;
    isMain: boolean | null;
    address: string;
    taxCode: string;
    phone: string;
    email: string;
    website: string;
    description: string;
}