import { Injectable } from '@angular/core';
import { Blog } from '../blog';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private serverUrl = 'http://localhost:3000/blogs';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<Blog[]>{
    return this.http.get<Blog[]>(this.serverUrl).pipe(
      tap(blog => console.log('Fetched blogs:', blog))
    );
  }

  getBlogById(id:number): Observable<Blog> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Blog>(url).pipe(
      tap(blog => console.log(`Fetched blog ${id}: `, blog))
    );
  }

  updateBlog(updatedBlog: Blog): Observable<Blog>  {
    const url = `${this.serverUrl}/${updatedBlog.id}`;
    return this.http.put<Blog>(url, updatedBlog).pipe(
      tap((blog: Blog) => console.log(`Updated blog ${updatedBlog.id} `, blog))
    );
  }

  addBlog(blog: Blog): Observable<Blog>  {
    return this.http.post<Blog>(this.serverUrl, blog).pipe(
      tap((newBlog: Blog) => console.log('Adding a blog ', newBlog))
    );
  }

  deleteBlog(id: number): Observable<Blog>  {
    const url = `${this.serverUrl}/${id}`;
    return this.http.delete<Blog>(url).pipe(
      tap(() => console.log(`Deleted blog ${id}`))
    );
  }

  deleteAllBlogs(): Observable<void> {
    return this.http.delete<void>(this.serverUrl).pipe(
      tap(() => console.log('Delete all blogs.'))
    );
  }
}
