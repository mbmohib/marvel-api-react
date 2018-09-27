export const addHttps = url => {
    const protocol = url.split('://');

    if (protocol[0] === 'http') {
        return `https://${protocol[1]}`;
    }
    
    return url;
};

export const truncateString = string => {
    // TODO: Improve string truncate algo
    if (string.length > 100) {
        return string.split('').splice(0, 100).join('') + '....';
    }

    return string;
};