import { Component, OnInit } from '@angular/core';
import { Film } from '../film';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  films: Film[] = [];

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    this.getFilms();
  }

  getFilms(): void {
    this.filmService.getFilms()
      .subscribe(films => this.films = films.slice(1, 5));
  }
}