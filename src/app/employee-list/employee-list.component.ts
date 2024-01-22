import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import { employeeModel } from '../employee.model';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  /* onInit is an interface to implements ngoninit function */

  constructor(private api: AdminapiService) { }

  employee: employeeModel = {}

  /* employeemodel is an object but we get an array */
  employeeDetails: employeeModel[] = []


  searchkey: string = ""


  ngOnInit(): void {
    this.allEmployee()
  }
  allEmployee() {

    this.api.getAllEmployeeApi().subscribe({
      next: (res: any) => {
        this.employeeDetails = res
        console.log(this.employeeDetails);

      },
      error: (res: any) => {
        console.log(res);

      }
    })
  }

  deleteEmployee(id: any) {

    console.log(id);
    this.api.deleteEmployeeApi(id).subscribe({

      next: (res: any) => {
        console.log(res);

        this.allEmployee()

      },
      error: (res: any) => {
        console.log(res);

      }
    })


  }

  sortbyId() {
    this.employeeDetails.sort((a: any, b: any) => a.id - b.id)
  }
  sortbyName() {
    this.employeeDetails.sort((a: any, b: any) => a.name.localeCompare(b.name))
  }

  generatePdf() {


    //create a object for jsPDF
    const pdf = new jsPDF()
    //creating header
    let head = [['Id', 'Employee Name', 'Email', 'Status']]

    let body: any = []
    this.employeeDetails.filter((items) => items.id != '1').forEach((items) => {
      body.push([items.id, items.name, items.email, items.status])
    })


    /* fontsize */
    pdf.setFontSize(16)

    /* title */
    pdf.text('Employee Details', 10, 10)

    /*   table */
    autoTable(pdf, { head, body })

    /*   open in new table */
    pdf.output('dataurlnewwindow')

    /* save and download */
    pdf.save('employee.pdf')

  }

  //for pagination
  p: number = 1;
  


}
