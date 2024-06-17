import { Component } from '@angular/core';
import { AuthSeriveService } from '../_service/auth-serive.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  message: any;
  constructor(private userService:AuthSeriveService ) { }

  ngOnInit(): void {
    this.forUser();
  }

  forUser() {
    this.userService.forUser().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
