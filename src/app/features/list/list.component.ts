import { Component, computed, inject, input, TrackByFunction } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmation-dialog',
  template: `<h2 mat-dialog-title>Delete? </h2>
  <mat-dialog-content>
    Você quer deletar o item?
  </mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button [mat-dialog-close]="false">cancelar</button>
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial>sim</button>
  </mat-dialog-actions>`,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogComponent {
  
}



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule, MatIcon, MatFormFieldModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  products: Product[] = [];
  product = input.required<Product>();

  productsService = inject(ProductsService);
  router = inject(Router);
trackByProductId: TrackByFunction<Product> | undefined;
matDialog = inject(MatDialog);
matSnackBar = inject(MatSnackBar);
productTitle = computed(() => this.product().title);
  

  ngOnInit() {
    this.productsService.getAll().subscribe((products) => {
      this.products = products;
    });
  }
  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {
    this.matDialog.open(ConfirmationDialogComponent)
    .afterClosed()
    .subscribe((result) => {
      if (result) {
      this.productsService.delete(product.id).subscribe(() => {
        this.products = this.products.filter(p => p.id !== product.id);
        this.matSnackBar.open('🛒 Item deletado', 'ok');
      });  
     } else {
      this.matSnackBar.open('🛒 Item mantido', 'ok');
     }
    
    });  
}}
