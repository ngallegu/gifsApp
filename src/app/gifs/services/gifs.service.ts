import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gif } from '../interfaces/gif';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';

const GIF_KEY = 'gifs';
// Record<string, Gif[]>

const loadFromLocalStorage = () => {

  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);


  // LOAD form storage
  // console.log(gifs);

  return gifs;

}

@Injectable({
  providedIn: 'root'
})

export class GiftService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]); //[gif1, gif2, gif3]
  trendingGifsLoading = signal(false);


  private trendingPage = signal(0);


  trendingGifGroup = computed<Gif[][]>(() => {

    const gr = [];//grupos

    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      gr.push(this.trendingGifs().slice(i, i + 3));
    }

    // console.log(gr);

    return gr; //[gif1, gif2, gif3] , [gif4, gif5, gif6]

  })

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  constructor() {

    this.loadTrendingGifs();
    // console.log('Servicio carga gifs creado');
  }

  saveGifsToLocalStorage = effect(() => {
    const histString = JSON.stringify(this.searchHistory())
    localStorage.setItem('GIF_KEY', histString);

  });

  //Cargar gifs con http
  loadTrendingGifs() {
 if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true)

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {

      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.trendingPage() * 20,
      }

    }).subscribe((resp) => {

      const gifs = GifMapper.myGiphyItemsToGifArray(resp.data);
      // this.trendingGifs.set(gifs);
      this.trendingGifs.update((currentGifs) => [

        ...currentGifs,
        ...gifs,
      ]);

      this.trendingPage.update((current)=> current+1)

      this.trendingGifsLoading.set(false);
      //Respuesta
      // console.log(`Respuesta:`, { gifs });

    })

  }

  //BUSCAR
  searchGifs(query: string): Observable<Gif[]> {

    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {

      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query,
      }

    }).pipe(

      map(({ data }) => data),
      map((items) => GifMapper.myGiphyItemsToGifArray(items)),

      tap(items => {

        this.searchHistory.update(history => ({ // Return implicito de nuevo obheto con () {}
          ...history,
          [query.toLowerCase()]: items,
        }))

      })


    );

    // .subscribe((resp) => {
    //   const gifs = GifMapper.myGiphyItemsToGifArray(resp.data);
    //   //Respuesta
    //   console.log(`Respuesta:`, { search: gifs });
    // })
  }

  getHistoryGifs(query: string) {
    return this.searchHistory()[query] ?? [];
  }

}
