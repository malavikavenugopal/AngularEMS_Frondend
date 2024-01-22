import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminapiService } from '../services/adminapi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  logged: boolean = false
  constructor(private loginRouter: Router, private api: AdminapiService) {
    api.sharedData.subscribe((data: any) => {
      this.logged = data
    })

  }
  logout() {
    localStorage.removeItem("name")
    localStorage.removeItem("password")

    //navigate
    this.loginRouter.navigateByUrl('')

    this.logged = false

  }
}
/* behaviour subject */