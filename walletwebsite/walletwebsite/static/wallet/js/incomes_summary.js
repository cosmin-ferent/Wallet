const renderIncomesOneMChart = (data, labels)=>{
    var ctx = document.getElementById('myIncomesChart1M').getContext('2d');
    var myIncomesChart1M = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Source',
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
                text: "Your incomes for last 30 days",
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

const getIncomesOneMChartData=()=>{
    console.log("fetching");
    fetch("/incomes_summary_by_source")
    .then((res)=>res.json())
     .then((results)=>{
        console.log("results", results);
        const source_data = results.one_month_incomes_source_data;
        const [labels, data]=[Object.keys(source_data), Object.values(source_data)];

        renderIncomesOneMChart(data, labels);
    });
};

document.onload = getIncomesOneMChartData();


const renderIncomesSixMChart = (data, labels)=>{
    var ctx = document.getElementById('myIncomesChart6M').getContext('2d');
    var myIncomesChart6M = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Source',
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
                text: "Your incomes for last 6 months",
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

const getIncomesSixMChartData=()=>{
    console.log("fetching");
    fetch("/incomes_summary_by_source")
    .then((res)=>res.json())
     .then((results)=>{
        console.log("results", results);
        const source_data = results.six_months_incomes_source_data;
        const [labels, data]=[Object.keys(source_data), Object.values(source_data)];

        renderIncomesSixMChart(data, labels);
    });
};

document.onload = getIncomesSixMChartData();
