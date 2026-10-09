import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BlogImage } from '../models/image.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageSelectorService {
   private http=inject(HttpClient);
  showImageSelector=signal<boolean>(false);
  selectedImage=signal<string|null>(null);
  displayImageSelector(){
    this.showImageSelector.set(true);
  }

  hideImageSelector(){
    this.showImageSelector.set(false);
  }

  uploadImage(file:File, fileName:string, title:string):Observable<BlogImage>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);
    return this.http.post<BlogImage>(`${environment.apiBaseUrl}/api/images`, formData,{
      withCredentials:true
    });
  }

  getAllImages(id:WritableSignal<string|undefined>):HttpResourceRef<BlogImage[]|undefined>{
    return httpResource<BlogImage[]>(() => {
      id();
      return `${environment.apiBaseUrl}/api/images`;
    });
  }

  selectImage(imageUrl:string){
    this.selectedImage.set(imageUrl);
    this.hideImageSelector();
  }
}
