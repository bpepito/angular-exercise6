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
    const commentsText = (document.getElementById('comments') as HTMLTextAreaElement).value;
    const commentsArray = commentsText.split('\n').map(comment => comment.trim()).filter(comment => comment !== '');
    const updatedBlog : Blog = {
      id: id,
      title: (document.getElementById('title') as HTMLInputElement).value,
      description: (document.getElementById('description') as HTMLInputElement).value,
      author: (document.getElementById('author') as HTMLInputElement).value,
      comments: commentsArray,
    }
    this.blogService.updateBlog(updatedBlog);
  }

  delete(id:number) {
    this.blogs = this.blogs.filter(b => b.id !== id);
  }  
}
