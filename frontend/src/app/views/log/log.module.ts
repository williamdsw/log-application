import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { LogRoutingModule } from './log-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LogChartsModule } from '../charts/log-charts.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ManualLogComponent } from './manual-log/manual-log.component';
import { BatchLogComponent } from './batch-log/batch-log.component';
import { SearchLogsComponent } from './search-logs/search-logs.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ManualLogComponent,
    BatchLogComponent,
    SearchLogsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LogRoutingModule,
    SharedModule,
    ChartsModule,
    LogChartsModule
  ]
})
export class LogModule { }
