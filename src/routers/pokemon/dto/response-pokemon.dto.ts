export interface ResponsePokemonDto {
  count: number;
  next: string;
  previous: null;
  results: smallPoke[];
}

export interface smallPoke {
  name: string;
  url: string;
}
