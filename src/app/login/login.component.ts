import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  user = new User();
  erreur = 0;
  message:string="login ou mot de passe erronés..";
  constructor(private authService: AuthService, private router: Router) {}
  onLoggedin()
  {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.erreur = 1;
        if(err.errors.errorCause="disabled"){
          this.message="utlisisateur désactivé, veuillez contacter l'administrateur";
        }
      }
    });
  }
}
