import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(list: any[], filterText: string): any[] {
    console.log('Pipe transform called');

    // Check if list or filterText is falsy (empty, null, etc.)
    if (!list || !filterText) {
      return []; // If no search term, return full list
    }

    return list.filter((item) =>
      item.marqueMoto
        ?.toLocaleLowerCase()
        .includes(filterText.toLocaleLowerCase())
    );
  }
}
