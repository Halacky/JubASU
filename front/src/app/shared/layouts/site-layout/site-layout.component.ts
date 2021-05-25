import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  links = [
    {url: "", name: "Главная"},
    {url: "history", name: "История"},
    {url: "reviews", name: "Отзывы"},
    {url: "gallery", name: "Фотоархив"},
    {url: "staff", name: "Сотрудники"},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
