import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChartDataSets } from 'chart.js';

import { LogService } from 'src/app/services/domain/log.service';

import { ILogFieldsDTO } from 'src/app/models/ilog-fields.dto';

import { BaseChartComponent } from '../base-chart/base-chart.component';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html'
})
export class BarChartComponent extends BaseChartComponent implements OnInit, OnDestroy {

  // FIELDS

  public barChartData: ChartDataSets[] = [];
  private subscription$: Subscription;

  // CONSTRUCTOR

  constructor(private logService: LogService) {
    super();

    this.subscription$ = new Subscription();

    // override
    this.chartColors = [{
      borderColor: 'black',
      backgroundColor: 'rgba(160, 188, 227, 0.81)'
    }];
    this.chartType = 'horizontalBar';
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {
    this.subscription$ = this.getTenMostRequestsByData ();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe ();
  }

  // HELPER FUNCTIONS

  private getTenMostRequestsByData(): Subscription {
    const url = this.logService.baseUrl + '/ten-most-requests-by-data';
    return this.logService.findByWhereUrlIsWithPipe(url).subscribe(
      (listDto: ILogFieldsDTO[]) => {
        this.isLoading = false;
        const data = [];
        listDto.map (dto => {
          this.chartLabels.push (dto.hour);
          data.push (dto.count);
        });

        this.count = data.reduce ((a, b) => a + b, 0);
        this.barChartData = [{ data, label: 'Most 10 Requests By Hour' }];
      },
      () => {
        this.isLoading = false;
        this.count = 0;
      },
    );
  }
}
