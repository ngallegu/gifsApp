import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GiftService } from '../../services/gifs.service';
import { GifListComponent } from '../../components/gift-list/gif-list.component';

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
})
export default class GifHistoryComponent {

  giftService = inject(GiftService)

  query = toSignal(
    inject(ActivatedRoute)      //Inyectando dependencia servicio
      .params.                  // Obteniendo el Observable
      pipe(                     //Conectando operador map mediante el pipe y extraer
        map((params) => params['query'])
      ));

  gifsByKey = computed( ()=>{
    return this.giftService.getHistoryGifs(this.query())
  })


  // query = inject(ActivatedRoute).params.subscribe(  (params) =>{

  //   console.log(params['queryRoute']);

  // }); // Ruta activa


}


