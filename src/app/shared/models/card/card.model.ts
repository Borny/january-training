export interface ICard {
  id?: string;
  day?: string;
  workout?: boolean;
  workoutDescription?: string;
  stretch?: boolean;
  stretchDescription?: string;
  capoeira?: boolean;
  capoeiraDescription?: string;
  crossfit?: boolean;
  crossfitDescription?: string;
}

export class Card {
  constructor(
    public id: string,
    public day: string,
    public workout: boolean,
    public workoutDescription: string,
    public stretch: boolean,
    public stretchDescription: string,
    public capoeira: boolean,
    public capoeiraDescription: string,
    public crossfit: boolean,
    public crossfitDescription: string,
  ) { }
}
