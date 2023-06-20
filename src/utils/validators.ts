type Input = {
    value: string;
    pattern: RegExp;
    setFormError: (e: boolean) => void;
}

export const regexValidation = (input: Input) => {
    const { pattern, setFormError, value } = input;
    if (value.match(pattern)) {
        setFormError(false)
        return false;
    }
    setFormError(true)
    return true
} 