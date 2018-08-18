export const ArrayHandle = {
    ConcatAndDeDuplicate(key, ...arrs) {
        return [].concat(...arrs).reduce((a, b) => !a.filter(c => b[key] === c[key]).length ? [...a, b] : a, []);
    }
}