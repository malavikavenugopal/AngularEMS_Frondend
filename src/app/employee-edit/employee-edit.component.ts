import { Component, OnInit } from '@angular/core';
import { employeeModel } from '../employee.model';
import { AdminapiService } from '../services/adminapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit{
  constructor(private route:ActivatedRoute , private api:AdminapiService ,private router:Router){}

employee: employeeModel={}

ngOnInit(): void {
  this.route.params.subscribe((res:any)=>{
    console.log(res.id);
    const {id} = res
    this.viewEmployee(id);
  }) 
}


viewEmployee(id:string){
  this.api.getEmployeeApi(id).subscribe({
    next:(res:any) => {
      console.log(res);
      //to make the input values as stored values
      this.employee=res
    },
    error:(err:any) => {
      console.log(err);
    }
  })
}  

editEmployee(id:any){

  this.api.updateEmployeeAPi(id,this.employee).subscribe({
    next:(res:any) => {
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Success...",
        text: "Update Successfull",
    
      });
      this.router.navigateByUrl('employees')
    },
    error:(err:any) => {
      console.log(err);
    }
  })
}


cancelbutton(id:any){
  this.viewEmployee(id)
}


}
