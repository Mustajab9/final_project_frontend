import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thread-save',
  templateUrl: './thread-save.component.html',
  styleUrls: ['./thread-save.component.css']
})
export class ThreadSaveComponent implements OnInit {

  type!: string;
  uploadedFiles: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onBasicUpload(event : any) {
    for(let file of event.files) {
      this.uploadedFiles.push(file)
    }
  }

}
