//Contains all operations (with dates or strings or math) that is hard to be done on XSLT level

//convert seconds to human readable period
document.querySelectorAll('[data-convert-seconds]').forEach(
    //suppose that element contains seconds in innerHTML
    (_) => {
        let result = '';
        const s = parseInt(_.innerHTML);
        const S_IN_DAY = 86400;
        const S_IN_HOUR = 3600;
        const S_IN_MINUTE = 60;
        const days = Math.trunc(s / S_IN_DAY);
        if (days > 1) {
            result += `${days} days`;
        }
        const hours = Math.trunc((s - days * S_IN_DAY) / S_IN_HOUR);

        if (hours > 1) {
            result += ` ${hours} hours`;
        }
        const minutes = Math.trunc((s - days * S_IN_DAY - hours * S_IN_HOUR) / S_IN_MINUTE);

        if (minutes > 1) {
            result += ` ${minutes} minutes`;
        }
        _.innerHTML = result;

    });
