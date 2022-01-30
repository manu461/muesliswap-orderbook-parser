export function amountParser(amount: string): number {
    const multiplier = amount.substr(-1).toLowerCase();
    if (multiplier == "k" || multiplier == "K")
        return parseFloat(amount) * 1000;
    else if (multiplier == "m" || multiplier == "M")
        return parseFloat(amount) * 1000000;
    else if (multiplier == "b" || multiplier == "B")
        return parseFloat(amount) * 1000000000;
    else
        return parseFloat(amount);
}

export function pricePerTokenParser(pricePerToken: string): number {
    return parseFloat(pricePerToken.replace(',', ''));
}