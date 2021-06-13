const renderOneMChart = (data, labels)=>{
    var ctx = document.getElementById('myChart1M').getContext('2d');
    var myChart1M = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Your expenses for last 30 days',
                data: data,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.6)',
                    'rgba(0, 128, 0, 0.6)',
                    'rgba(0, 0, 255, 0.6)',
                    'rgba(255, 192, 203, 0.6)',
                    'rgba(255, 255, 0, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 0, 0, 0.9)',
                    'rgba(0, 128, 0, 0.9)',
                    'rgba(0, 0, 255, 0.9)',
                    'rgba(255, 192, 203, 0.9)',
                    'rgba(255, 255, 0, 0.9)',
                    'rgba(255, 99, 132, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                    'rgba(255, 206, 86, 0.9)',
                    'rgba(75, 192, 192, 0.9)',
                    'rgba(153, 102, 255, 0.9)',
                    'rgba(255, 159, 64, 0.9)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: "Last 30 days expenses per category",
            },
            legend: {
                position: "bottom"
            },
        },
    });
};

const getOneMChartData=()=>{
    console.log("fetching");
    fetch("/expenses_summary_by_category")
    .then((res)=>res.json())
     .then((results)=>{
        console.log("results", results);
        const category_data = results.one_month_expenses_category_data;
        const [labels, data]=[Object.keys(category_data), Object.values(category_data)];

        renderOneMChart(data, labels);
    });
};

document.onload = getOneMChartData();


const renderSixMChart = (data, labels)=>{
    var ctx = document.getElementById('myChart6M').getContext('2d');
    var myChart6M = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Your expenses for last 6 months',
                data: data,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.6)',
                    'rgba(0, 128, 0, 0.6)',
                    'rgba(0, 0, 255, 0.6)',
                    'rgba(255, 192, 203, 0.6)',
                    'rgba(255, 255, 0, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 0, 0, 0.9)',
                    'rgba(0, 128, 0, 0.9)',
                    'rgba(0, 0, 255, 0.9)',
                    'rgba(255, 192, 203, 0.9)',
                    'rgba(255, 255, 0, 0.9)',
                    'rgba(255, 99, 132, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                    'rgba(255, 206, 86, 0.9)',
                    'rgba(75, 192, 192, 0.9)',
                    'rgba(153, 102, 255, 0.9)',
                    'rgba(255, 159, 64, 0.9)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: "Last 6 months expenses per category",
            },
            legend: {
                position: "bottom"
            },
        },
    });
};

const getSixMChartData=()=>{
    console.log("fetching");
    fetch("/expenses_summary_by_category")
    .then((res)=>res.json())
     .then((results)=>{
        console.log("results", results);
        const category_data = results.six_months_expenses_category_data;
        const [labels, data]=[Object.keys(category_data), Object.values(category_data)];

        renderSixMChart(data, labels);
    });
};

document.onload = getSixMChartData();


const renderFoodOneMChart = (data, labels)=>{
    var ctx = document.getElementById('myFoodChart1M').getContext('2d');
    var myFoodChart1M = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Food',
                data: data,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.6)',
                    'rgba(0, 128, 0, 0.6)',
                    'rgba(0, 0, 255, 0.6)',
                    'rgba(255, 192, 203, 0.6)',
                    'rgba(255, 255, 0, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 0, 0, 0.9)',
                    'rgba(0, 128, 0, 0.9)',
                    'rgba(0, 0, 255, 0.9)',
                    'rgba(255, 192, 203, 0.9)',
                    'rgba(255, 255, 0, 0.9)',
                    'rgba(255, 99, 132, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                    'rgba(255, 206, 86, 0.9)',
                    'rgba(75, 192, 192, 0.9)',
                    'rgba(153, 102, 255, 0.9)',
                    'rgba(255, 159, 64, 0.9)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: "Your expenses with FOOD for last 30 days",
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        },
    });
};

const getFoodOneMChartData=()=>{
    console.log("fetching");
    fetch("/expenses_summary_by_category")
    .then((res)=>res.json())
     .then((results)=>{
        console.log("results", results);
        const description_data = results.one_month_food_expenses_data;
        const [labels, data]=[Object.keys(description_data), Object.values(description_data)];

        renderFoodOneMChart(data, labels);
    });
};

document.onload = getFoodOneMChartData();


const renderFoodSixMChart = (data, labels)=>{
    var ctx = document.getElementById('myFoodChart6M').getContext('2d');
    var myFoodChart6M = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Food',
                data: data,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.6)',
                    'rgba(0, 128, 0, 0.6)',
                    'rgba(0, 0, 255, 0.6)',
                    'rgba(255, 192, 203, 0.6)',
                    'rgba(255, 255, 0, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 0, 0, 0.9)',
                    'rgba(0, 128, 0, 0.9)',
                    'rgba(0, 0, 255, 0.9)',
                    'rgba(255, 192, 203, 0.9)',
                    'rgba(255, 255, 0, 0.9)',
                    'rgba(255, 99, 132, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                    'rgba(255, 206, 86, 0.9)',
                    'rgba(75, 192, 192, 0.9)',
                    'rgba(153, 102, 255, 0.9)',
                    'rgba(255, 159, 64, 0.9)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: "Your expenses with FOOD for last 6 months",
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        },
    });
};

const getFoodSixMChartData=()=>{
    console.log("fetching");
    fetch("/expenses_summary_by_category")
    .then((res)=>res.json())
     .then((results)=>{
        console.log("results", results);
        const description_data = results.six_months_food_expenses_data;
        const [labels, data]=[Object.keys(description_data), Object.values(description_data)];

        renderFoodSixMChart(data, labels);
    });
};

document.onload = getFoodSixMChartData();


const renderBeveragesOneMChart = (data, labels)=>{
    var ctx = document.getElementById('myBeveragesChart1M').getContext('2d');
    var myBeveragesChart1M = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Beverages',
                data: data,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.6)',
                    'rgba(0, 128, 0, 0.6)',
                    'rgba(0, 0, 255, 0.6)',
                    'rgba(255, 192, 203, 0.6)',
                    'rgba(255, 255, 0, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 0, 0, 0.9)',
                    'rgba(0, 128, 0, 0.9)',
                    'rgba(0, 0, 255, 0.9)',
                    'rgba(255, 192, 203, 0.9)',
                    'rgba(255, 255, 0, 0.9)',
                    'rgba(255, 99, 132, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                    'rgba(255, 206, 86, 0.9)',
                    'rgba(75, 192, 192, 0.9)',
                    'rgba(153, 102, 255, 0.9)',
                    'rgba(255, 159, 64, 0.9)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: "Your expenses with BEVERAGES for last 30 days",
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        },
    });
};

const getBeveragesOneMChartData=()=>{
    console.log("fetching");
    fetch("/expenses_summary_by_category")
    .then((res)=>res.json())
     .then((results)=>{
        console.log("results", results);
        const description_data = results.one_month_beverages_expenses_data;
        const [labels, data]=[Object.keys(description_data), Object.values(description_data)];

        renderBeveragesOneMChart(data, labels);
    });
};

document.onload = getBeveragesOneMChartData();


const renderBeveragesSixMChart = (data, labels)=>{
    var ctx = document.getElementById('myBeveragesChart6M').getContext('2d');
    var myBeveragesChart6M = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Beverages',
                data: data,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.6)',
                    'rgba(0, 128, 0, 0.6)',
                    'rgba(0, 0, 255, 0.6)',
                    'rgba(255, 192, 203, 0.6)',
                    'rgba(255, 255, 0, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 0, 0, 0.9)',
                    'rgba(0, 128, 0, 0.9)',
                    'rgba(0, 0, 255, 0.9)',
                    'rgba(255, 192, 203, 0.9)',
                    'rgba(255, 255, 0, 0.9)',
                    'rgba(255, 99, 132, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                    'rgba(255, 206, 86, 0.9)',
                    'rgba(75, 192, 192, 0.9)',
                    'rgba(153, 102, 255, 0.9)',
                    'rgba(255, 159, 64, 0.9)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: "Your expenses with BEVERAGES for last 6 months",
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        },
    });
};

const getBeveragesSixMChartData=()=>{
    console.log("fetching");
    fetch("/expenses_summary_by_category")
    .then((res)=>res.json())
     .then((results)=>{
        console.log("results", results);
        const description_data = results.six_months_beverages_expenses_data;
        const [labels, data]=[Object.keys(description_data), Object.values(description_data)];

        renderBeveragesSixMChart(data, labels);
    });
};

document.onload = getBeveragesSixMChartData();


const renderUtilitiesOneMChart = (data, labels)=>{
    var ctx = document.getElementById('myUtilitiesChart1M').getContext('2d');
    var myUtilitiesChart1M = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Utilities',
                data: data,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.6)',
                    'rgba(0, 128, 0, 0.6)',
                    'rgba(0, 0, 255, 0.6)',
                    'rgba(255, 192, 203, 0.6)',
                    'rgba(255, 255, 0, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 0, 0, 0.9)',
                    'rgba(0, 128, 0, 0.9)',
                    'rgba(0, 0, 255, 0.9)',
                    'rgba(255, 192, 203, 0.9)',
                    'rgba(255, 255, 0, 0.9)',
                    'rgba(255, 99, 132, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                    'rgba(255, 206, 86, 0.9)',
                    'rgba(75, 192, 192, 0.9)',
                    'rgba(153, 102, 255, 0.9)',
                    'rgba(255, 159, 64, 0.9)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: "Your expenses with UTILITIES for last 30 days",
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        },
    });
};

const getUtilitiesOneMChartData=()=>{
    console.log("fetching");
    fetch("/expenses_summary_by_category")
    .then((res)=>res.json())
     .then((results)=>{
        console.log("results", results);
        const description_data = results.one_month_utilities_expenses_data;
        const [labels, data]=[Object.keys(description_data), Object.values(description_data)];

        renderUtilitiesOneMChart(data, labels);
    });
};

document.onload = getUtilitiesOneMChartData();


const renderUtilitiesSixMChart = (data, labels)=>{
    var ctx = document.getElementById('myUtilitiesChart6M').getContext('2d');
    var myUtilitiesChart6M = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Utilities',
                data: data,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.6)',
                    'rgba(0, 128, 0, 0.6)',
                    'rgba(0, 0, 255, 0.6)',
                    'rgba(255, 192, 203, 0.6)',
                    'rgba(255, 255, 0, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 0, 0, 0.9)',
                    'rgba(0, 128, 0, 0.9)',
                    'rgba(0, 0, 255, 0.9)',
                    'rgba(255, 192, 203, 0.9)',
                    'rgba(255, 255, 0, 0.9)',
                    'rgba(255, 99, 132, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                    'rgba(255, 206, 86, 0.9)',
                    'rgba(75, 192, 192, 0.9)',
                    'rgba(153, 102, 255, 0.9)',
                    'rgba(255, 159, 64, 0.9)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 0, 0, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 192, 203, 1)',
                    'rgba(255, 255, 0, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: "Your expenses with UTILITIES for last 6 months",
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        },
    });
};

const getUtilitiesSixMChartData=()=>{
    console.log("fetching");
    fetch("/expenses_summary_by_category")
    .then((res)=>res.json())
     .then((results)=>{
        console.log("results", results);
        const description_data = results.six_months_utilities_expenses_data;
        const [labels, data]=[Object.keys(description_data), Object.values(description_data)];

        renderUtilitiesSixMChart(data, labels);
    });
};

document.onload = getUtilitiesSixMChartData();
