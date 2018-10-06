import { ResponseConsult, StringStringPair } from "../models/shared";

const FullUrl = (path) => {
    return new URL(location.origin + '/' + path.trim('/'));
}
export const APICallerBase = {
    Post: async (path: string, model: any, params: any = null) => {
        try {
            var url = FullUrl(path);
            if (params) Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            var response = await fetch(url.href, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(model)
            });
            if (response.ok) {
                var resText = await response.text();
                return JSON.parse(resText);
            }
            else {
                var result = new ResponseConsult();
                result.hasError = true;
                result.errors = [new StringStringPair('err-' + response.status, response.statusText)];
                return result;
            }
        } catch (exc) {
            var result = new ResponseConsult();
            result.hasError = true;
            result.errors = [new StringStringPair('err-xcptn-ctch', 'Có lỗi trong quá trình lấy dữ liệu - [' + path + ']')];
            return result;
        }
    },
    Put: async (path: string, model: any, params: any = null) => {
        try {
            var url = FullUrl(path);
            if (params) Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            var response = await fetch(url.href, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(model)
            });
            if (response.ok) {
                var resText = await response.text();
                return JSON.parse(resText);
            }
            else {
                var result = new ResponseConsult();
                result.hasError = true;
                result.errors = [new StringStringPair('err-' + response.status, response.statusText)];
                return result;
            }
        } catch (exc) {
            var result = new ResponseConsult();
            result.hasError = true;
            result.errors = [new StringStringPair('err-xcptn-ctch', 'Có lỗi trong quá trình lấy dữ liệu - [' + path + ']')];
            return result;
        }
    },
    Get: async (path: string, params: any = null) => {
        try {
            var url = FullUrl(path);
            if (params) Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            var response = await fetch(url.href, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                var resText = await response.text();
                return JSON.parse(resText);
            }
            else {
                var result = new ResponseConsult();
                result.hasError = true;
                result.errors = [new StringStringPair('err-' + response.status, response.statusText)];
                return result;
            }
        } catch (exc) {
            var result = new ResponseConsult();
            result.hasError = true;
            result.errors = [new StringStringPair('err-xcptn-ctch', 'Có lỗi trong quá trình lấy dữ liệu (' + path + ')')];
            return result;
        }
    },
    Delete: async (path: string, params: any = null) => {
        try {
            var url = FullUrl(path);
            if (params) Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            var response = await fetch(url.href, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                var resText = await response.text();
                return JSON.parse(resText);
            }
            else {
                var result = new ResponseConsult();
                result.hasError = true;
                result.errors = [new StringStringPair('err-' + response.status, response.statusText)];
                return result;
            }
        } catch (exc) {
            var result = new ResponseConsult();
            result.hasError = true;
            result.errors = [new StringStringPair('err-xcptn-ctch', 'Có lỗi trong quá trình lấy dữ liệu - [' + path + ']')];
            return result;
        }
    },
}