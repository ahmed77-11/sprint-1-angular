import {Component, OnInit} from '@angular/core';
import {User} from "../model/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
})
export class VerifEmailComponent implements OnInit{

  code: string = '';
  user:User = new User();
  err:string="";

  constructor(private route:ActivatedRoute,private authService:AuthService,private router:Router,private toastr:ToastrService) {
  }

  ngOnInit(): void {
    this.user=this.authService.registeredUser;
  }
  onValidateEmail(){

    this.authService.validateEmail(this.code).subscribe( {
      next:(res)=>{
        this.toastr.success('Login successful');
        console.log(this.authService.registeredUser,this.user)
        this.authService.login(this.user).subscribe({
          next:(data)=>{
            console.log("ffff")
            let jwtToken=data.headers.get('Authorization');
            this.authService.saveToken(jwtToken);
            this.router.navigate(['/']);
          },error:(error:any)=>{
            console.log(error);
          }
        });
      },error:(err:any)=>{
        if(err.error.errorCode=="INVALID_TOKEN"){
          this.err="Code invalide!"

        }
        if (err.error.errorCode=="EXPIRED_TOKEN") {
          this.err = "Code a expiré!"
        }
          console.log(err.errorCode);
      }
    });
  }

}
