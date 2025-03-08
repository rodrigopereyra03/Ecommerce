import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product, ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: any = null;
  selectedImage: string = '';
  quantity: number = 1;
  showModal: boolean = false;
  apiUrl = 'http://localhost:8080/api/product';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
   
  ) {}


  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.fetchProduct(productId);
    }
  }

  fetchProduct(productId: string): void {
    this.productService.getProductById(productId).subscribe(
      (data) => {
        this.product = data;
        this.selectedImage = data.mainImage;
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }


  handleImageClick(image: string): void {
    this.selectedImage = image;
  }

  handleQuantityChange(event: any): void {
    this.quantity = event.target.value;
  }

/*  handleAddToCart(): void {
    this.cartService.addToCart(this.product, this.quantity);
    this.showModal = true;
  }*/

  goToCart(): void {
    this.showModal = false;
    this.router.navigate(['/cart']);
  }

  goToHome(): void {
    this.showModal = false;
    this.router.navigate(['/']);
  }

} 
