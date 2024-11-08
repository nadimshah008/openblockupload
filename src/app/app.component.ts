import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
})
export class AppComponent implements OnInit {
  delForm: any = FormGroup;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}
  user_mobile: any;
  reason: any;
  isValid: boolean = false;

  ngOnInit(): void {
    this.delForm = this.fb.group({
      user_mobile: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
      ],
      reason: [''],
    });
  }
  submit(data: any) {
    let datas = {
      user_mobile: '+91' + data.user_mobile,
      reason: data.reason,
    };
    this.http
      .post('http://3.109.153.67/reguser/useraccessplaystor', datas)
      .subscribe({
        next: (data: any) => {
          this.toastr.success(data.responseContents, '', { timeOut: 2500 });
          this.delForm.reset();
        },
        error: (err: any) => {
          this.toastr.error('Failed to delete user', '', { timeOut: 1000 });
        },
      });
  }
}
