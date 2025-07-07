import {Component } from '@angular/core';
import { GiftsSideMenuHeaderComponent } from "./gifts-side-menu-header/gifts-side-menu-header.component";
import { GiftsSideMenuOptionsComponent } from "./gifts-side-menu-options/gifts-side-menu-options.component";

@Component({
  selector: 'side-menu',
  imports: [GiftsSideMenuHeaderComponent, GiftsSideMenuOptionsComponent],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent { }
