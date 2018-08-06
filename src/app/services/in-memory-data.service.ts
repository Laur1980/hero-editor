import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const heroes = [
      {id: 1, name: 'Mr Blast'},
      {id: 2, name: 'Dento'},
      {id: 3, name: 'Veritas'},
      {id: 4, name: 'Doctor Justice'},
      {id: 5, name: 'Mrs Explosion'},
      {id: 6, name: 'Silk Specter'},
      {id: 7, name: 'Trauma Girl'},
      {id: 8, name: 'Power Blast'},
      {id: 9, name: 'The Reckoning'},
      {id: 10, name: 'Incredible Man'}
    ];
    return {heroes};
  }
}
