import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { MESSAGES, RATING_NUMBER, ROLE, ROUTING_PATH_PARAMS } from '../../../constants';
import { ProductService, ModalService, RoutingService, UserService, CategoriesService } from '../../../services';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  @Input() isAdmin: boolean;
  @Input() id: string;
  @Input() item;

  @Output() loginName: string;

  public maxRatingRange = new Array(RATING_NUMBER.FIVE);
  public login: string;
  public categoryName: string;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private modalService: ModalService,
              private routingService: RoutingService,
              private userService: UserService,
              private categoriesService: CategoriesService,
              private cd: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params[ROUTING_PATH_PARAMS.ID];

    const categories$ = this.categoriesService.getCategories();
    const currentProduct$ = this.productService.getProductById(this.id);
    const roles$ = this.userService.getRoles();
    const currentUser$ = this.userService.getUserByLogin();

    forkJoin([categories$, currentProduct$, roles$, currentUser$]).subscribe(
      data => {
        // data[0] is categories
        // data[1] is currentProduct
        // data[2] is roles
        // data[3] is currentUser
        this.productService.categories = data[0];
        this.item = data[1];
        this.userService.adminRole = Array.isArray(data[0]) ?
          data[2].find(role => role.name === ROLE.ADMIN) : null;

        this.userService.currentUser = data[3];
        this.login = this.userService.currentUser.login;

        if (this.userService.adminRole.id === this.userService.currentUser.roleId) {
          this.isAdmin = true;
        }

        const category = this.productService.categories.find(c => c.id === this.item.categoryId);
        this.categoryName = category ? category.name : null;
      });

    this.cd.detectChanges();
  }

  public showModal(): void {
    this.productService.buyProducts(this.item, this.item.count)
      .pipe(finalize(() => {
        this.modalService.openModal({message: MESSAGES.YOU_BOUGHT + this.item.name});
      }))
      .subscribe(
        res => {
          this.item = res;
        });
  }

  public goToEditProductsPage(): void {
    this.routingService.goToEditProductPage(this.id);
  }

  public goToMainPage(): void {
    this.routingService.goToMainPage();
  }
}
