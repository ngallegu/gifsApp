import { AfterViewInit, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GiftService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/service/scroll-state.service';


// const imageUrls: string[] = [
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
// ];

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})

export default class TrendingPageComponent implements AfterViewInit {

  // gifs = signal(imageUrls);
  // OP1
  // gifs = computed( () => this.gifService.trendingGifs);

  //OP2
  gifService = inject(GiftService);
  scrollService = inject(ScrollStateService);

  // gifs = signal(imageUrls);
  // imageUrls: imageUrls;

  //Se ejecuta despues que la
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollService.trendingScrollState();

  }



  scrollDivRef = viewChild<ElementRef>('groupDivRef')

  onScroll($event: Event) {

    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) {
      return;
    }


    //ScrollTop
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const clientWidth = scrollDiv.clientWidth;
    const scrollHeight = scrollDiv.scrollHeight;


    // console.table({scrollTop, clientHeight ,scrollHeight});
    console.log({ scrollTop, clientHeight, scrollHeight });


    //cuando este cerca del final se hce la petición
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;


    this.scrollService.trendingScrollState.set(scrollTop);


    console.log({ isAtBottom });

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }

  }



}
