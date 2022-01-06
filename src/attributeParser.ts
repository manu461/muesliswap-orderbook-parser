export function amountParser(amount: string): number {
    const multiplier = amount.substr(-1).toLowerCase();
    if (multiplier == "k")
        return parseFloat(amount) * 1000;
    else if (multiplier == "m")
        return parseFloat(amount) * 1000000;
    else
        return parseFloat(amount);
}

export function pricePerTokenParser(pricePerToken: string): number {
    return parseFloat(pricePerToken);
}

export function totalParser(total: string): number {
    return parseFloat(total);
}