import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor( private authService: AuthService, private userService: UserService, private alertify: AlertifyService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;

});  
this.likesParam  = 'Likers';
   }
    loadUsers(){
      this.userService.getUsers(this.pagination.currentPage , this.pagination.itemsPerPage , null,this.likesParam)
      .subscribe(
        (res: PaginatedResult<User[]>) => {
         console.log(res.result)
 
         this.users = res.result;
         this.pagination = res.pagination;
      }, error => {
       this.alertify.error(error);
     });
   }
   pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

}
