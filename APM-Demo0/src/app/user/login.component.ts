import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { State } from './state/user.reducer';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';

  maskUserName: boolean;

  constructor(private store: Store<State>,private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.store.select('user').subscribe( // the reference is the state and not the reducer, the reducer is loaded in the module will load the state specified here
      users => {
        if (users) {
          this.maskUserName = users.maskUserName;
        }
      }, err =>{
        console.error();
      });
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(): void {
    //this.maskUserName = !this.maskUserName;
    this.store.dispatch( // we dispatch the action here which is subscribed on the init method so the changes are listened/watched and loaded by the component
      { type: '[User] Mask User Name' }
    );
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }
}
