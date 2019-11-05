function sliderChange(val) {
    //This opens a function for the interpretation of the data from the slider
    document.getElementById('sliderVal').innerHTML = val;
    //This puts the data from the slider into the variable 'val'
}

const buttonSend = document.getElementById('submit1');
buttonSend.addEventListener('click', async event => {
    //This tells the program to get the data submitted when the submit button is pressed
    const happiness = document.getElementById('happiness').value;
    //This puts the data nto variables to be put in the database with the name 'happiness'
    const Profanity = document.getElementById('Profanity').value;
    //This puts the data into variables to be put in the database with the name 'Profanity'

    //This also places both data sets into one piece of data in the database so they can be displayed on the chart simultaneously 

    const data = { Profanity, happiness };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        //This sends both sets of database
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    //In total this block sets the submit button to take the data from the two input methods and submits it to the database file as one array

    chartIt();
    //This refreshes and draws rhe chart every time new data is submitted

});
async function chartIt() {
    //This opens up the functon which conatains the chart
    const response = await fetch('/api');
    const data = await response.json();
    //This implements the code written in the index.js file

    let xVals = [];
    let yVals = [];
    let yVals2 = [];
    //These sets up the variables that will be usesd to apply the submitted data to the chart


    for (let i = 0; i < data.length; i++) {
        xVals[i] = new Date(data[i].timestamp).toLocaleString();
        yVals[i] = data[i].Profanity;
        yVals2[i] = data[i].happiness;

        //This for loop puts the data into the variables and turns it into more user friendly format


    }

    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        //This uses the chart.js library to creat a new chart with the properties below
        type: 'line',
        //This sets the type of graph to a line graph
        data: {
            labels: xVals,
            //This tells the chart to use the data put into the 'xVals' variable for the x axis
            datasets: [{
                    label: 'Profanity over time',
                    //This labels one set of data as Profanity
                    yAxisID: 'A',
                    //This places this set of data on the lefthand Y Axis
                    data: yVals,
                    //This tells the chart to use the data put into the 'yVals' variable for this Y Axis
                    fill: true,
                    //This makes the chart display the data as a filled shaped rather than a single line
                    backgroundColor: 'rgba(0, 100, 255,0.3)',
                    //This sets the colour for the filled in shape
                    borderColor: 'rgba(0, 100, 255,0.3)',
                    //This sets the colour for the line
                    borderWidth: 3,
                    //This sets the width of the line displayed on the chart
                    pointStyle: 'dash',
                    //This sets the shape of the points on the chart
                    pointRadius: 3,
                    //This sets how big the points displayed are
                },
                {
                    label: 'Happiness over time',
                    //This labels one set of data as Happiness
                    yAxisID: 'B',
                    //This places this set of data on the Righthand Y Axis
                    data: yVals2,
                    //This tells the chart to use the data put into the 'yVals2' variable for this Y Axis
                    fill: true,
                    //This makes the chart display the data as a filled shaped rather than a single line
                    backgroundColor: 'rgba(255, 0, 0,0.3)',
                    //This sets the colour for the filled in shape
                    borderColor: 'rgba(255, 0, 0, 0.3)',
                    //This sets the colour for the line
                    borderWidth: 3,
                    //This sets the width of the line displayed on the chart
                    pointStyle: 'dash',
                    //This sets the shape of the points on the chart
                    pointRadius: 3,
                    //This sets how big the points displayed are


                },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    //This sets up the Y axes
                    id: 'A',
                    //This give the axis an id to be used to apply certain data too
                    type: 'linear',
                    //This sets the type of axis
                    position: 'left',
                    //This sets which side to place this axis

                    gridLines: {
                        display: false,
                        //This tells the chart not to display the background grid for this axis
                    },
                }, {
                    id: 'B',
                    //This give the axis an id to be used to apply certain data too
                    type: 'linear',
                    //This sets the type of axis
                    position: 'right',
                    //This sets which side to place this axis

                    gridLines: {
                        display: false,
                        //This tells the chart not to display the background grid for this axis
                    },
                }],

                xAxes: [{
                    gridLines: {
                        display: false,
                        //This tells the chart not to display the background grid for this axis
                    },
                }],
            },
            legend: {
                labels: {
                    fontColor: 'white',
                    //This sets the colour of the text in the chart
                    fontFamily: 'Trebuchet MS',
                    //This sets the font of the text in the chart
                }
            },
        }
    });

}