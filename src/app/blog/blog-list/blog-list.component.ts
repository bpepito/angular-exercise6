import { Component, OnInit } from '@angular/core';
import { Blog } from '../blog';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit{
  blogs: Blog[] = [];

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.blogs = this.blogService.getBlogs();
  }

  edit(id: number): void {
    this.router.navigate([`/blog/form`, id]);
  }

  delete(id: number): void {
    this.blogService.deleteBlog(id);
    this.blogs = this.blogService.getBlogs();
  }

  handleCommand(action: string): void {
    if (action === 'add') {
      this.router.navigate(['/blog/form']);
    } else if (action === 'deleteAll') {
      this.blogService.deleteAllBlogs();
      this.blogs = [];
    }
  }
}
