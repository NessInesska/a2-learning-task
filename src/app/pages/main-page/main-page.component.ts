import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, forkJoin } from 'rxjs';

import { GENDERS } from '../../constants';
import { ProductService, UserService } from '../../services';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {

  @ViewChild('showFiltersButton') public dropdownFiltersButton: ElementRef;

  @ViewChild('dropdownContent') public dropdownContent: ElementRef;

  public isOpened = false;
  public login: string;
  public productArray;
  public item;
  public isAdmin = false;
  public categories;
  public genders = ['Woman', 'Man', 'Unisex'];

  public _products = new BehaviorSubject<any[]>([]);
  public _filteredProducts = new BehaviorSubject<any[]>([]);
  public genderFilterControl = new FormControl();

  constructor(private userService: UserService,
              private productService: ProductService) {
  }

  // public ngOnChanges(): void {
  //   this.cd.detectChanges();
  // }

  public ngOnInit() {
    this._products.next(this.getStudents());
    // setTimeout(() => {
      this.setFilters();
    // }, 2000);
  }

  public onFiltersClick(): void {
    if (this.isOpened) {
      this.dropdownFiltersButtonClick();
      return;
    }
    this.isOpened = true;
    setTimeout(() => {
      this.dropdownFiltersButtonClick();
    });
  }

  public closeDropdown() {
    this.isOpened = false;
  }

  public filterProducts() {
    this.setFilters();
  }

  public update() {
    this.productArray.item = null;
  }

  private dropdownFiltersButtonClick(): void {
    if (!!this.dropdownFiltersButton) {
      this.dropdownFiltersButton.nativeElement.click();
    }
  }

  // private getProductsInfo(): any {
  //   const getCategories = this.productService.getCategories();
  //   const getProductItems = this.productService.getProducts();
  //
  //   forkJoin([getCategories, getProductItems]).subscribe(data => {
  //     // data [0] is categories
  //     // data [1] is products
  //     this.categories = data[0];
  //     this._products = data[1];
  //     this.login = localStorage.getItem('login');
  //     if (localStorage.getItem('isAdmin')) {
  //       this.isAdmin = true;
  //     }
  //   });
  // }

  private setFilters() {
    this._filteredProducts.next(this._products.value);

    combineLatest(
      this._products,
      this.genderFilterControl.valueChanges,
    ).subscribe(([productArray, genderFilter]) => {
      let filteredProducts = [...productArray];

      if (genderFilter) {
        filteredProducts = filteredProducts
          .filter(product => product.gender === genderFilter);
      }
      this._filteredProducts.next(filteredProducts);
    });
    this.genderFilterControl.setValue('');
  }

  private getStudents() {

    return JSON.parse(`
    [
        {
          "id": 3,
          "categoryId": 0,
          "image": "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?h=350&auto=compress&cs=tinysrgb",
          "name": "Active wear Lorem Ipsum 4",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "cost": 37.99,
          "rating": 0,
          "gender": "Woman",
          "count": 5,
          "soldCount": 0
        },
        {
          "id": 4,
          "categoryId": 0,
          "image": "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?h=350&auto=compress&cs=tinysrgb",
          "name": "Active wear Lorem Ipsum 5",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "cost": 24.99,
          "rating": 2,
          "gender": "Woman",
          "count": 0,
          "soldCount": 0
        },
        {
          "id": 10,
          "categoryId": 1,
          "image": "https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?h=350&auto=compress&cs=tinysrgb",
          "name": "Lorem lorem ",
          "description": "Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem ",
          "cost": "129",
          "rating": 4,
          "gender": "Man",
          "count": 10,
          "soldCount": 0
        },
        {
          "id": 11,
          "categoryId": 1,
          "image": "https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?h=350&auto=compress&cs=tinysrgb",
          "name": "Jeans Lorem Ipsum 2",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero enim, sollicitudin a elit vel, dapibus pellentesque nunc. Phasellus ac rutrum massa. Vivamus non nulla lobortis augue ullamcorper congue.",
          "cost": 137.99,
          "rating": 5,
          "gender": "Man",
          "count": 4,
          "soldCount": 1
        },
        {
          "id": 12,
          "categoryId": 1,
          "image": "https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?h=350&auto=compress&cs=tinysrgb",
          "name": "Jeans Lorem Ipsum 3",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "cost": 357.99,
          "rating": 2,
          "gender": "Unisex",
          "count": 27,
          "soldCount": 3
        },
        {
          "id": 13,
          "categoryId": 1,
          "image": "https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?h=350&auto=compress&cs=tinysrgb",
          "name": "Jeans Lorem Ipsum 4",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "cost": 277.99,
          "rating": 3,
          "gender": "Woman",
          "count": 10,
          "soldCount": 0
        },
        {
          "id": 14,
          "categoryId": 1,
          "image": "https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?h=350&auto=compress&cs=tinysrgb",
          "name": "Jeans Lorem Ipsum 5",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "cost": 752.99,
          "rating": 5,
          "gender": "Woman",
          "count": 10,
          "soldCount": 0
        },
        {
          "id": 20,
          "categoryId": 2,
          "image": "https://images.pexels.com/photos/4156/fashion-woman-model-portrait.jpg?h=350&auto=compress&cs=tinysrgb",
          "name": "Coats Lorem Ipsum 1",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero enim, sollicitudin a elit vel, dapibus pellentesque nunc. Phasellus ac rutrum massa. Vivamus non nulla lobortis augue ullamcorper congue.",
          "cost": 523.99,
          "rating": 2,
          "gender": "Man",
          "count": 5,
          "soldCount": 0
        },
        {
          "id": 21,
          "categoryId": 2,
          "image": "https://images.pexels.com/photos/4156/fashion-woman-model-portrait.jpg?h=350&auto=compress&cs=tinysrgb",
          "name": "Coats Lorem Ipsum 2",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero enim, sollicitudin a elit vel, dapibus pellentesque nunc. Phasellus ac rutrum massa. Vivamus non nulla lobortis augue ullamcorper congue.",
          "cost": 409.99,
          "rating": 1,
          "gender": "Man",
          "count": 20,
          "soldCount": 0
        },
        {
          "id": 22,
          "categoryId": 2,
          "image": "https://images.pexels.com/photos/4156/fashion-woman-model-portrait.jpg?h=350&auto=compress&cs=tinysrgb",
          "name": "Coats Lorem Ipsum 3",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "cost": 456.99,
          "rating": 1,
          "gender": "Unisex",
          "count": 30,
          "soldCount": 0
        },
        {
          "id": 23,
          "categoryId": 2,
          "image": "https://images.pexels.com/photos/4156/fashion-woman-model-portrait.jpg?h=350&auto=compress&cs=tinysrgb",
          "name": "Coats Lorem Ipsum 4",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "cost": 672.99,
          "rating": 3,
          "gender": "Woman",
          "count": 10,
          "soldCount": 0
        },
        {
          "id": 24,
          "categoryId": 2,
          "image": "https://images.pexels.com/photos/4156/fashion-woman-model-portrait.jpg?h=350&auto=compress&cs=tinysrgb",
          "name": "Coats Lorem Ipsum 5",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "cost": 852.99,
          "rating": 4,
          "gender": "Woman",
          "count": 5,
          "soldCount": 0
        },
        {
          "id": 25,
          "categoryId": 2,
          "image": "https://images.pexels.com/photos/4156/fashion-woman-model-portrait.jpg?h=350&auto=compress&cs=tinysrgb",
          "name": "Coats Lorem Ipsum 5",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "cost": 852.99,
          "rating": 4,
          "gender": "Woman",
          "count": 5,
          "soldCount": 0
        },
        {
          "id": 26,
          "categoryId": 2,
          "image": "https://images.pexels.com/photos/4156/fashion-woman-model-portrait.jpg?h=350&auto=compress&cs=tinysrgb",
          "name": "Coats Lorem Ipsum 5",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "cost": 852.99,
          "rating": 4,
          "gender": "Woman",
          "count": 5,
          "soldCount": 0
        },
        {
          "id": 27,
          "categoryId": 2,
          "image": "https://images.pexels.com/photos/4156/fashion-woman-model-portrait.jpg?h=350&auto=compress&cs=tinysrgb",
          "name": "Coats Lorem Ipsum 5",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "cost": 852.99,
          "rating": 4,
          "gender": "Woman",
          "count": 5,
          "soldCount": 0
        },
        {
          "id": 28,
          "categoryId": 2,
          "image": "https://images.pexels.com/photos/4156/fashion-woman-model-portrait.jpg?h=350&auto=compress&cs=tinysrgb",
          "name": "Coats Lorem Ipsum 5",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          "cost": 852.99,
          "rating": 4,
          "gender": "Woman",
          "count": 5,
          "soldCount": 0
        }
      ]
    `);
  }
}
