import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { AlertModalService } from 'src/app/services/alert-modal.service';
import { PagerService } from 'src/app/services/pager.service';
import { LogService } from 'src/app/services/domain/log.service';

import { IPageLogDTO } from 'src/app/models/ipage-log.dto';
import { ILogDTO } from 'src/app/models/ilog.dto';
import { LogUtils } from 'src/app/shared/utils/log-utils';

@Component({
  selector: 'app-search-logs',
  templateUrl: './search-logs.component.html',
  styleUrls: ['./search-logs.component.css']
})
export class SearchLogsComponent implements OnInit {

  // FIELDS

  public currentFilter = 'none';

  public hasError = false;
  public errorTitle = 'Error';
  public errorMessage = 'System error! Please, try again or contact the Administrator.';

  // Only table related
  public records$: Observable<IPageLogDTO>;
  public logs: ILogDTO[] = [];
  public pageNumber = 0;
  public linesPerPage = 10;
  public tableHeaders: string[] = [
    'Id', 'Data', 'IP', 'Request', 'Status', 'User Agent'
  ];
  public linesPerPageOptions: string[] = ['10', '25', '50', '100', '500', '1000'];
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

  private loadData(filter?: string, firstValue?: string, secondValue?: string) {

    switch (filter) {
      case 'ip-address': {
        return this.pipeFindAll(
          this.logService.findAllByIp(firstValue, this.pageNumber.toString(), this.linesPerPage.toString())
        );
      }

      case 'datetime': {
        return this.pipeFindAll(
          this.logService.findAllByDataBetween(firstValue, secondValue, this.pageNumber.toString(), this.linesPerPage.toString())
        );
      }

      case 'none': default: {
        return this.pipeFindAll(
          this.logService.findAll(this.pageNumber.toString(), this.linesPerPage.toString())
        );
      }
    }
  }

  private pipeFindAll(observable: Observable<any>) {
    return observable.pipe(
      map((pageLog: IPageLogDTO) => {
        this.hasError = false;
        return pageLog;
      }),
      tap((pageLog: IPageLogDTO) => {
        this.logs = pageLog.content;
        this.setPage(pageLog.totalElements, this.pageNumber + 1, this.linesPerPage);
      }),
      catchError(error => {
        this.hasError = true;
        this.handleError(this.errorTitle, this.errorMessage);
        return EMPTY;
      })
    ) as Observable<any>;
  }

  public toggleFilter(filter: string) {
    this.currentFilter = filter;

    if (this.currentFilter === 'none') {
      this.onSearch ();
    }
  }

  public onSearch() {
    switch (this.currentFilter) {
      case 'ip-address': {
        this.hasError = false;
        const inputIpAddress = document.getElementById('inputIpAddress') as HTMLInputElement;
        this.records$ = this.loadData(this.currentFilter, inputIpAddress.value);
        break;
      }

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
          this.hasError = false;
          this.records$ = this.loadData(this.currentFilter, startDateTime, endDateTime);
        }
        else {
          this.alertModalService.showDanger ('Error', 'Insert valid dates for Start and End');
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

  public setPage(totalItems: number, currentPage: number, pageSize: number) {
    this.pager = this.pagerService.getPager(totalItems, currentPage, pageSize);
    this.pagedItems = this.logs.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  public changePage(currentPage: number) {
    this.pageNumber = currentPage - 1;
    this.onSearch ();
  }
}
