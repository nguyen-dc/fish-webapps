export const StringHandle = {
    IsNullOrEmpty(input: string) {
        if (input == undefined || input == null)
            return true;
        input = input.trim();
        return input.length == 0;
    }
}