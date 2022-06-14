import { take } from 'rxjs/operators';
import { AccountService } from './../../_services/account.service';
import { UserParams } from './../../_models/userParams';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { Pagination } from 'src/app/_modules/pagination';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  //members$: Observable<Member[]>;
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList = [{value: 'male', display:'Males'}, {value: 'female', display:'Females'}]

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
   }

  ngOnInit(): void {
    //this.members$ = this.memberService.getMembers();
    this.loadMembers();
  }

    loadMembers(){   
      this.memberService.setUserParams(this.userParams);  
      this,this.memberService.getMembers(this.userParams).subscribe(response => {
        this.members = response.result;
        this.pagination = response.pagination;
      })
    }

    resetFilters(){
      this.userParams = this.memberService.resetUserParams();
      this.memberService.setUserParams(this.userParams);
      this.loadMembers();
    }

    pageChanged(event: any){
      this.userParams.pageNumber = event.page;
      this.loadMembers();
    }
  // loadMembers(){
  //   this.memberService.getMembers().subscribe(members => {
  //     this.members = members;
  //     console.log(members);
  //   })
  // }

}
