import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../classes/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = '';
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('/api/user')
      .subscribe(
        (user: any) => {
          this.message = `Hi ${user.first_name} ${user.last_name}`
          Auth.authEmitter.emit(true)
        },
        () => {
          this.message = 'You are not logged in'
          Auth.authEmitter.emit(false)
        });
  }

}
