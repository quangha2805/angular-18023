import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  menuList = [
    {
      label: 'Products',
      link: '/admin/products',
    },
  ];

  constructor(private userService: UserService) {}

  logout() {
    this.userService.logout();
  }
}
