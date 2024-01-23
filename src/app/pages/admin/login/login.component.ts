import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginform = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private router: Router,
    private toastrservice: ToastrService,
  ) { }

  loginUser() {
    const { email, password } = this.loginform.value;
    this.userservice.getUserByEmail(email as string).subscribe({
      next: response => {
        console.log(response); 
        if (response.length > 0 && response[0].password === password) {
          sessionStorage.setItem('email', email as string);
          this.toastrservice.success('Successfully Login', "Success")
          this.router.navigate(['/admin']);
        } else {
          this.toastrservice.error('Email hoặc mật khẩu không đúng', 'Lỗi');
        }
      },
      error: error => {
        this.toastrservice.error('Đã xảy ra lỗi. Vui lòng thử lại sau.', 'Lỗi');
      }
  })
  }
}
