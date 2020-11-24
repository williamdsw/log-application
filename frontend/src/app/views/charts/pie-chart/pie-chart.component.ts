import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SingleDataSet } from 'ng2-charts';

import { ILogFieldsDTO } from 'src/app/models/ilog-fields.dto';

import { LogService } from 'src/app/services/domain/log.service';

import { BaseChartComponent } from '../base-chart/base-chart.component';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html'
})
export class PieChartComponent extends BaseChartComponent implements OnInit, OnDestroy {

  // FIELDS

  public pieChartData: SingleDataSet = Array(10).fill(1);
  private subscription$: Subscription;

  // CONSTRUCTOR

  constructor(private logService: LogService) {
    super();
    this.subscription$ = new Subscription();

    // overrides
    this.chartType = 'pie';
    this.chartOptions = { legend: { position: 'left' }};
  }

  // LIFECYCLE HOOKS

  ngOnInit(): void {
    this.subscription$ = this.getTenMostRequestsByUserAgent();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  // HELPER FUNCTIONS

  public toggleLegend() {
    this.chartLegend = !this.chartLegend;
  }

  private getTenMostRequestsByUserAgent() {
    return this.logService.getTenMostRequestsByUserAgent().subscribe(
      (listDto: ILogFieldsDTO[]) => {
        this.isLoading = false;
        const data = [];
        listDto.map(dto => {
          dto.userAgent = this.getContentFromUserAgent(dto.userAgent);
          this.chartLabels.push(dto.userAgent);
          data.push(dto.count);
        });

        this.count = data.reduce ((a, b) => a + b, 0);
        this.pieChartData = data;
      },
      error => {
        this.isLoading = false;
        this.count = 0;
      }
    );
  }

  private getContentFromUserAgent(userAgent: string) {
    const indexOfRightParenthesis = userAgent.indexOf('(');
    const indexOfLeftParenthesis = userAgent.indexOf(')');

    if (indexOfRightParenthesis === -1 || indexOfLeftParenthesis === -1) {
      return userAgent;
    }

    let substring = userAgent.substring(indexOfRightParenthesis, indexOfLeftParenthesis + 1);
    substring = substring.replace('(', '').replace(')', '');
    return substring;
  }
}
