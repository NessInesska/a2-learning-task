import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MESSAGES, ROUTING_PATHES, NUMBER} from '../../../constants';
import {
  ProductService,
  ModalService,
  RoutingService,
} from '../../../services';

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

  @ViewChild('buyButton') public buyButton: ElementRef;

  public maxRatingRange = new Array(NUMBER.FIVE);
  public login: string;
  public categoryName: string;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private modalService: ModalService,
              private routingService: RoutingService,
              private cd: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.id = this.route.snapshot.params[ROUTING_PATHES.ID];
    this.cd.detectChanges();
  }

  public showModal(): void {
    this.productService.buyProducts(this.item.id, this.item.count, this.item.soldCount)
      .subscribe(
        res => this.item = res,
        () => {},
        () => this.modalService.openModal({message: MESSAGES.YOU_BOUGHT + this.item.name})
      );
  }

  public goToEditProductsPage(): void {
    this.routingService.goToEditProductPage(this.id);
  }

  public goToMainPage(): void {
    this.routingService.goToMainPage();
  }
}
