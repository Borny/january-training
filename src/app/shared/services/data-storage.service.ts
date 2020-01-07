import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, map, catchError, take, exhaustMap, switchMap } from 'rxjs/operators';

import { Card, ICard } from '../models/card/card.model';
import { AuthService } from './auth.service';
import { User } from '../models/user/user.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  private cards: ICard[] = [];
  public cardsListChanged$: BehaviorSubject<ICard[]> = new BehaviorSubject(this.cards.slice());

  private readonly URL = `https://january-training.firebaseio.com/cards.json`;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.cardsListChanged$.subscribe(cards => this.cards = cards);
  }

  public postCard(cardData: ICard) {
    this.authService.user$.pipe(
      take(1),
      exhaustMap((user: User) => {
        return this.http.post<ICard>(
          this.URL,
          cardData,
          {
            params: new HttpParams().set('auth', user.token)
          }
        );
      }),
      exhaustMap(() => {
        return this.fetchCards();
      })
    )
      .subscribe((cards: ICard[]) => {
        this.cardsListChanged$.next(cards);
      });
  }

  public fetchCards(): Observable<ICard[]> {
    return this.authService.user$.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get(
          this.URL,
          {
            params: new HttpParams().set('auth', user.token)
          }
        );
      }),
      map((responseData: ICard[]) => {
        const postArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        return postArray;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'oups! something went wrong';
        if (error.error.error === 'Permission denied') {
          errorMessage = `${error.error.error}... c'est balo!!!`;
          return throwError(errorMessage);
        }
        return throwError(errorMessage);
      }),
    );
  }

  public fetchCard(id: string): Observable<ICard> {
    return this.authService.user$.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<ICard>(
          `https://january-training.firebaseio.com/cards/${id}.json`,
          {
            params: new HttpParams().set('auth', user.token)
          }
        );
      })
    );
  }

  public deleteCards(): void {
    this.authService.user$.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.delete<null>(
          this.URL,
          {
            params: new HttpParams().set('auth', user.token)
          }
        );
      }))
      .subscribe(() => {
        this.cards = [];
        this.cardsListChanged$.next(this.cards.slice());
      });
  }
}
