const sortFromLargestToSmallest = (b, a) => {
    return a.value - b.value;
};

//build all Pie charts using pieChartData array filled in HTML
pieChartData.forEach((pieChartData) => {
    if (pieChartData.data.length > 1) {
        const canvasContext = document.getElementById(pieChartData.canvas).getContext('2d');
        pieChartData.data.sort(sortFromLargestToSmallest)
        new Chart(canvasContext, {
            type: 'pie',
            options: {
                title: {
                    display: true,
                    text: pieChartData.title
                },
                plugins: {
                    colorschemes: {
                        scheme: pieChartData.color
                    }
                },
            },
            data: {
                datasets: [{
                    data: pieChartData.data.map(_ => _.value),
                }],
                labels: pieChartData.data.map(_ => _.label)
            }
        });
    } else {
        document.getElementById(pieChartData.canvas).remove();
    }

})

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
    try {
        const data = JSON.parse(el.getAttribute('data-min-max-avg'));
        data.sort((a, b) => a - b);
        const avg = Math.round(data.reduce((s, _) => {
            s += _;
            return s;
        }, 0) / (data.length));

        el.innerHTML = `${secondsToPeriod(data[0])}/${secondsToPeriod(data[data.length - 1])}/${secondsToPeriod(avg)}`;
    } catch (e) {
        el.innerHTML = '';
        console.error(e);
    }

});
//toggle tables expanding/collapsing
document.querySelectorAll('.toggle').forEach(_ => {
    _.addEventListener('click', (e) => {
        e.preventDefault();
        const table = document.getElementById(_.getAttribute('href'));

        if (_.classList.contains('down')) {
            _.classList.add('up');
            _.classList.remove('down');
            _.querySelector('.arrow').innerHTML = '&#128316';
            table.classList.remove('hidden');
        } else {
            _.classList.add('down');
            _.classList.remove('up');
            _.querySelector('.arrow').innerHTML = '&#128317;';
            table.classList.add('hidden');
        }

    })
});

document.querySelectorAll('a.scroll').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const scrollElId = a.getAttribute('href');
        document.querySelector(scrollElId).scrollIntoView({
            behavior: "smooth"
        });
    })
})
