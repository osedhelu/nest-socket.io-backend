export interface PokeResponse {
  count: number;
  next: string;
  previous: null;
  results: smallPoke[];
}

export interface smallPoke {
  name: string;
  url: string;
}
