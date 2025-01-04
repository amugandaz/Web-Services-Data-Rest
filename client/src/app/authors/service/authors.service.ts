
import { inject, Injectable } from '@angular/core';
import { HttpParams, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Author } from 'src/app/books/model/book';

const Url = 'http://localhost:8080/books-api/';


@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
    

  constructor(private http: HttpClient) { }

  public getAuthor(id: string): Observable<Author> {
    return this.http.get<Author>(Url + 'authors/' + id);
  }
}