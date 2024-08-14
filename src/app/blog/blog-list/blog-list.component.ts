import { Component, OnInit } from '@angular/core';
import { Blog } from '../blog';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit{
  blogs:Blog[] = [];

  constructor(private blogService:BlogService) {}

  ngOnInit(): void {
    this.blogs = this.blogService.getBlogs();
  }

  edit(id:number) {
    const updatedBlog : Blog = {
      id: id,
      title: (document.getElementById('title') as HTMLInputElement).value,
      description: (document.getElementById('description') as HTMLInputElement).value,
      author: (document.getElementById('author') as HTMLInputElement).value,
      comments: (document.getElementById('comments') as HTMLInputElement).value,
    }
    this.blogService.updateBlog(updatedBlog);
  }

  delete(id:number) {
    this.blogs = this.blogs.filter(b => b.id !== id);
  }  
}
