//Contains all operations (with dates or strings or math) that is hard to be done on XSLT level

//convert seconds to human readable period
const secondsToPeriod = (s) => {
    let result = '';
    const S_IN_DAY = 86400;
    const S_IN_HOUR = 3600;
    const S_IN_MINUTE = 60;
    const days = Math.trunc(s / S_IN_DAY);
    if (days > 0) {
        result += `${days} days`;
    }
    const hours = Math.trunc((s - days * S_IN_DAY) / S_IN_HOUR);

    if (hours > 0) {
        result += ` ${hours} hours`;
    }
    const minutes = Math.trunc((s - days * S_IN_DAY - hours * S_IN_HOUR) / S_IN_MINUTE);

    if (minutes > 0) {
        result += ` ${minutes} minutes`;
    }

    return result;
}
document.querySelectorAll('[data-convert-seconds]').forEach(
    //suppose that element contains seconds in innerHTML
    (_) => {
        const s = parseInt(_.innerHTML);
        _.innerHTML = secondsToPeriod(s);
    });
//show min/max/avg block  - data array is stored inside attribute as string
document.querySelectorAll('[data-min-max-avg]').forEach(el => {
    const data = JSON.parse(el.getAttribute('data-min-max-avg'));
    data.sort((a, b) => a - b);
    const avg = Math.round(data.reduce((s, _) => {
        s += _;
        return s;
    }, 0) / (data.length));

    el.innerHTML = `${secondsToPeriod(data[0])}/${secondsToPeriod(data[data.length - 1])}/${secondsToPeriod(avg)}`;
})
