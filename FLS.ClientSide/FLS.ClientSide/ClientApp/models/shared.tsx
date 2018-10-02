import * as React from "react";

interface IPaginate {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    pageRangeDisplayed: number;
}

export class PaginateModel implements IPaginate {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    pageRangeDisplayed: number;

    constructor() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.totalItems = 0;
        this.pageRangeDisplayed = 5;
    }
}
interface IFilterModel {
    key: number,
    value: number | string
}
export class FilterModel implements IFilterModel {
    key: number;
    value: number | string;
    constructor(_key: number, _value: number | string) {
        this.key = _key;
        this.value = _value
    }
}
interface IPageFilterModel {
    key: string,
    page: number,
    pageSize: number,
    filters: IFilterModel[]
}
export class PageFilterModel implements IPageFilterModel {
    key: string;
    page: number = 1;
    pageSize: number = 10;
    filters: FilterModel[] = [new FilterModel(0, 0)];
}

interface IIdNameModel {
    id: number;
    name: string;
    description: string;
}

export class IdNameModel implements IIdNameModel {
    id = 0;
    name = '';
    description = '';
}

interface IErrorItem {
    name: string,
    value: string
}
export class ErrorItem implements IErrorItem {
    name: string;
    value: string;
}

interface IApiResponse {
    isSuccess: boolean,
    status: number,
    message: string,
    data: any
}
export class ApiResponse implements IApiResponse 
{
    isSuccess: boolean;
    status: number;
    message: string;
    data: any;
}

interface IResponseConsult {
    hasError: boolean;
    hasWarning: boolean;
    errors: IStringStringPair[];
    warnings: IStringStringPair[];
    data: any;
}

export class ResponseConsult implements IResponseConsult {
    hasError: boolean = false;
    hasWarning: boolean = false;
    errors: IStringStringPair[];
    warnings: IStringStringPair[];
    data: any;
}

interface IStringStringPair {
    key: string,
    value: string,
}
export class StringStringPair implements IStringStringPair {
    key: string;
    value: string;
    constructor(key: string = null, value: string = null) {
        this.key = key;
        this.value = value;
    }
}