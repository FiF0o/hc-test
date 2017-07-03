/**
 * Created by jonlazarini on 30/06/17.
 */
$(document).ready(function () {


    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    var POLL_INTERVAL = 5000, //ms
        yMaxAxis = 10,
        POINTS_TO_PLOT = 5,
        NUM_FORMAT = 0; // decimal points

    Highcharts.chart('spline_line', {
        credits: {
            enabled: false
        },
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {

                    // set up the updating of the chart each POLL_INTERVAL ms
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Math.round(Math.random()*yMaxAxis) + 1;
                        series.addPoint([x, y], true, true); // init polling data
                    }, POLL_INTERVAL);
                }
            },
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            labels: {
                enabled: false
            }
        },
        yAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            plotLines: [{
                value: 0,
                width: .5,
                color: '#000000'
            }]
        },
        tooltip: {
            enabled: false
            /*formatter: function () {
             return '<b>' + this.series.name + '</b><br/>' +
             Highcharts.dateFormat('%d-%m-%Y %H:%M:%S', this.x) + '<br/>' +
             Highcharts.numberFormat(this.y, NUM_FORMAT);
             }*/
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: '',
            showInLegend: false,
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -POINTS_TO_PLOT; i <= 0; i += 1) {
                    data.push({
                        x: time + i * POLL_INTERVAL,
                        y: Math.round(Math.random()*yMaxAxis) + 1
                    });
                }
                return data;
            }())
        }]
    });

    var neg_chart = Highcharts.chart({
        chart: {
            type: 'column',
            //  width: window.innerWidth,
            renderTo: 'neg_chart',
            margin: 0,
        },
        plotOptions: {
            series: {
                pointPadding: 0,
                groupPadding: 0
            }
        },
        title: {
            text: '',
            style: {
                display: 'none'
            }
        },
        xAxis: {
            labels: {
                enabled: false
            },
            categories: ['']
        },
        yAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: null
            }
        },
        tooltip: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        series: [
            /*      {
             name: 'John',
             data: [5, 3, 4, 7, 2]
             }, {
             name: 'Jane',
             data: [2, -2, -3, 2, 1]
             },*/
            {
                // name: 'Joe',
                data: [3, 4, 4, -2, 5],
                showInLegend: false
                // pointWidth: 10,
                // pointPadding: 0,
                // groupPadding: 0.01,
            }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom'
                        ,
                        layout: 'horizontal'
                    },
                    yAxis: {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5,
                            enabled: false
                        },
                        title: {
                            text: null
                        }
                    },
                    subtitle: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    }
                }
            }]
        }
    });

});