import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuList = [
    {
      label: 'Products',
      link: '/admin/products'
    },
  ]
}
