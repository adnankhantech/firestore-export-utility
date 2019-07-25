import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root',
 })
export class APIService {

    constructor(private http: HttpClient) {}

    private food  = [];

    getRouteData (api_url): Observable<any> {
      return this.http.get(api_url).map((response: Response) => {
          return <any>response;
        });
      }
    // Uses http.get() to load data from a single API endpoint
}
