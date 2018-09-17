export const _HArray = {
    ConcatAndDeDuplicate(key, ...arrs) {
        // gộp 2 mảng và loại bỏ dữ liệu trùng
        return [].concat(...arrs).reduce((a, b) => !a.filter(c => b[key] === c[key]).length ? [...a, b] : a, []);
    },
    Sum(array, ...fields: string[]): number {
        // cộng tổng các fields trong mảng
        return array.reduce((prev, next) => {
            return prev + fields.reduce((p, n) => {
                return p + Number(next[n]);
            }, 0)
        }, 0);
    }
}
