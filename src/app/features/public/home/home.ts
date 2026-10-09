import { Component, inject } from '@angular/core';
import { BlogPostService } from '../../blogpost/services/blog-post-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
blogPostService=inject(BlogPostService);
blogPostRef=this.blogPostService.getAllBlogPosts();
isLoading=this.blogPostRef.isLoading;
blogPostResponse=this.blogPostRef.value;

}
