import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../blog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css'
})
export class BlogFormComponent implements OnInit, OnDestroy {
  blogForm!: FormGroup;
  blogId?: number;
  commentsFormArray: FormArray;
  sub: Subscription | undefined;

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
    this.commentsFormArray = this.blogForm.controls['comments'] as FormArray;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe;
  }

  ngOnInit(): void {
    this.blogId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.blogId) {
      const blog = this.blogService.getBlogById(this.blogId).subscribe({
        next: (blog: Blog) => {
          this.blogForm.patchValue({
              title: blog.title,
              description: blog.description,
              author: blog.author
            });
            const comments = this.blogForm.get('comments') as FormArray;
            blog.comments.forEach(comment => comments.push(this.fb.control(comment, Validators.required)));
        }}
      );
    }
  }

  get comments(): FormArray {
    return this.blogForm.get('comments') as FormArray;
  }

  addComment(): void {
    this.commentsFormArray.controls.push(new FormControl(''));
  }

  removeComment(index: number): void {
    this.commentsFormArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      const formValue = this.blogForm.value;
      const blog: Blog = {
        id: this.blogId as number,
        title: formValue.title,
        description: formValue.description,
        author: formValue.author,
        comments: formValue.comments
      };
      
      const request = this.blogId
        ? this.blogService.updateBlog(blog)
        : this.blogService.addBlog(blog);
      
      request.subscribe({
        next: () => {
          this.router.navigate(['/blog']);
        }
      })
    }
  }

}
