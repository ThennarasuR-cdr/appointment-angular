import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  email:string='';
  password:string='';

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {}

  onSubmit(){
    const payload = { email: this.email, password: this.password };
    this.http.post(environment.apiUrl+'sign-in', payload)
      .subscribe((response:any)=>{
        this.cookieService.set("token",response.data.token);
        this.router.navigate(['/appointments']);
      });
  }
}
