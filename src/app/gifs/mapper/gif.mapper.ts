import { Gif } from "../interfaces/gif";
import { GiphyItem } from "../interfaces/giphy.interfaces";

export class GifMapper {

  static myGiphyItemToGif(item: GiphyItem): Gif {

    // console.log(item.title);

    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }

  }

  static myGiphyItemsToGifArray(items: GiphyItem[]): Gif[] {


    return items.map(this.myGiphyItemToGif);

  }

}
