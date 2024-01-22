
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employeeModel } from '../employee.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminapiService {

  constructor(private http: HttpClient) { }

  public sharedData = new BehaviorSubject(false)

  updatedata(data:any){
    //to access the new value
   this.sharedData.next(data)
  }

  server_URL = "http://localhost:3000"


  authorization() {
    return this.http.get(`${this.server_URL}/employee/1`)
  }

  //we have to send body in post method
  addEmployeeApi(employee: employeeModel) {
    return this.http.post(`${this.server_URL}/employee`, employee)
  }

  getAllEmployeeApi() {
    return this.http.get(`${this.server_URL}/employee`)
  }

  deleteEmployeeApi(id: any) {
    return this.http.delete(`${this.server_URL}/employee/${id}`)
  }

  
  getEmployeeApi(id: any) {
    return this.http.get(`${this.server_URL}/employee/${id}`)
  }


  updateEmployeeAPi(id:any,employee:any){
    return this.http.put(`${this.server_URL}/employee/${id}`,employee)
  }

  updateAdminapi(admin:any){
    return  this.http.put(`${this.server_URL}/employee/1`,admin)
  }


}
