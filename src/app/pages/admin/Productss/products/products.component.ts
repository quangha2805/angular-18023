import { Component, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Product, ProductAdmin } from '../../../../types/Product';
import { ProductService } from '../../../../services/product.service';
import { RouterLink } from '@angular/router'; // import service
import { SidebarComponent } from '../../../../components/sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../types/Category';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    RouterLink,
    SidebarComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  searchForm = this.fb.group({
    name: [''],
    category: [''],
  });

  productService = inject(ProductService);
  toastrSevice = inject(ToastrService); // inject vao bien
  categoryService = inject(CategoryService);

  perPage: number = 5;
  currentPage: number = 1;
  length: number = 0;
  // products: ProductAdmin[] = [];
  productList: Product[] = [];
  categoryList: Category[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productService.getProductListAdmin().subscribe((products) => {
      this.length = products.length;
      this.productList = products.slice(this.currentPage - 1, this.perPage);
    }); // callApi.then(cb fuc)

    this.categoryService
      .getAllCate()
      .subscribe((categories) => (this.categoryList = categories)); // callApi.then(cb fuc)

    this.searchForm.valueChanges.subscribe((data) => {
      this.productService.getProductListAdmin().subscribe((products) => {
        const productFiltered = products.filter(
          (product) =>
            product.title
              .toLowerCase()
              .includes(data.name?.toLocaleLowerCase() || '') &&
            product.category
              .toLowerCase()
              .includes(data.category?.toLocaleLowerCase() || '')
        );

        this.length = productFiltered.length;

        this.productList = productFiltered.slice(0, this.perPage);
      });
    });
  }

  handleDeleteProduct(id: number) {
    const isDelete = confirm('Are you sure you want to delete this product');
    if (isDelete) {
      this.productService
        .deleteProductAdmin(id)
        .subscribe(
          () =>
            (this.productList = this.productList.filter(
              (product) => product.id !== Number(id)
            ))
        );
      this.toastrSevice.success('Successfully deleted', 'Success');
    }
  }

  ceilNumber(num: number) {
    return Math.ceil(num);
  }

  generatePagination(currentPage: number, max: number) {
    var current = currentPage,
      last = max,
      delta = 2,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l;

    for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }

  onChangePage(page: string | number) {
    if (page.toString().trim() === '...') return;
    this.currentPage = Number(page);

    const { name, category } = this.searchForm.value;

    if (name || category) {
      this.productService.getProductListAdmin().subscribe((products) => {
        const productFiltered = products.filter(
          (product) =>
            product.title
              .toLowerCase()
              .includes(name?.toLocaleLowerCase() || '') &&
            product.category
              .toLowerCase()
              .includes(category?.toLocaleLowerCase() || '')
        );

        this.length = productFiltered.length;

        const totalPages = Math.ceil(this.length / this.perPage);

        this.currentPage = Math.max(1, Math.min(this.currentPage, totalPages));

        let from = Math.max((this.currentPage - 1) * this.perPage, 0);
        let to = Math.min(this.currentPage * this.perPage, this.length);

        if (this.currentPage === totalPages) {
          from = Math.max(this.length - this.perPage, 0);
        }

        this.productList = productFiltered.slice(from, to);
      });

      return;
    }

    this.productService.getProductListAdmin().subscribe((products) => {
      this.length = products.length;

      const totalPages = Math.ceil(this.length / this.perPage);

      this.currentPage = Math.max(1, Math.min(this.currentPage, totalPages));

      let from = Math.max((this.currentPage - 1) * this.perPage, 0);
      let to = Math.min(this.currentPage * this.perPage, this.length);

      if (this.currentPage === totalPages) {
        from = Math.max(this.length - this.perPage, 0);
      }

      this.productList = products.slice(from, to);
    });
  }
}
