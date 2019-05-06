import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolves/member-detail.resolver';
import { MemberListResolver } from './_resolves/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolves/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolves/lists.resolver';
import { MessagesResolver } from './_resolves/messages.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
           path: '',
           runGuardsAndResolvers: 'always',
           canActivate: [AuthGuard],
           children: [
            { path: 'members', component: MemberListComponent , resolve: {user: MemberListResolver}},
            { path: 'members/:id', component: MemberDetailComponent , resolve: {user: MemberDetailResolver}}, 
// tslint:disable-next-line: max-line-length
            {path: 'member/edit', component: MemberEditComponent , resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            { path: 'messages', component: MessagesComponent ,resolve: {messages: MessagesResolver}},
            { path: 'lists', component: ListsComponent, resolve: {users: ListsResolver} },
           ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];