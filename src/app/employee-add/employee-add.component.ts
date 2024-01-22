import { Component } from '@angular/core';
import { employeeModel } from '../employee.model';
import { AdminapiService } from '../services/adminapi.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {

  constructor(private api: AdminapiService,private addRouter:Router) { }
  //variables to store the value from the input box which have the same structure of employeeModel
  employee: employeeModel = {}

  cancelEmployee() {
    this.employee = {}
  }

  addEmployee() {
    console.log(this.employee);

    if(!this.employee.id || !this.employee.name || !this.employee.email || !this.employee.status){
      alert("Please fill the form ")
    }
    else{
      this.api.addEmployeeApi(this.employee).subscribe({

        next:(res:employeeModel) => {
          console.log(res);
          

          Swal.fire({
            icon: "success",
            title: "Success...",
            text: `${this.employee.name} Added Successfully`,
        
          });
         
          this.addRouter.navigateByUrl('employees')
        },
        error:(err:any) => {
          console.log(err);
         
  
        }
      })
    }
  }
}
