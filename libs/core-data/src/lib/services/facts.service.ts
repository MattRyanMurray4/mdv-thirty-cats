import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Fact, FactPagination } from '@cats/api-interfaces';
@Injectable({
  providedIn: 'root',
})
export class FactsService {
  private model = 'facts';
  constructor(private http: HttpClient) {}

  all(): Observable<Fact[]> {
    return this.http.get<FactPagination>(this.getApi()).pipe(
      tap((res) => console.log(res)),
      map((response) => response.data)
    );
  }

  find(id: string): Observable<Fact> {
    return this.http.get<Fact>(this.getApiById(id));
  }

  private getApi() {
    return `${environment.apiUrl}${this.model}`;
  }

  private getApiById(id: string) {
    return `${this.getApi()}${id}`;
  }
}
