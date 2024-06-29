import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  title:string='';
  date:string='';
  startTime:string='';
  endTime:string='';
  appointments:any[]=[];
  modalOpen:boolean=false;
  editAppointment:any=null;
  statusOptions=['Scheduled', 'Completed', 'Cancelled'];
  filterDate:string='';

  constructor(private http: HttpClient, private cookieService: CookieService){}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get(environment.apiUrl+'appointments?filterDate='+this.filterDate,{
      headers: new HttpHeaders({'Authorization': 'Bearer '+ this.cookieService.get('token')}),
    })
    .subscribe((response) => {
      const fetchedAppointments = response as any[];

      fetchedAppointments.map((appointment:any)=>{
        appointment.date = this.formatDate(appointment.date);
      })
      this.appointments = response as any[];
    });
  }

  onAdd(){
    this.http.post(environment.apiUrl+'appointments',{
      title:this.title,
      date:this.formatDate(this.date),
      startTime:this.startTime,
      endTime:this.endTime,
    },{
      headers: new HttpHeaders({'Authorization': 'Bearer '+ this.cookieService.get('token')}),
    })
    .subscribe((response) => {
      console.log(response)
    });

    this.fetchData();
  }

  onDelete(id:string){
    this.http.delete(environment.apiUrl+'appointments/'+id,{
      headers: new HttpHeaders({'Authorization': 'Bearer '+ this.cookieService.get('token')}),
    }).subscribe((response) => {
      console.log(response)
    });

    this.fetchData();
  }

  onEdit(appointment:any){
    this.modalOpen = true;
    appointment.date = this.formatDate(appointment.date)
    this.editAppointment = appointment;
  }

  onUpdate(){
    this.http.patch(environment.apiUrl+'appointments/'+this.editAppointment._id,this.editAppointment,{
      headers: new HttpHeaders({'Authorization': 'Bearer '+ this.cookieService.get('token')}),
    }).subscribe((response) => {
      console.log(response)
      this.editAppointment=null;
      this.modalOpen=false;
      this.fetchData();
    });
  }

  onApplyFilter(){
    this.fetchData();
  }

  onClearFilter(){
    this.filterDate='';
    this.fetchData();
  }

  formatDate(date:string) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
}
