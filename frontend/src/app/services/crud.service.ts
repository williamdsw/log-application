import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export class CrudService<T> {

    // CONSTRUCTOR

    constructor(protected httpClient: HttpClient) {}

    // HELPER FUNCTIONS

    protected listAll(apiUrl: string, params?: HttpParams): Observable<T[]> {
        return this.httpClient.get<T[]>(apiUrl, { params }).pipe (take (1));
    }

    protected insert(apiUrl: string, record: T): Observable<object> {
        return this.httpClient.post (apiUrl, record).pipe (take (1));
    }
}