import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { GetAllCategoryDtoDataRes } from 'projects/core/src/app/dto/category/get-all-category-dto-data-res';
import { GetAllThreadTypeDtoDataRes } from 'projects/core/src/app/dto/thread-type/get-all-thread-type-dto-data-res';
import { InsertThreadDtoReq } from 'projects/core/src/app/dto/thread/insert-thread-dto-req';
import { CategoryService } from 'projects/core/src/app/service/category.service';
import { LoadingService } from 'projects/core/src/app/service/loading.service';
import { LoginService } from 'projects/core/src/app/service/login.service';
import { ThreadTypeService } from 'projects/core/src/app/service/thread-type.service';
import { ThreadService } from 'projects/core/src/app/service/thread.service';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'app-thread-save',
  templateUrl: './thread-save.component.html',
  styleUrls: ['./thread-save.component.css']
})
export class ThreadSaveComponent implements OnInit, OnDestroy {

  type!: string;
  uploadedFiles: any[] = [];
  choices: string[] = []
  choice?: string
  writeType!: string
  isLogin: boolean = this.loginService.isLogin()
  isLoading: boolean = false

  thread: InsertThreadDtoReq = new InsertThreadDtoReq()
  threadCategories: GetAllCategoryDtoDataRes[] = []
  selectedCategory: GetAllCategoryDtoDataRes[] = []
  threadTypes: GetAllThreadTypeDtoDataRes[] = []
  selectedType: GetAllThreadTypeDtoDataRes = new GetAllThreadTypeDtoDataRes()

  loadingServiceSubcription?: Subscription

  constructor(private title: Title, private router: Router, private loadingService: LoadingService,
    private threadService: ThreadService, private categoryService: CategoryService,
    private threadTypeService: ThreadTypeService, private loginService: LoginService,
    private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService ) {

    this.title.setTitle('Create Thread')
  }

  async ngOnInit() {
    const {type} = await firstValueFrom(this.activatedRoute.params)
    this.writeType = type

    this.initData()
  }

  async initData(): Promise<void> {
    this.loadingServiceSubcription = this.loadingService.loading$?.subscribe(result => {
      this.isLoading = result
    })

    const resultAllThreadCategory = await firstValueFrom(this.categoryService.getAll())
    this.threadCategories = resultAllThreadCategory.data

    const resultAllThreadType = await firstValueFrom(this.threadTypeService.getAll())
    this.threadTypes = resultAllThreadType.data

    if (this.writeType == 'article') {
      this.selectedType = this.threadTypes.filter(comp => comp.typeCode == 'TY03')[0]
    }
    else {
      this.selectedType = this.threadTypes.filter(comp => comp.typeCode == 'TY02')[0]
    }
  }

  onBasicUpload(event: any) {
    this.uploadedFiles = event.currentFiles
  }

  async onSave() {
    if(this.isLogin){
      this.thread.categoryId = []
      for (let category of this.selectedCategory) {
        this.thread.categoryId.push(category.id!)
      }

      this.thread.typeId = this.selectedType.id!

      this.thread.choiceName = []
      for (let choice of this.choices) {
        this.thread.choiceName.push(choice)
      }

      await firstValueFrom(this.threadService.insert(this.thread, this.uploadedFiles))
      this.onBack()
    } 
    else {
      this.confirmationService.confirm({
        message: 'You Must Be Login First',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigateByUrl('/login/member')
        }
      });
    }
  }

  onBack(): void {
    if (this.writeType == 'article') {
      this.router.navigateByUrl('/member/article/dashboard')
    } else if (this.writeType == 'thread') {
      this.router.navigateByUrl('/member/dashboard')
    }
  }

  addChoice(): void {
    if (this.choice) {
      this.choices.push(this.choice)
      this.choice = ''
    }
  }

  deleteChoice(choice: string): void {
    this.choices = this.choices.filter(data => data != choice)
  }

  onThreadTypeChange(id: any): void {
    this.selectedType = this.threadTypes.filter(comp => comp.id == id)[0]
  }

  validateSubmit(): boolean {
    if (!this.thread.threadTitle) return false
    if (!this.thread.threadContent) return false
    if (this.selectedCategory.length < 1) return false
    if (!this.selectedType.id) return false

    if (this.selectedType.typeCode == 'TY01') {
      if (!this.thread.pollingName) return false
      if (this.choices.length < 1) return false
    }

    return true
  }

  ngOnDestroy(): void {
    this.loadingServiceSubcription?.unsubscribe()
  }
}
