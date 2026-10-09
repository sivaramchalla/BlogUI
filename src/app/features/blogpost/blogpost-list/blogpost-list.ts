import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../services/blog-post-service';

@Component({
  selector: 'app-blogpost-list',
  imports:  [RouterLink],
  templateUrl: './blogpost-list.html',
  styleUrl: './blogpost-list.css',
})
export class BlogpostList {
    blogPostSerice=inject(BlogPostService);
    getAllblogPostRef=this.blogPostSerice.getAllBlogPosts();
    isLoading=this.getAllblogPostRef.isLoading;
    error=this.getAllblogPostRef.error;
    response=this.getAllblogPostRef.value;

}
