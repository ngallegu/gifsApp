import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gift-list/gif-list.component";
import { Gif } from '../../interfaces/gif';
import { GiftService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GifListComponent],
})
export default class SearchPageComponent {


  giftService = inject(GiftService);
  gifs = signal<Gif[]>([]);


  onSearch(query: string) {
    this.giftService.searchGifs(query).subscribe((resp) => {
      this.gifs.set(resp);
    });

  }
}
