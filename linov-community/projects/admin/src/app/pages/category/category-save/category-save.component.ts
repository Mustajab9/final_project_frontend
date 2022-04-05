import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsertCategoryDtoReq } from 'projects/core/src/app/dto/category/insert-category-dto-req';
import { CategoryService } from 'projects/core/src/app/service/category.service';

@Component({
  selector: 'app-category-save',
  templateUrl: './category-save.component.html',
  styleUrls: ['./category-save.component.css']
})
export class CategorySaveComponent {

  constructor(private router: Router, private categoryService: CategoryService) { }

  category: InsertCategoryDtoReq = new InsertCategoryDtoReq()

  submit(): void {
    this.categoryService.insert(this.category).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/admin/category/list')
      }
    })
  }

}
