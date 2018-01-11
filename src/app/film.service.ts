import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Film } from './film';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FilmService {

  private filmsUrl = 'api/films';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET films from the server */
  getFilms (): Observable<Film[]> {
    return this.http.get<Film[]>(this.filmsUrl)
      .pipe(
        tap(films => this.log(`fetched films`)),
        catchError(this.handleError('getFilms', []))
      );
  }

  /** GET film by id. Return `undefined` when id not found */
  getFilmNo404<Data>(id: number): Observable<Film> {
    const url = `${this.filmsUrl}/?id=${id}`;
    return this.http.get<Film[]>(url)
      .pipe(
        map(films => films[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} film id=${id}`);
        }),
        catchError(this.handleError<Film>(`getFilm id=${id}`))
      );
  }

  /** GET film by id. Will 404 if id not found */
  getFilm(id: number): Observable<Film> {
    const url = `${this.filmsUrl}/${id}`;
    return this.http.get<Film>(url).pipe(
      tap(_ => this.log(`fetched film id=${id}`)),
      catchError(this.handleError<Film>(`getFilm id=${id}`))
    );
  }

  /* GET films whose name contains search term */
  searchFilms(term: string): Observable<Film[]> {
    if (!term.trim()) {
      // if not search term, return empty film array.
      return of([]);
    }
    return this.http.get<Film[]>(`api/films/?name=${term}`).pipe(
      tap(_ => this.log(`found films matching "${term}"`)),
      catchError(this.handleError<Film[]>('searchFilms', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new film to the server */
  addFilm (film: Film): Observable<Film> {
    return this.http.post<Film>(this.filmsUrl, film, httpOptions).pipe(
      tap((film: Film) => this.log(`added film w/ id=${film.id}`)),
      catchError(this.handleError<Film>('addFilm'))
    );
  }

  /** DELETE: delete the film from the server */
  deleteFilm (film: Film | number): Observable<Film> {
    const id = typeof film === 'number' ? film : film.id;
    const url = `${this.filmsUrl}/${id}`;

    return this.http.delete<Film>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted film id=${id}`)),
      catchError(this.handleError<Film>('deleteFilm'))
    );
  }

  /** PUT: update the film on the server */
  updateFilm (film: Film): Observable<any> {
    return this.http.put(this.filmsUrl, film, httpOptions).pipe(
      tap(_ => this.log(`updated film id=${film.id}`)),
      catchError(this.handleError<any>('updateFilm'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a FilmService message with the MessageService */
  private log(message: string) {
    this.messageService.add('FilmService: ' + message);
  }
}