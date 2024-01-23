import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2'
export const authGuard: CanActivateFn = () => {

  //dependency injection
  const authStatus = inject(AuthService)
  const router = inject(Router)
  if (authStatus.islogged()) {
    return true;
  }
  else {
    alert("Please Login to continue")
    router.navigateByUrl("")
    return false;


  }

};

