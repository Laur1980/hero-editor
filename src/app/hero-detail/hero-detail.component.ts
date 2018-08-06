import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../model/hero.model';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

 @Input('hero') hero: Hero;

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location ) { }

  ngOnInit() {
    this.getHero();
  }
  
  private getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(
      hero => this.hero = hero
    );
    
  }

  update(heroName: string) {
    this.heroService.updateHero(this.hero)
                    .subscribe( () =>  this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
