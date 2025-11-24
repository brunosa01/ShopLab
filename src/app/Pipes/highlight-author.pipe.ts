import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightAuthor',
  standalone: true
})
export class HighlightAuthorPipe implements PipeTransform {
  /**
   * Transforma o nome do autor em classes Tailwind para coloração.
   * @param authorName Nome do autor do e-book.
   * @returns String contendo classes CSS.
   */
  transform(authorName: string): string {
    if (authorName.includes('Equipe ShopLab')) {
      return 'text-indigo-600 font-bold'; // Autor principal
    }
    if (authorName.includes('Prof. Exemplo')) {
      return 'text-red-500 italic'; // Destaque/Premium
    }
    if (authorName.includes('Time de Estudos')) {
      return 'text-blue-500'; // Categoria de estudos
    }
    return 'text-gray-500';
  }
}