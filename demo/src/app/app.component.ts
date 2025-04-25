import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';

interface AppPage {
  title: string;
  url?: string;
  icon: string;
  children?: AppPage[];
  open?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: AppPage[] = [
    {
      title: 'Productos',
      icon: 'pricetags',
      children: [
        {
          title: 'Ropa',
          icon: 'shirt',
          children: [
            { title: 'Hombre', url: '/ropa-hombre', icon: '' },
            { title: 'Mujer', url: '/ropa-mujer', icon: '' },
            { title: 'Unisex', url: '/ropa-unisex', icon: '' },
          ],
          open: false
        },
        {
          title: 'Zapatillas',
          icon: 'footsteps',
          children: [
            { title: 'Hombre', url: '/zapatillas-hombre', icon: '' },
            { title: 'Mujer', url: '/zapatillas-mujer', icon: '' },
            { title: 'Unisex', url: '/zapatillas-unisex', icon: '' },
          ],
          open: false
        },
        {
          title: 'Accesorios',
          icon: 'watch',
          children: [
            { title: 'Hombre', url: '/accesorios-hombre', icon: '' },
            { title: 'Mujer', url: '/accesorios-mujer', icon: '' },
            { title: 'Unisex', url: '/accesorios-unisex', icon: '' },
          ],
          open: false
        },
        {
          title: 'Deportivo',
          icon: 'fitness',
          children: [
            { title: 'Hombre', url: '/deportivo-hombre', icon: '' },
            { title: 'Mujer', url: '/deportivo-mujer', icon: '' },
            { title: 'Unisex', url: '/deportivo-unisex', icon: '' },
          ],
          open: false
        }
      ],
      open: false
    },
    { title: 'Favoritos', url: '/favoritos', icon: 'heart' },
    { title: 'Ayuda', url: '/ayuda', icon: 'help' },
    { title: 'Feedback', url: '/feedback-add', icon: 'star' },
    { title: 'Graficos', url: '/graficoss', icon: 'stats-chart' },
  ];

  constructor(private router: Router, private menu: MenuController) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.menu.close();
      }
    });
  }

  toggleSubMenu(page: AppPage) {
    page.open = !page.open;
  }

  navigateToPage(page: AppPage) {
    if (page.url) {
      this.router.navigateByUrl(page.url);
    }
  }
}
