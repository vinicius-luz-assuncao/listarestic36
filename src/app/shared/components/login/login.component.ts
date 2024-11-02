import { UserprofileComponent } from "../userprofile/userprofile.component";
import { AsyncPipe, DOCUMENT, NgIf} from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [UserprofileComponent, AsyncPipe, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
 
  profile!: User | null | undefined;

  
  
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({
      logoutParams: { returnTo: this.doc.location.origin },
    });}

}
