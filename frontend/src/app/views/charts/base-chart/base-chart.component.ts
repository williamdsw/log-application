import { Component } from '@angular/core';

import { Label, Color } from 'ng2-charts';
import { ChartOptions, ChartPluginsOptions, ChartType } from 'chart.js';

@Component ({
    selector: 'app-base-chart',
    template: '<div></div>'
})
export abstract class BaseChartComponent {

    // FIELDS

    public chartLabels: Label[] = [];
    public chartOptions: ChartOptions = {
        responsive: true,
    };
    public chartColors: Color[] = [];
    public chartLegend = true;
    public chartPlugins: ChartPluginsOptions = [];
    public chartType: ChartType;

    public isLoading = true;
    public count = 0;

    // CONSTRUCTOR

    constructor() {}
}
