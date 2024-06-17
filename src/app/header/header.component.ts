import { Component } from '@angular/core';
import { AuthSeriveService } from '../_service/auth-serive.service';
import { UserAuthServiceService } from '../_service/user-auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(
    private userAuthService: UserAuthServiceService,
    private router: Router,
    public userService:AuthSeriveService
  ) {}

  ngOnInit(): void {}

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }
}
