const unixToDateTime = (unixTimestamp) => {
    const d = new Date(unixTimestamp * 1000);
    const date = d.toLocaleDateString();
    const time = d.toTimeString().split(' ')[0];
    return `${date}, ${time}`;
}

export { unixToDateTime };