import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(employeeDetails: any[], searchkey: string): any[] {
    
    const result:any = []
    
    
    if(!employeeDetails || searchkey===""){
      return employeeDetails
    }
    employeeDetails.forEach((item:any)=>{
   
      if(item.name.trim().toLowerCase().includes(searchkey.trim().toLowerCase())){
        result.push(item)
      } 
    })
    
    return result;
}
}