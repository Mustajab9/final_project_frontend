import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GetAllCategoryDtoDataRes } from 'projects/core/src/app/dto/category/get-all-category-dto-data-res';
import { GetAllThreadTypeDtoDataRes } from 'projects/core/src/app/dto/thread-type/get-all-thread-type-dto-data-res';
import { InsertThreadDtoReq } from 'projects/core/src/app/dto/thread/insert-thread-dto-req';
import { CategoryService } from 'projects/core/src/app/service/category.service';
import { ThreadTypeService } from 'projects/core/src/app/service/thread-type.service';
import { ThreadService } from 'projects/core/src/app/service/thread.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-thread-save',
  templateUrl: './thread-save.component.html',
  styleUrls: ['./thread-save.component.css']
})
export class ThreadSaveComponent implements OnInit, OnDestroy {

  type!: string;
  uploadedFiles: any[] = [];
  thread : InsertThreadDtoReq = new InsertThreadDtoReq()
  threadCategories : GetAllCategoryDtoDataRes[] = []
  selectedCategory : GetAllCategoryDtoDataRes[] = []
  threadTypes : GetAllThreadTypeDtoDataRes[] = []
  selectedType : GetAllThreadTypeDtoDataRes = new GetAllThreadTypeDtoDataRes()
  threadInsertSubscription? :Subscription
  threadCategoryAllSubscription? : Subscription
  threadTypeAllSubscription? : Subscription

  constructor(private title : Title, private router : Router,
              private threadService : ThreadService,
              private categoryService : CategoryService,
              private threadTypeService : ThreadTypeService) { 

    this.title.setTitle('Create Thread')
  }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.threadCategoryAllSubscription = this.categoryService.getAll(0,10).subscribe(result => {
      this.threadCategories = result.data
    })

    this.threadTypeAllSubscription = this.threadTypeService.getAll(0,10).subscribe(result => {
      this.threadTypes = result.data
    })
  }

  onBasicUpload(event : any) {
    this.uploadedFiles = event.files
  }

  onSave() {
    this.thread.categoryId = []
    for(let category of this.selectedCategory) {
      this.thread.categoryId.push(category.id!);
    }

    this.thread.typeId = this.selectedType.id!

    this.threadInsertSubscription = this.threadService.insert(this.thread, this.uploadedFiles).subscribe(result => {
      this.router.navigateByUrl('/member/dashboard')
    })
  }

  ngOnDestroy(): void {
    this.threadInsertSubscription?.unsubscribe()
  }
}
