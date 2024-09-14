import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBannerComponent } from './components/top-banner/top-banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TopBannerComponent,
    FooterComponent,
    PokemonListComponent,
    DetailsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
