import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //to show sidebar
  showMenuBar: boolean = true


  selected: Date | null = new Date();

  //piechart
  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions = {}; // required

  constructor(private api: AdminapiService) {


    this.chartOptions = {

      chart: {
        type: 'pie'
      },
      title: {
        text: 'Employee Composition Report'
      },
      tooltip: {
        valueSuffix: '%'
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
            enabled: true,
            distance: 20
          }, {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10
            }
          }]
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'employee',
          colorByPoint: true,
          data: [
            {
              name: 'FireBox',
              y: 55.02
            },
            {
              name: 'Chrome',
              sliced: true,
              selected: true,
              y: 26.71
            },
            {
              name: 'Safari',
              y: 1.09
            },
            {
              name: 'Edge',
              y: 15.5
            },
            {
              name: 'Opera',
              y: 1.68
            }
          ]
        }
      ]

    }
    HC_exporting(Highcharts);
  }

  menuBar() {
    this.showMenuBar = !this.showMenuBar
  }

  adminName: any = ""
  adminDetails: any = {}

  ngOnInit(): void {

    if (localStorage.getItem("name")) {
      this.adminName = localStorage.getItem("name")
    }
    this.allEmployee()

    //fetching all admin details

    this.api.authorization().subscribe((res: any) => {
      console.log(res);
      this.adminDetails = res

      if(res.picture){
        this.profileImage=res.picture
      }
  
    })


   
  }

  employeeCount: number = 0

  allEmployee() {

    this.api.getAllEmployeeApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.employeeCount = res.length
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  profileImage: string = "./assets/images/916999.png"

  editAdminStatus: boolean = false

  edit() {
    this.editAdminStatus = true
  }
 
  getFile(event: any) {
    let fileDetails = event.target.files[0]
    console.log(fileDetails);

    let fr = new FileReader()
    //read
    fr.readAsDataURL(fileDetails)

    fr.onload=(event:any)=>{
      console.log(event.target.result);
      this.profileImage=event.target.result
      this.adminDetails.picture = this.profileImage
      
    }
  }

  updateAdmin(){
    this.api.updateAdminapi(this.adminDetails).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Success...",
          text: `${this.adminDetails.name} Updated Successfully`,
      
        });
        localStorage.setItem("name",res.name)
        localStorage.setItem("password",res.pass)
       
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  cancel(){
    this.api.authorization().subscribe((res: any) => {
      console.log(res);
      this.adminDetails = res

      if(res.picture){
        this.profileImage=res.picture
      }
  
    })
    this.editAdminStatus= false
  }
}
