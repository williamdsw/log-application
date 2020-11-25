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
import { RequestParam } from 'src/app/models/request-param';

@Injectable({
  providedIn: 'root'
})
export class LogService extends CrudService<ILogDTO | ILogNewDTO | IPageLogDTO | ILogFieldsDTO> {

  // Fields

  private _baseUrl: string;

  // Getters / Setters

  public get baseUrl() {
    return this._baseUrl;
  }

  // Constructors

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    this._baseUrl = `${environment.API}/api/logs`;
  }

  // HELPER FUNCTIONS

  // -> INSERT

  public insertLog(log: ILogNewDTO): Observable<object> {
    return this.insert(this._baseUrl, log);
  }

  public insertLogFiles(files: FileList): Observable<HttpResponse<object>> {
    const url = `${this._baseUrl}/batch`;
    const formData = new FormData();

    for (let index = 0; index < files.length; index++) {
      formData.append ('file', files.item (index));
    }

    return this.httpClient.post (url, formData, { observe: 'response' });
  }

  // -> FIND

  public findByParamsWhereUrlIs(url: string, requestParams: RequestParam[]): Observable<object> {
    let params = new HttpParams();
    requestParams.forEach(param => {
      params = params.append(param.key, param.value);
    });

    return this.listAll(url, params);
  }

  public findUserIpAddress(): Observable<any> {
    return this.httpClient.get ('https://api.ipify.org/?format=json').pipe (take (1));
  }

  // -> AGRREGATIONS

  public findByWhereUrlIsWithPipe(url: string): Observable<object> {
    return this.listAll(url).pipe (take (1));
  }

  public getTenMostRequestsByIp(): Observable<object> {
    return this.listAll (`${this._baseUrl}/ten-most-requests-by-ip`).pipe (take (1));
  }

  public getTenMostRequestsByUserAgent(): Observable<object> {
    return this.listAll (`${this._baseUrl}/ten-most-requests-by-user-agent`).pipe (take (1));
  }

  public getTenMostRequestsByData(): Observable<object> {
    return this.listAll (`${this._baseUrl}/ten-most-requests-by-data`).pipe (take (1));
  }
}
