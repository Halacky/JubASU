import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  aSub! : Subscription;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

   ngOnDestroy(){
     if(this.aSub){
      this.aSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null,[Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
  };

  onSubmit(){
    this.form.disable()
    this.aSub=this.auth.login(this.form.value).subscribe(
      ()=> {
        console.log("LOgin sweet hollyshit");
        this.router.navigate(["/adminPanel"]);
      },
      (error)=> {
        console.warn(error);
        this.form.enable();
      }
    );
  }
}
