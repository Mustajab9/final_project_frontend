import { Component, OnInit } from '@angular/core';
import { Book } from 'projects/core/src/app/dto/book/book';
import { BookService } from 'projects/core/src/app/service2/book.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  ngOnInit(): void {

  }

  // availableBooks: Book[] = []

  // favoriteBooks: Book[] = []

  // private draggedBook: Book = new Book()

  // constructor(private bookService: BookService) { }

  // ngOnInit() {
  //   this.bookService.getAllBooks().then(books => this.availableBooks = books);
  //   this.bookService.getFavoriteBooks().then(books => this.favoriteBooks = books);
  //   console.log(this.availableBooks);
  // }

  // dragStart(event, book: Book) {
  //   this.draggedBook = book;
  // }

  // drop(event) {
  //   if (this.draggedBook) {
  //     let draggedBookIndex = this.findIndex(this.draggedBook);
  //     this.favoriteBooks = [...this.favoriteBooks, this.draggedBook];
  //     this.availableBooks = this.availableBooks.filter((val, i) => i != draggedBookIndex);
  //     this.draggedBook = null;
  //   }
  // }

  // dragEnd(event) {
  //   this.draggedBook = null;
  // }

  // findIndex(book: Book) {
  //   let index = -1;
  //   for (let i = 0; i < this.availableBooks.length; i++) {
  //     if (book.name === this.availableBooks[i].name) {
  //       index = i;
  //       break;
  //     }
  //   }
  //   return index;
  // }

}
