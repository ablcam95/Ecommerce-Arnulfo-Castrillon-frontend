import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Userdto } from '../../../common/userdto';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authenticationService: AuthenticationService) {}

  login() {
    const userDto = new Userdto(this.username, this.password);

    this.authenticationService.login(userDto).subscribe(
      token => console.log(token))

      console.log(userDto);




  }
}
