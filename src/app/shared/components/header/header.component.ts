import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import { UserprofileComponent } from "../userprofile/userprofile.component";
import { LoginComponent } from "../login/login.component";
import { AsyncPipe } from '@angular/common';
import { Inject } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatGridListModule, UserprofileComponent, LoginComponent, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  profile!: User | null | undefined;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {

    this.auth.user$.subscribe((profile) => {
   
    this.profile = profile;
   
    });
   
    }
  
 
}
