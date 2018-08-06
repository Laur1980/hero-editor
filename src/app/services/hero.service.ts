import { Injectable } from '@angular/core';
import { HEROES } from '../suppliers/hero-mock';
import { Hero } from '../model/hero.model';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private messageService: MessageService,
               private http: HttpClient) { }

  // public getHeroes (): Observable< Hero []> {
  //   this.messageService.add('HeroService: fetched heroes!');
  //   return of(HEROES);
  // }

  public getHeroes (): Observable<Hero []> {
    this.messageService.add('HeroService: fetched heroes!');
    return this.http.get<Hero []>(this.heroesUrl)
                .pipe(
                  catchError(this.handleError('getHeroes',[]))
                );
  }

  // public getHero(id: number): Observable<Hero> {
  //   this.messageService.add(`Fetched hero with id=${id}`);
  //   return of(HEROES.find( e => e.id === id));
  // }

  public getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    console.log(url);
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.messageService.add(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  public updateHero(hero: Hero):Observable<any> {
    return this.http.put(this.heroesUrl, hero , this.httpOptions)
                    .pipe(
                      tap(_ => this.messageService.add(`Update hero with id: ${hero.id}`)),
                      catchError(this.handleError<any>('updateHero'))
                    );
  }

  public addHero(hero: Hero): Observable<any> {
    return this.http.post(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((hero: Hero) => this.messageService.add(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  public deleteHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    console.log(url);
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.messageService.add(`deleted hero ${hero.name}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  public searchHero(word: string): Observable<Hero [] | Hero> {
    if (!word.trim()) {
      return of([]);
    }

    return this.http.get<Hero [] | Hero>(`${this.heroesUrl}/?name=${word}`, this.httpOptions)
                    .pipe(
                      tap(_ => this.messageService.add(`found hero matching term "${word}"`)),
                      catchError(this.handleError<Hero>('searchHero'))
                    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
 
}
