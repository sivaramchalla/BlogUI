import { Component, effect, inject, input } from '@angular/core';
import { BlogPostService } from '../services/blog-post-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category-service';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { UpdateBlogPostRequest } from '../models/blogpost.model';
import { Router } from '@angular/router';
import { ImageSelector } from '../../../shared/components/image-selector/image-selector';
import { ImageSelectorService } from '../../../shared/services/image-selector-service';

@Component({
  selector: 'app-edit-blogpost',
  imports: [ReactiveFormsModule,MarkdownComponent,CommonModule],
  templateUrl: './edit-blogpost.html',
  styleUrl: './edit-blogpost.css',
})
export class EditBlogpost {
    id=input<string>();
    blogPostService=inject(BlogPostService);
    categoryService=inject(CategoryService);
    imageSelectorService=inject(ImageSelectorService);
    router=inject(Router);
    private blogPostRef=this.blogPostService.getBlogPostById(this.id);
    blogPostResponse=this.blogPostRef.value;
    private categoriesRef=this.categoryService.getAllCategories();
    categoriesResponse=this.categoriesRef.value;
    editBlogPostForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
    shortDescription: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(500)] }),
    content: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
    featuredImageUrl: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(500)] }),
    urlHandle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(200)] }),
    publishedDate: new FormControl<string>(new Date().toISOString().split('T')[0], { nonNullable: true, validators: [Validators.required] }),
    author: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
    isVisible: new FormControl<boolean>(true, { nonNullable: true }),
    categories: new FormControl<string[]>([])
  });

  onSubmit(){
    const id=this.id();
    if(id&&this.editBlogPostForm.valid){
 const formValue=this.editBlogPostForm.getRawValue();
    console.log(formValue);
    const updateBlogPostRequestDto:UpdateBlogPostRequest={
      title:formValue.title,
      shortDescription:formValue.shortDescription,
      content:formValue.content,
      author:formValue.author,
      featuredImageUrl:formValue.featuredImageUrl,
      isVisible:formValue.isVisible,
      publishedDate:new Date(formValue.publishedDate),
      urlHandle:formValue.urlHandle,
      categories:formValue.categories??[],
    };
    this.blogPostService.editBlogPost(id,updateBlogPostRequestDto).subscribe({
      next:()=>{
        console.log("success");
        this.router.navigate(['/admin/blogposts']);
      },
      error:()=>{
        console.log("something went wrong");
      }
    });

    }
   
  }

  effectRef = effect(()=>{
    if(this.blogPostResponse()){
      this.editBlogPostForm.patchValue({
      title:this.blogPostResponse()?.title,
      shortDescription:this.blogPostResponse()?.shortDescription,
      content:this.blogPostResponse()?.content,
      author:this.blogPostResponse()?.author,
      featuredImageUrl:this.blogPostResponse()?.featuredImageUrl,
      isVisible:this.blogPostResponse()?.isVisible,
      publishedDate:new Date(this.blogPostResponse()?.publishedDate!).toISOString().split('T')[0],
      urlHandle:this.blogPostResponse()?.urlHandle,
      categories:this.blogPostResponse()?.categories.map(x=>x.id),
      
    })
    }
  });

  selectedImageEffectRef=effect(()=>{
    const selectedImageUrl=this.imageSelectorService.selectedImage();
    if(selectedImageUrl){
      this.editBlogPostForm.patchValue({
        featuredImageUrl:selectedImageUrl,
      });
    }
  });

  onDelete(){
    const id=this.id();
    if(id){
      this.blogPostService.deleteBlogPost(id).subscribe({
        next:(response)=>{
          console.log(response);
          this.router.navigate(['/admin/blogposts']);
        },
        error:()=>{
          console.log("something went wrong");
        }
      })
    }
  }

  openImageSelector(){
    this.imageSelectorService.displayImageSelector();
  }
}
