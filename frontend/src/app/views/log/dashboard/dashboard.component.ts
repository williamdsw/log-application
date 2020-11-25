import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { LogUtils } from 'src/app/shared/utils/log-utils';

import { AlertModalService } from 'src/app/services/alert-modal.service';
import { LogService } from 'src/app/services/domain/log.service';
import { RequestParam } from 'src/app/models/request-param';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  // Fields

  public currentFilter = 'ip-address';
  public message: string;
  private subscription$: Subscription;

  @ViewChild('ipAddressInput', { static: true })
  private ipAddressInput: ElementRef<HTMLInputElement>;

  @ViewChild('userAgentInput', { static: true })
  private userAgentInput: ElementRef<HTMLInputElement>;

  @ViewChild('startDateInput', { static: true })
  private startDateInput: ElementRef<HTMLInputElement>;

  @ViewChild('startTimeInput', { static: true })
  private startTimeInput: ElementRef<HTMLInputElement>;

  @ViewChild('endDateInput', { static: true })
  private endDateInput: ElementRef<HTMLInputElement>;

  @ViewChild('endTimeInput', { static: true })
  private endTimeInput: ElementRef<HTMLInputElement>;

  @ViewChild('numberOfRequestContainer', { static: true })
  private numberOfRequestContainer: ElementRef<HTMLDivElement>;
  private container: HTMLDivElement;

  // CONSTRUCTOR

  constructor(
    private alertModalService: AlertModalService,
    private logService: LogService
    ) {
    this.subscription$ = new Subscription ();
   }

  // LIFECYCLE HOOKS

  ngOnInit() {
    this.container = this.numberOfRequestContainer.nativeElement;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe ();
  }

  // HELPER FUNCTIONS

  public toggleFilter(filter: string) {
    this.currentFilter = filter;
  }

  public getUserAgent() {
    this.userAgentInput.nativeElement.value = navigator.userAgent;
  }

  private search(observable: Observable<any>, fieldValue: string) {
    this.subscription$ = observable.subscribe (
      (dto: any) => {
        if (dto.count >= 1) {
          this.message = `Found <b> ${dto.count} </b> request(s) for <b> ${fieldValue !== '' ? fieldValue : '...'} </b>`;
        }
        else {
          this.message = `Nothing was found for ${fieldValue}`;
        }

        this.container.classList.replace ('d-none', 'd-block');
      },
      error => {
        console.log ('response', error);
        this.alertModalService.showDanger('Error', 'System error! Please, try again or contact the Administrator.');
      }
    );
  }

  public onSearch() {
    const params: RequestParam[] = [];

    switch (this.currentFilter) {
      case 'datetime': {
        const startDate = this.startDateInput.nativeElement.value;
        const startTime = this.startTimeInput.nativeElement.value;
        const endDate = this.endDateInput.nativeElement.value;
        const endTime = this.endTimeInput.nativeElement.value;

        let startDateTime = `${startDate} ${startTime}`;
        let endDateTime = `${endDate} ${endTime}`;

        startDateTime += (startDateTime.length === 16 ? ':00' : '');
        endDateTime += (endDateTime.length === 16 ? ':00' : '');

        if (LogUtils.validateStartAndEndDates(startDateTime, endDateTime)) {
          params.push({ key: 'start', value: startDateTime });
          params.push({ key: 'end', value: endDateTime });
          const url = `${this.logService.baseUrl}/number-of-requests-data`;
          this.search(this.logService.findByParamsWhereUrlIs(url, params), 'dates interval');
        }
        else {
          this.alertModalService.showDanger ('Error', 'Inform a valid date for Start and End');
        }

        break;
      }

      case 'user-agent': {
        const userAgent = this.userAgentInput.nativeElement.value;
        params.push({ key: 'value', value: userAgent });
        const url = `${this.logService.baseUrl}/number-of-requests-user-agent`;
        this.search(this.logService.findByParamsWhereUrlIs(url, params), `User Agent: ${userAgent}`);
        break;
      }

      case 'ip-address': default: {
        const ip = this.ipAddressInput.nativeElement.value;

        if (LogUtils.checkValidIpAddress(ip)) {
          params.push({ key: 'value', value: ip });
          const url = `${this.logService.baseUrl}/number-of-requests-ip`;
          this.search(this.logService.findByParamsWhereUrlIs(url, params), `IP: ${ip}`);
        }
        else {
          this.alertModalService.showDanger ('Error', 'Inform a valid IP');
        }

        break;
      }
    }
  }
}
