import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError, tap, first } from 'rxjs/operators';

import { AlertModalService } from 'src/app/services/alert-modal.service';
import { PagerService } from 'src/app/services/pager.service';
import { LogService } from 'src/app/services/domain/log.service';

import { LogUtils } from 'src/app/shared/utils/log-utils';

import { IPageLogDTO } from 'src/app/models/ipage-log.dto';
import { ILogDTO } from 'src/app/models/ilog.dto';
import { RequestParam } from 'src/app/models/request-param';

@Component({
  selector: 'app-search-logs',
  templateUrl: './search-logs.component.html',
})
export class SearchLogsComponent implements OnInit {

  // Fields

  public currentFilter = 'none';
  public hasError = false;
  public errorTitle = 'Error';
  public errorMessage = 'System error! Please, try again or contact the Administrator.';

  // References
  @ViewChild('filterCombo', { static: true })
  public filterCombo: ElementRef<HTMLSelectElement>;

  @ViewChild('ipAddressInput', { static: true })
  public ipAddressInput: ElementRef<HTMLInputElement>;

  @ViewChild('startDateInput', { static: true })
  public startDateInput: ElementRef<HTMLInputElement>;

  @ViewChild('startTimeInput', { static: true })
  public startTimeInput: ElementRef<HTMLInputElement>;

  @ViewChild('endDateInput', { static: true })
  public endDateInput: ElementRef<HTMLInputElement>;

  @ViewChild('endTimeInput', { static: true })
  public endTimeInput: ElementRef<HTMLInputElement>;

  // Only table related
  public records$: Observable<IPageLogDTO>;
  public logs: ILogDTO[] = [];
  public pageNumber = 0;
  public linesPerPage = 10;
  public tableHeaders: string[] = [
    'Id', 'Data', 'IP', 'Request', 'Status', 'User Agent'
  ];
  public linesPerPageOptions: string[] = [
    '10', '25', '50', '100', '500', '1000'
  ];
  public pager: any = {};
  public pagedItems: any[] = [];

  // CONSTRUCTOR

  constructor(
    private alertModalService: AlertModalService,
    private pagerService: PagerService,
    private logService: LogService,
  ) { }

  // LIFECYCLE HOOKS

  ngOnInit(): void {
    this.onReload();
  }

  // HELPER FUNCTIONS

  public onReload(): void {
    this.hasError = false;
    this.records$ = this.loadData('none');
  }

  private loadData(filter?: string, firstValue?: string, secondValue?: string): Observable<any> {
    const params: RequestParam[] = [
      { key: 'pageNumber', value: this.pageNumber.toString() },
      { key: 'linesPerPage', value: this.linesPerPage.toString() },
    ];

    switch (filter) {
      case 'ip-address': {
        params.push({ key: 'value', value: firstValue });
        return this.pipeFindAll(
          this.logService.findByParamsWhereUrlIs(`${this.logService.baseUrl}/ip`, params)
        );
      }

      case 'datetime': {
        params.push({ key: 'start', value: firstValue });
        params.push({ key: 'end', value: secondValue });
        return this.pipeFindAll(
          this.logService.findByParamsWhereUrlIs(`${this.logService.baseUrl}/data`, params)
        );
      }

      case 'none': default: {
        return this.pipeFindAll(
          this.logService.findByParamsWhereUrlIs(this.logService.baseUrl, params)
        );
      }
    }
  }

  private pipeFindAll(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      map((pageLog: IPageLogDTO) => {
        this.hasError = false;
        return pageLog;
      }),
      tap((pageLog: IPageLogDTO) => {
        this.logs = pageLog.content;
        this.setPage(pageLog.totalElements, this.pageNumber + 1, this.linesPerPage);
      }),
      catchError(() => {
        this.hasError = true;
        this.handleError(this.errorTitle, this.errorMessage);
        return EMPTY;
      })
    ) as Observable<any>;
  }

  public toggleFilter(filter: string): void {
    this.currentFilter = filter;

    if (this.currentFilter === 'none') {
      this.onSearch ();
    }
  }

  public onSearch(): void {
    switch (this.currentFilter) {
      case 'ip-address': {
        this.hasError = false;
        const input = this.ipAddressInput.nativeElement as HTMLInputElement;
        this.records$ = this.loadData(this.currentFilter, input.value);
        break;
      }

      case 'datetime': {
        const startDate = this.startDateInput.nativeElement.value;
        const startTime = this.startTimeInput.nativeElement.value;
        const endDate = this.endDateInput.nativeElement.value;
        const endTime = this.endTimeInput.nativeElement.value;
 
        let startDateTime = `${startDate} ${startTime}`;
        let endDateTime = `${endDate} ${endTime}`;

        startDateTime += (startDateTime.length === 16 ? ':00' : '');
        endDateTime += (endDateTime.length === 16 ? ':00' : '');

        if (LogUtils.validateStartAndEndDates (startDateTime, endDateTime)) {
          this.hasError = false;
          this.records$ = this.loadData(this.currentFilter, startDateTime, endDateTime);
        }
        else {
          this.alertModalService.showDanger ('Attention', 'Insert valid dates for Start and End');
        }

        break;
      }

      case 'none': default: {
        this.hasError = false;
        this.records$ = this.loadData(this.currentFilter);
        break;
      }
    }
  }

  public handleError(title: string, message: string): void {
    this.alertModalService.showDanger(title, message);
  }

  public setPage(totalItems: number, currentPage: number, pageSize: number): void {
    this.pager = this.pagerService.getPager(totalItems, currentPage, pageSize);
    this.pagedItems = this.logs.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  public changePage(currentPage: number): void {
    this.pageNumber = currentPage - 1;
    this.onSearch ();
  }
}
