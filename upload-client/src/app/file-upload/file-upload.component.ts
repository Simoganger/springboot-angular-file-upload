import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadService } from '../service/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  selectedFiles?: FileList
  currentFile?: File

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {}

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if(this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if(file) {
        this.currentFile = file;
        this.uploadService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              console.log('Upload in progress')
            } else if (event instanceof HttpResponse) {
              console.log('Upload response!')
            }
          },
          error: (err: any) => {
            console.log(err)
            this.currentFile = undefined
          }
        })
      }
      this.selectedFiles = undefined
    }
  }

}
