import { Component, OnInit } from '@angular/core';
import { Film } from '../film';


import { FilmService } from '../film.service';



@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  films: Film[];
 
  constructor(private filmService: FilmService) { }
 
  ngOnInit() {
    this.getFilms();
  }
 
  getFilms(): void {
    this.filmService.getFilms()
        .subscribe(films => this.films = films);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.filmService.addFilm({ name } as Film)
      .subscribe(film => {
        this.films.push(film);
      });
  }
 
  delete(film: Film): void {
    this.films = this.films.filter(h => h !== film);
    this.filmService.deleteFilm(film).subscribe();
  }
}