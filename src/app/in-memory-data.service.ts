import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const films = [
      { id: 1, name: 'Dardevil' },
      { id: 2, name: 'Deadpool' },
      { id: 3, name: 'Hercule' },
      { id: 4, name: 'Hulk' },
      { id: 5, name: 'Luke Cage' },
      { id: 6, name: 'Thor' },
      { id: 7, name: 'Wolverin' },

    ];
    return {films};
  }
}