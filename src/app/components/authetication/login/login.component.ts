import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Userdto } from '../../../common/userdto';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authenticationService: AuthenticationService,
    private sessionStorage:SessionStorageService,
    private router: Router) {}

  login() {
    const userDto = new Userdto(this.username, this.password);

    this.authenticationService.login(userDto).subscribe(
      token => {
        console.log(token);
        this.sessionStorage.setItem('token', token);
        if(token.type === 'ADMIN'){
          this.router.navigate(['/admin/product'])
        }
        else{
          this.router.navigate(['/'])
        }


      });

      console.log(userDto);




  }
}
