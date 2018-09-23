const FullUrl = (path) => {
    return location.origin + '/' + path.trim('/');
}
export const APICallerBase = {
    Post: async (path: string, params: any, model: any) => {
        var url = new URL(FullUrl(path));
        if (params) Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        console.log(model);
        return await fetch(url.href, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    },
    Put: async (path: string, params: any, model: any) => {
        var url = new URL(FullUrl(path));
        if (params) Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return await fetch(url.href, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(model)
        });
    },
    Get: async (path: string, params: any) => {
        var url = new URL(FullUrl(path));
        if (params) Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return await fetch(url.href, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}
