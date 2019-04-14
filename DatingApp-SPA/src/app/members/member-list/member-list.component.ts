import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
   users: User[];
   user: User = JSON.parse(localStorage.getItem('user'));
   genderList = [ {value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
   userParams: any = {};
   pagination: Pagination;

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadUsers();
    this.route.data.subscribe(data => {
      this.users = data['user'].result;
      this.pagination = data.user.pagination;
    });

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }
  resetFilters(){
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
     loadUsers(){
     this.userService.getUsers(this.pagination.currentPage , this.pagination.itemsPerPage , this.userParams)
     .subscribe(
       (res: PaginatedResult<User[]>) => {
        console.log(res.result)

        this.users = res.result;
        this.pagination = res.pagination;
     }, error => {
      this.alertify.error(error);
    });
  }
}
