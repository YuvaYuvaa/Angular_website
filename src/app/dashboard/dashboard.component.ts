import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth:AuthService){ }
  user = {localID:"hi",displayName:"hi"};

    ngOnInit(): void {

      this.auth.canAccess();
      if(this.auth.isAuthenticated()){
        //call user details service
        this.auth.detail().subscribe({
          next:data=>{
            this.user.localID = data.users[0].localId;
            this.user.displayName = data.users[0].displayName;
          }
        })
      }

    }
  

}
