import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../_modals/User';
import { NgForm } from '@angular/forms';
import { AuthSeriveService } from '../_service/auth-serive.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{


  user=new User();

  ngOnInit(): void { }

  constructor(private authSeriveService:AuthSeriveService,private router:Router) {}

  registerUser(registerForm:NgForm){
    this.authSeriveService.register(this.user).subscribe(
      (response)=>{
        
        registerForm.reset();
        this.router.navigate(['/login']);
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  reset(registerForm:NgForm){
    registerForm.reset();
  }
}


