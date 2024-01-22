import { Component } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import { R3SelectorScopeMode } from '@angular/compiler';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ""
  password: string = ""

  constructor(private api: AdminapiService, private loginRouter: Router) {
  }

  login() {
    if (!this.email || !this.password) {
      alert("Please fill the form ")
    }
    else {

      this.api.authorization().subscribe({

        next: (res: any) => {

          const { email, password } = res

          console.log(res);

          if (email == this.email && password == this.password) {


            Swal.fire({
              icon: "success",
              title: "Success...",
              text: "Login Successfull",

            });
            //updating
            this.api.updatedata({ d: true })

            
            localStorage.setItem("name", res.name)
            localStorage.setItem("password", res.pass)

            //navigate
            this.loginRouter.navigateByUrl('dashboard')
          }
          else {

            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Invalid Email or Password",

            });
          }
        },
        error: (res: any) => {
          console.log(res);

        }
      })
    }
  }






}
