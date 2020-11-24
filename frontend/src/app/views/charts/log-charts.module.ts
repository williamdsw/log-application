import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    LineChartComponent,
    PieChartComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    LineChartComponent,
    PieChartComponent,
    BarChartComponent
  ]
})
export class LogChartsModule { }
