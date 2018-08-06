import { Component, OnInit } from '@angular/core';
import { Hero } from '../model/hero.model';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent  implements OnInit {

  heroName: string;

  selectedHero: Hero;

  heroes: Hero [];

  constructor(private heroService: HeroService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getHeroes();
    console.log(this.heroes);
  }

  // onClick(heroName) {
  //   let name = heroName.value;
  //   if( name !== undefined && name.length !== 0) {
  //     let id = this.heroes.length;
  //     id++;
  //     this.heroes.push(new Hero(id, name));
  //   }
  //   heroName.value = '';
  // }

  onClick() {

    if ( this.heroName !== undefined && this.heroName.length !== 0) {
      const id = this.heroes.length + 1;
      const currentHero = new Hero(id, this.heroName);
      this.heroService.addHero(currentHero).subscribe(
        hero => this.heroes.push(hero)
      );
      this.messageService.add('Hero ' + this.heroName + ' has been added to the hero list!');
    } else {
      this.messageService.add('Unable to add hero, minimun requirements not met, at: ' + new Date().getDate());
    }
    this.heroName = '';
  }

  // onSelect(hero: Hero ): void {
  //   this.selectedHero = hero;
  //   this.messageService.add('Hero ' + this.selectedHero.name + ' has been selected from the hero list!');
  // }

  getHeroes(): void {
    this.heroService.getHeroes()
                    .subscribe( heroes => this.heroes = heroes );
  }

  delete(hero: Hero) {
   console.log(hero);
    this.heroService.deleteHero(hero).subscribe();
    this.heroes = this.heroes.filter(e => e.id !== hero.id);
    this.messageService.add(`Hero with id ${hero.id} and with name ${hero.name}`);
  }

}
