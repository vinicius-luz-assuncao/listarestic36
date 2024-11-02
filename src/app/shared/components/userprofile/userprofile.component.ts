import { AsyncPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent {

  profile!: User | null | undefined;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {

    this.auth.user$.subscribe((profile) => {
   
    this.profile = profile;
   
    });
   
    }
   

}
