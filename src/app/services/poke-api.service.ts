import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private baseUrl = "https://pokeapi.co/api/v2/pokemon";

  constructor(private httpClient: HttpClient) { }

  getPokemonDetails(pageNo: number): Observable<any> {
    const url = `${this.baseUrl}?offset=${pageNo * 18}&limit=18`;
    return this.fetchpokemonDetails(url).pipe(
      switchMap((response) => forkJoin(
        response.results.map((pokemon: any) =>
          this.fetchIndividualPokemonDetailsByName(pokemon.name)
        )
      )));
  }

  fetchpokemonDetails(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }

  fetchIndividualPokemonDetailsByName(name: string): Observable<any> {
    const url = `${this.baseUrl}/${name}`;
    return this.fetchpokemonDetails(url);
  }
}
