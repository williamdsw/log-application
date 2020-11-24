import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { CrudService } from '../crud.service';

import { ILogDTO } from 'src/app/models/ilog.dto';
import { ILogNewDTO } from 'src/app/models/ilog.new.dto';
import { IPageLogDTO } from 'src/app/models/ipage-log.dto';
import { ILogFieldsDTO } from 'src/app/models/ilog-fields.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService extends CrudService<ILogDTO | ILogNewDTO | IPageLogDTO | ILogFieldsDTO> {

  // Fields

  private baseUrl: string;

  // CONSTRUCTOR

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this.baseUrl = `${environment.API}/api/logs`;
  }

  // HELPER FUNCTIONS

  // -> INSERT

  public insertLog(log: ILogNewDTO): Observable<object> {
    return this.insert(this.baseUrl, log);
  }

  public insertLogFiles(files: FileList): Observable<HttpResponse<object>> {
    const url = `${this.baseUrl}/batch`;
    const formData = new FormData();

    for (let index = 0; index < files.length; index++) {
      formData.append ('file', files.item (index));
    }

    return this.httpClient.post (url, formData, { observe: 'response' });
  }

  // -> FIND

  public findAll(pageNumber: string, linesPerPage: string): Observable<object> {
    let params = new HttpParams ();
    params = params.append ('pageNumber', pageNumber);
    params = params.append ('linesPerPage', linesPerPage);
    return this.listAll (this.baseUrl, params);
  }

  public findAllByIp(ip: string, pageNumber: string, linesPerPage: string): Observable<object> {
    let params = new HttpParams ();
    params = params.append ('value', ip);
    params = params.append ('pageNumber', pageNumber);
    params = params.append ('linesPerPage', linesPerPage);
    return this.listAll (`${this.baseUrl}/ip`, params);
  }

  public findAllByDataBetween(start: string, end: string, pageNumber: string, linesPerPage: string): Observable<object> {
    let params = new HttpParams ();
    params = params.append ('start', start);
    params = params.append ('end', end);
    params = params.append ('pageNumber', pageNumber);
    params = params.append ('linesPerPage', linesPerPage);
    return this.listAll (`${this.baseUrl}/data`, params);
  }

  public findUserIpAddress(): Observable<any> {
    return this.httpClient.get ('https://api.ipify.org/?format=json').pipe (take (1));
  }

  // -> AGRREGATIONS

  public getTenMostRequestsByIp(): Observable<object> {
    return this.listAll (`${this.baseUrl}/ten-most-requests-by-ip`).pipe (take (1));
  }

  public getTenMostRequestsByUserAgent(): Observable<object> {
    return this.listAll (`${this.baseUrl}/ten-most-requests-by-user-agent`).pipe (take (1));
  }

  public getTenMostRequestsByData(): Observable<object> {
    return this.listAll (`${this.baseUrl}/ten-most-requests-by-data`).pipe (take (1));
  }

  public getNumberOfRequestsByIp(ip: string): Observable<object> {
    let params = new HttpParams ();
    params = params.append ('value', ip);
    return this.listAll (`${this.baseUrl}/number-of-requests-ip`, params);
  }

  public getNumberOfRequestsByUserAgent(userAgent: string): Observable<object> {
    let params = new HttpParams ();
    params = params.append ('value', userAgent);
    return this.listAll (`${this.baseUrl}/number-of-requests-user-agent`, params);
  }

  public getNumberOfRequestsByDataBetween(start: string, end: string): Observable<object> {
    let params = new HttpParams ();
    params = params.append ('start', start);
    params = params.append ('end', end);
    return this.listAll (`${this.baseUrl}/number-of-requests-data`, params);
  }
}
