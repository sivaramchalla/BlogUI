import { inject, Injectable, InputSignal } from '@angular/core';
import { AddBlogPostRequest, BlogPost, UpdateBlogPostRequest } from '../models/blogpost.model';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { BlogImage } from '../../../shared/models/image.model';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  http=inject(HttpClient);
  apiBaseUrl=environment.apiBaseUrl;
  createBlogpost(data: AddBlogPostRequest):Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiBaseUrl}/api/blogpost`, data,{
      withCredentials:true
    });
  }

  getAllBlogPosts():HttpResourceRef<BlogPost[]|undefined>{
    return httpResource<BlogPost[]>(()=>`${this.apiBaseUrl}/api/blogpost`);
  }

  getBlogPostById(id:InputSignal<string|undefined>):HttpResourceRef<BlogPost|undefined>{
    return httpResource<BlogPost>(()=>`${this.apiBaseUrl}/api/blogpost/${id()}`);
  }

  editBlogPost(id:string, body:UpdateBlogPostRequest):Observable<BlogPost>{
    return this.http.put<BlogPost>(`${this.apiBaseUrl}/api/blogpost/${id}`,body,{
      withCredentials:true
    });
  }

  deleteBlogPost(id:string):Observable<BlogPost>{
    return this.http.delete<BlogPost>(`${this.apiBaseUrl}/api/blogpost/${id}`,{
      withCredentials:true
    });
  }

  getBlogPostByUrlHandle(urlHandle:InputSignal<string|undefined>):HttpResourceRef<BlogPost|undefined>{
    return httpResource<BlogPost>(()=>`${this.apiBaseUrl}/api/blogpost/${urlHandle()}`);
  }
  

}
  
  

