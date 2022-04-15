import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  Books: any = [];
  constructor(private router: Router, private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.GetBooks().subscribe((res) => {
      this.Books = res;
    });
  }

  delete(id: any, i: any) {
    if (window.confirm('Do you want delete?')) {
      this.crudService.deleteBook(id).subscribe((res) => {
        this.Books.splice(i, 1);
      });
    }
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
}
