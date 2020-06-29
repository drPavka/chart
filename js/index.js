const location_pie = document.getElementById('pie_by_locations').getContext('2d');
const states_pie = document.getElementById('pie_by_states').getContext('2d');
const review_pie = document.getElementById('pie_by_review_status').getContext('2d');

/**
 * Generate random color for pie chart section
 *
 * @todo - optimize
 * @return {number}
 */
function getRandomColor() {
    const min = 0;
    const max =255;
    return Math.random() * (max - min) + min;
}

const sortFromLargestToSmallest = (b, a) => {
    return a.value - b.value;
};

locationData.sort(sortFromLargestToSmallest);
stateData.sort(sortFromLargestToSmallest);
reviewStatusData.sort(sortFromLargestToSmallest);


new Chart(location_pie, {
    type: 'pie',
    options:{
        title:{
            display:true,
            text:'All files by location'
        }
    },
    data: {
        datasets: [{
            data: locationData.map(_=>_.value),
            backgroundColor: locationData.map((value)=>{

                return `rgba(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, 1)`;
            }),
        }],
        labels: locationData.map(_=>_.label)
    }
});

new Chart(states_pie, {
    type: 'pie',
    options:{
        title:{
            display:true,
            text:'All files by States'
        }
    },
    data: {
        datasets: [{
            data: stateData.map(_=>_.value),
            backgroundColor: stateData.map((value)=>{
                Math.random()
                return `rgba(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, ${Math.random()})`;
            }),
        }],

        labels: stateData.map(_=>_.label)
    }
});

new Chart(review_pie, {
    type: 'pie',
    options:{
        title:{
            display:true,
            text:'All files by Review status'
        }
    },
    data: {
        datasets: [{
            data: reviewStatusData.map(_=>_.value),
            backgroundColor: reviewStatusData.map((value)=>{
                Math.random()
                return `rgba(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, ${Math.random()})`;
            }),
        }],

        labels: reviewStatusData.map(_=>_.label)
    }
});

locationStateData.forEach((locationState)=>{
    const canvasContext = document.getElementById(locationState.canvas).getContext('2d');
    locationState.data.sort(sortFromLargestToSmallest)
    new Chart(canvasContext, {
        type: 'pie',
        options:{
            title:{
                display:true,
                text:locationState.title
            }
        },
        data: {
            datasets: [{
                data: locationState.data.map(_=>_.value),
                backgroundColor: locationState.data.map((value)=>{

                    return `rgba(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, 1)`;
                }),
            }],
            labels: locationState.data.map(_=>_.label)
        }
    });
})

