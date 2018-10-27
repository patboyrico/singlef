import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthStateService } from '../../services/auth-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form = {
      email: null,
      password: null
  };

  public error;
  public returnUrl: string;


  constructor(private auth: AuthService,
              private token: TokenService,
              private router: Router,
              private authState: AuthStateService,
              private route: ActivatedRoute,
      ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
      this.auth.login(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
  }

  handleResponse(data) {
      this.token.handle(data.access_token);
      this.authState.changeAuthStatus(true);
      this.router.navigateByUrl(this.returnUrl);
  }

  handleError(error) {
      this.error = error.error.error;
  }

}
