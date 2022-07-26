import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  form: FormGroup | any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: '',
      password_confirm: '',
    });
  }
  submit(): void {
    const formdData = this.form.getRawValue();
    const data = {
      token: this.route.snapshot.params['token'],
      password: formdData.password,
      password_confirm: formdData.password_confirm
    }
    this.http.post('/api/reset', data)
      .subscribe(
        () => this.router.navigate(['/login'])
      )
  }

}
