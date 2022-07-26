import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  form: FormGroup | any;
  cls = '';
  message = '';
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ''
    });
  }
  submit(): void {
    this.http.post('/api/forgot', this.form.getRawValue())
      .subscribe(
        () => {
          this.cls = 'success';
          this.message = "Email was sent!";
        },
        () => {
          this.cls = 'danger';
          this.message = "Email does not exist!";
        }
      )
  }


}
