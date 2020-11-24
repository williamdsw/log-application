import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { LogUtils } from 'src/app/shared/utils/log-utils';

import { AlertModalService } from 'src/app/services/alert-modal.service';
import { LogService } from 'src/app/services/domain/log.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // FIELDS

  public currentFilter = 'ip-address';
  private subscription$: Subscription;
  private divNumberOfRequestResult: HTMLDivElement;

  // CONSTRUCTOR

  constructor(
    private alertModalService: AlertModalService,
    private logService: LogService
    ) {
    this.subscription$ = new Subscription ();
   }

  // LIFECYCLE HOOKS

  ngOnInit() {
    this.divNumberOfRequestResult = document.getElementById ('numberOfRequestResult') as HTMLDivElement;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe ();
  }

  // HELPER FUNCTIONS

  public toggleFilter(filter: string) {
    this.currentFilter = filter;
  }

  public getUserAgent(input: HTMLInputElement) {
    input.value = navigator.userAgent;
  }

  private search(observable: Observable<any>, fieldValue: string) {
    this.subscription$ = observable.subscribe (
      (dto: any) => {
        this.divNumberOfRequestResult.classList.replace ('d-none', 'd-block');
        const content = (dto.count >= 1 ? `Found ${dto.count} request(s) for ${fieldValue !== '' ? fieldValue : '...'} ` : `Nothing was found for ${fieldValue}`);
        this.divNumberOfRequestResult.innerHTML = `<b>${content}</b>`;
      },
      error => {
        console.log ('response', error);
        this.alertModalService.showDanger('Error', 'System error! Please, try again or contact the Administrator.');
      }
    );
  }

  public onSearch() {
    switch (this.currentFilter) {
      case 'datetime': {
        const inputStartDate = document.getElementById('inputStartDate') as HTMLInputElement;
        const inputStartTime = document.getElementById('inputStartTime') as HTMLInputElement;
        const inputEndDate = document.getElementById('inputEndDate') as HTMLInputElement;
        const inputEndTime = document.getElementById('inputEndTime') as HTMLInputElement;

        let startDateTime = `${inputStartDate.value} ${inputStartTime.value}`;
        let endDateTime = `${inputEndDate.value} ${inputEndTime.value}`;

        startDateTime += (startDateTime.length === 16 ? ':00' : '');
        endDateTime += (endDateTime.length === 16 ? ':00' : '');

        if (LogUtils.validateStartAndEndDates (startDateTime, endDateTime)) {
          this.search (this.logService.getNumberOfRequestsByDataBetween (startDateTime, endDateTime), 'Dates');
        }
        else {
          this.alertModalService.showDanger ('Error', 'Inform a valid date for Start and End');
        }

        break;
      }

      case 'user-agent': {
        const inputUserAgent = document.getElementById('inputUserAgent') as HTMLInputElement;
        this.search (this.logService.getNumberOfRequestsByUserAgent (inputUserAgent.value), inputUserAgent.value);
        break;
      }

      case 'ip-address': default: {
        const inputIpAddress = document.getElementById('inputIpAddress') as HTMLInputElement;

        if (LogUtils.checkValidIpAddress (inputIpAddress.value)) {
          this.search (this.logService.getNumberOfRequestsByIp (inputIpAddress.value), inputIpAddress.value);
        }
        else {
          this.alertModalService.showDanger ('Error', 'Inform a valid IP');
        }

        break;
      }
    }
  }
}
