import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GiftService } from 'src/app/gifs/services/gifs.service';

interface MenuOption {
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}

@Component({
  selector: 'gifts-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifts-side-menu-options.component.html',
})

export class GiftsSideMenuOptionsComponent {

  gifService = inject(GiftService);

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-simple',
      label: 'Trending',
      subLabel: 'Gifs populares',
      route: '/dashboard/trending',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar Gifs',
      route: '/dashboard/search',
    }

  ];



}
