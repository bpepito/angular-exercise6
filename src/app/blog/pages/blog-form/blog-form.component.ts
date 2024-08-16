import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../blog';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css'
})
export class BlogFormComponent implements OnInit{
  blogForm!: FormGroup;
  blogId?: number;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.blogForm = this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      comments: this.fb.array([this.fb.control('', Validators.required)]),
    });
  }

  ngOnInit(): void {
    this.blogId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.blogId) {
      const blog = this.blogService.getBlogById(this.blogId);
      if (blog) {
        this.blogForm.patchValue({
          title: blog.title,
          description: blog.description,
          author: blog.author,
        });
        const comments = this.blogForm.get('comments') as FormArray;
        blog.comments.forEach(comment => comments.push(this.fb.control(comment, Validators.required)));
      }
    }
  }

  get comments(): FormArray {
    return this.blogForm.get('comments') as FormArray;
  }

  addComment(): void {
    this.comments.push(this.fb.control('', Validators.required));
  }

  removeComment(index: number): void {
    this.comments.removeAt(index);
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      const formValue = this.blogForm.value;
      const blog: Blog = {
        id: this.blogId ?? this.blogService.getBlogCount() + 1,
        title: formValue.name,
        description: formValue.description,
        author: formValue.author,
        comments: formValue.comments
      };

      if (this.blogId) {
        this.blogService.updateBlog(blog);
      } else {
        this.blogService.addBlog(blog);
      }
      this.router.navigate(['/blog']);
    }
  }
}
