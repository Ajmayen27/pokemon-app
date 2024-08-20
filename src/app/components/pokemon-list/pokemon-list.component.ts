import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../services/poke-api.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe((queryParamMap: any) => {
      this.setCurrentPageNo(queryParamMap);
      this.loadAllPokemonDetails();
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

  loadPreviousPage(): void {
    this.router.navigate(['/pokemon-list'], {
      queryParams: { page: --this.currentPageNo },
    });
  }

  loadNextPage(): void {
    this.router.navigate(['/pokemon-list'], {
      queryParams: { page: ++this.currentPageNo },
    });
  }

}
