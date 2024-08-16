import { Injectable } from '@angular/core';
import { Blog } from '../blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogs:Blog[] = [
    {
      id: 1,
      title: 'Enjoy It',
      description: 'A lifestyle and DIY, full of tons of great inspiration for all things DIY.',
      author: 'Elise Cripe',
      comments: ['I just really dig the way she thinks about and appreciates life, and love her style.'],
    },
    {
      id: 2,
      title: 'Cupcakes & Cashmere',
      description: 'A lifestyle fashion blog, full of all sorts of great posts on everything from fashion/beauty to decor.',
      author: 'Emily Schuman',
      comments: ['Her beauty tutorials are also always fascinating and spot-on.'],
    },
    {
      id: 3,
      title: 'Advice from a Twenty Something',
      description: 'A lifestyle blog, full of “advice for the modern girl” on everything from fashion to beauty.',
      author: 'Amanda Holstein',
      comments: ['She shares all sorts of helpful tutorials on all things stylish.'],
    },
  ]

  constructor() {}

  getBlogs(): Blog[] {
    return this.blogs;
  }

  getBlogById(id:number): Blog | undefined {
    return this.blogs.find(b => b.id === id);
  }

  updateBlog(updatedBlog: Blog):void {
    const index = this.blogs.findIndex(b => b.id === updatedBlog.id);
    if(index !== -1)
      this.blogs[index] = updatedBlog;
  }

  deleteBlog(id: number): void {
    this.blogs = this.blogs.filter(b => b.id !== id);
  }

  addBlog(blog: Blog): void {
    this.blogs.push(blog);
  }

  deleteAllBlogs(): void {
    this.blogs = [];
  }

  getBlogCount(): number {
    return this.blogs.length;
  }
}
