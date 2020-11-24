import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChartDataSets } from 'chart.js';

import { ILogFieldsDTO } from 'src/app/models/ilog-fields.dto';

import { LogService } from 'src/app/services/domain/log.service';

import { BaseChartComponent } from '../base-chart/base-chart.component';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html'
})
export class LineChartComponent extends BaseChartComponent implements OnInit, OnDestroy {

  // FIELDS

  public lineChartData: ChartDataSets[] = [];
  private subscription$: Subscription;

  // CONSTRUCTOR

  constructor(private logService: LogService) {
    super();

    this.subscription$ = new Subscription();

    // override
    this.chartColors = [{
      borderColor: 'rgba(50, 180, 220, 1)',
      backgroundColor: 'rgba(160, 188, 227, 0.80)'
    }];
    this.chartType = 'line';
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {
    this.subscription$ = this.getTenMostRequestsByIp ();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe ();
  }

  // HELPER FUNCTIONS

  private getTenMostRequestsByIp() {
    return this.logService.getTenMostRequestsByIp().subscribe(
      (listDto: ILogFieldsDTO[]) => {
        this.isLoading = false;
        const data = [];
        listDto.map (dto => {
          this.chartLabels.push (dto.ip);
          data.push (dto.count);
        });

        this.count = data.reduce ((a, b) => a + b, 0);
        this.lineChartData = [{ data, label: 'Most 10 Requests By IP' }];
      },
      error => {
        this.isLoading = false;
        this.count = 0;
      },
    );
  }
}
