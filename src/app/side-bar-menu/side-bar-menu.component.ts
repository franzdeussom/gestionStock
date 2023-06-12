import { CheckUserService } from './../../services/user/check-user.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.scss']
})
export class SideBarMenuComponent {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
    
    constructor(public typeUser: CheckUserService){

    }
  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
}
