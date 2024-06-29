import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  name:string='';
  email:string='';
  password:string='';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(){
    const payload = { email: this.email, name: this.name, password: this.password };
    this.http.post(environment.apiUrl+'sign-up', payload)
      .subscribe((response:any)=>{
        this.router.navigate(['/sign-in']);
      });
  }
}
