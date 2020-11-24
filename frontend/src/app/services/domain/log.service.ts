import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { CrudService } from '../crud.service';

import { ILogDTO } from 'src/app/models/ilog.dto';
import { ILogNewDTO } from 'src/app/models/ilog.new.dto';
import { IPageLogDTO } from 'src/app/models/ipage-log.dto';
import { ILogFieldsDTO } from 'src/app/models/ilog-fields.dto';

@Injectable({
  providedIn: 'root'
})
export class LogService extends CrudService<ILogDTO | ILogNewDTO | IPageLogDTO | ILogFieldsDTO> {

  // CONSTRUCTOR

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  // HELPER FUNCTIONS

  // -> INSERT

  public insertLog(log: ILogNewDTO) {
    return this.insert(`${environment.API}/api/logs`, log);
  }

  public insertLogFiles(files: FileList) {
    const URL = `${environment.API}/api/logs/batch`;
    const FORM_DATA = new FormData();

    for (let index = 0; index < files.length; index++) {
      FORM_DATA.append ('file', files.item (index));
    }

    return this.httpClient.post (URL, FORM_DATA, { observe: 'response' });
  }

  // -> FIND

  public findAll(pageNumber: string, linesPerPage: string) {
    let params = new HttpParams ();
    params = params.append ('pageNumber', pageNumber);
    params = params.append ('linesPerPage', linesPerPage);
    return this.listAll (`${environment.API}/api/logs`, params);
  }

  public findAllByIp(ip: string, pageNumber: string, linesPerPage: string) {
    let params = new HttpParams ();
    params = params.append ('value', ip);
    params = params.append ('pageNumber', pageNumber);
    params = params.append ('linesPerPage', linesPerPage);
    return this.listAll (`${environment.API}/api/logs/ip`, params);
  }

  public findAllByDataBetween(start: string, end: string, pageNumber: string, linesPerPage: string) {
    let params = new HttpParams ();
    params = params.append ('start', start);
    params = params.append ('end', end);
    params = params.append ('pageNumber', pageNumber);
    params = params.append ('linesPerPage', linesPerPage);
    return this.listAll (`${environment.API}/api/logs/data`, params);
  }

  public findUserIpAddress() {
    return this.httpClient.get ('https://api.ipify.org/?format=json').pipe (take (1));
  }

  // -> AGRREGATIONS

  public getTenMostRequestsByIp() {
    return this.listAll (`${environment.API}/api/logs/ten-most-requests-by-ip`).pipe (take (1));
  }

  public getTenMostRequestsByUserAgent() {
    return this.listAll (`${environment.API}/api/logs/ten-most-requests-by-user-agent`).pipe (take (1));
  }

  public getTenMostRequestsByData() {
    return this.listAll (`${environment.API}/api/logs/ten-most-requests-by-data`).pipe (take (1));
  }

  public getNumberOfRequestsByIp(ip: string) {
    let params = new HttpParams ();
    params = params.append ('value', ip);
    return this.listAll (`${environment.API}/api/logs/number-of-requests-ip`, params);
  }

  public getNumberOfRequestsByUserAgent(userAgent: string) {
    let params = new HttpParams ();
    params = params.append ('value', userAgent);
    return this.listAll (`${environment.API}/api/logs/number-of-requests-user-agent`, params);
  }

  public getNumberOfRequestsByDataBetween(start: string, end: string) {
    let params = new HttpParams ();
    params = params.append ('start', start);
    params = params.append ('end', end);
    return this.listAll (`${environment.API}/api/logs/number-of-requests-data`, params);
  }
}
