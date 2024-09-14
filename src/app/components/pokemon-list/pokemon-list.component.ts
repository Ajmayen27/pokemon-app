import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../services/poke-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit {
  currentPageNo: number = 0;
  pokemonDetails: any[] = [];
  constructor(private pokeApiService: PokeApiService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe((queryParamMap: any) => {
      if (queryParamMap.has('pokemon')) {
        this.loadSinglePokemonDetails(queryParamMap.get('pokemon'))
      }
      else {
        this.setCurrentPageNo(queryParamMap);
        this.loadAllPokemonDetails();
      }
    });


  }

  setCurrentPageNo(queryParamMap: any): void {
    this.currentPageNo = queryParamMap.has('page') ? queryParamMap.get('page') : 0;
  }

  loadAllPokemonDetails(): void {
    this.pokeApiService.getPokemonDetails(this.currentPageNo).subscribe({
      next: (successResponse) => (this.pokemonDetails = successResponse),
      error: (errorResponse) => console.error(errorResponse),
    });
  }

  loadSinglePokemonDetails(name: string) {
    this.pokeApiService
      .fetchIndividualPokemonDetailsByName(name)
      .subscribe({
        next: (successResponse) =>
          this.pokemonDetails.splice(
            0,
            this.pokemonDetails.length,
            successResponse),
        error: (errorResponse) => console.error(errorResponse),
      });
  }

  loadPreviousPage(): void {
    this.router.navigate(['/pokemon-list'], {
      queryParams: { page: --this.currentPageNo },
    });
  }

  viewDetails(pokemon: any): void {

    //set to local storage via sharedDataService
    this.sharedDataService.sendData(pokemon);
    //navigate to the details page
    this.router.navigate(['/pokemon-details'])
  }

  loadNextPage(): void {
    this.router.navigate(['/pokemon-list'], {
      queryParams: { page: ++this.currentPageNo },
    });
  }

}
