import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata = {email:"",password:""};
  submit = false;
  loading = false;
  errorMessage="";

  constructor(private auth:AuthService){}

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit(){
    this.loading = true;
    //call login service
    this.auth.login(this.formdata.email,this.formdata.password)
    .subscribe({
      next:data=>{
        //store token
        this.auth.storeToken(data.idToken);
        console.log("logged user token" +data.idToken);
        this.auth.canAuthenticate();
        
      },
      error:data=>{
        if(data.error.error.message=="INVALID_PASSWORD"|| data.error.error.message=="INVALID_EMAIL"){
          this.errorMessage = "Invalid Credentials";
        }else{
          this.errorMessage = "Unknown Error when Logging into this Account!"
        }
      }
    }).add(()=>{
      this.loading = false;
      console.log("login Process completed");
      
    })

    

    
    

  }

}
