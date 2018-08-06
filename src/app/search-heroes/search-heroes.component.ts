import { Component, OnInit } from '@angular/core';
import { Hero } from '../model/hero.model';
import { HeroService } from '../services/hero.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'search-heroes',
  templateUrl: './search-heroes.component.html',
  styleUrls: ['./search-heroes.component.css']
})
export class SearchHeroesComponent {

  result$: Observable<Hero [] | Hero>;

  constructor(private heroService: HeroService) { }

  search(heroName: string) {
   this.result$ = this.heroService.searchHero(heroName);
  }

}
