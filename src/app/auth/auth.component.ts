import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.services';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLoginMode:boolean = true
  authForm: FormGroup = new FormGroup({});
  isLoading:boolean = false;
  error:string|null = null;
  constructor(private formBuilder:FormBuilder, private authService:AuthService) {}

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  

  onSubmitFormLogin(){
    console.log(this.authForm.value);
    if(this.authForm.valid){
      this.isLoading = true;
      if(this.isLoginMode){
        this.authService.login({email:this.email?.value, password:this.password?.value, returnSecureToken:true}).subscribe(data=>{
            console.log(data)
            this.isLoading = false;
        }, errorMessage=>{
          this.error = errorMessage;
          this.isLoading = false;
        })
      }else{
        this.authService.signIn({email:this.email?.value, password:this.password?.value}).subscribe(data=>{
          console.log(data);
          this.isLoading = false;
        }, errorMessage =>{
          this.error = errorMessage;
          this.isLoading = false;
        })
      }
    }else{
      return;
    }
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  get email(){
    return this.authForm.get("email");
  }

  get password(){
    return this.authForm.get("password");
  }


}
