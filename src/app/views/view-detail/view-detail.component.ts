import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { exhaustMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DataStorageService } from '../../shared/services/data-storage.service';
import { ICard } from '../../shared/models/card/card.model';

@Component(
  {
    selector: 'view-detail',
    templateUrl: './view-detail.component.html',
    styleUrls: ['./view-detail.component.scss'],
  }
)
export class ViewDetailComponent implements OnInit, OnDestroy {
  public day: string;
  public workout: string;
  public workoutDescription: string;
  public crossfit: string;
  public crossfitDescription: string;
  public stretch: string;
  public stretchDescription: string;
  public capoeira: string;
  public capoeiraDescription: string;
  public card: ICard;
  public fetching = false;

  private onDestroy$ = new Subject<void>();

  constructor(
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.onGetCard();
    this.getDayNumber();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private getDayNumber() {
    this.day = this.route.snapshot.queryParamMap.get('index');
  }

  private onGetCard() {
    this.fetching = true;
    this.route.params.pipe(
      takeUntil(this.onDestroy$),
      exhaustMap((value: Params) => {
        const id = value.id.toString();
        return this.dataStorageService.fetchCard(id);
      })
    )
      .subscribe((card: ICard) => {
        this.card = card;
        this.workoutDescription = card.workoutDescription;
        this.crossfitDescription = card.crossfitDescription;
        this.stretchDescription = card.stretchDescription;
        this.capoeiraDescription = card.capoeiraDescription;
        this.fetching = false;
      });
  }


}
