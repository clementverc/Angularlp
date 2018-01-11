import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Film }         from '../film';
import { FilmService }  from '../film.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: [ './film-detail.component.css' ]
})
export class FilmDetailComponent implements OnInit {
  @Input() film: Film;

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getFilm();
  }

  getFilm(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.filmService.getFilms(id)
      .subscribe(film => this.film = film);
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.filmService.updateFilm(this.film)
      .subscribe(() => this.goBack());
  }
}