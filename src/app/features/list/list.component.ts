import { Component, input } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { AuthService } from '@auth0/auth0-angular';
import { UsersService } from '../../shared/services/user.service';



@Component({
  selector: 'app-confirmation-dialog',
  template: `<h2 mat-dialog-title>Delete?</h2>
    <mat-dialog-content> Você quer deletar o item? </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">cancelar</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>sim</button>
    </mat-dialog-actions>`,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationDialogComponent {}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardComponent,
    RouterLink,
    MatButtonModule,
    MatIcon,
    MatFormFieldModule,
    CommonModule,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  
  
  products: Product[] = [];
  product = input.required<Product>();
  userEmail: string = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private productsService: ProductsService,
    private router: Router,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    public auth: AuthService,
  ) {}

  ngOnInit() {
    this.productsService.getAllByUser('userEmail').subscribe((data) => {
      this.products = data;
    });    this.authService.user$.subscribe((user) => {
      if (user?.sub && user.email && user.name) {
        this.userEmail = user.email;
        this.usersService
          .getOrCreateUser(user.sub, user.email, user.name)
          .subscribe((dbUser) => {
            this.productsService
              .getAllByUser(dbUser['userEmail'])
              .subscribe((products: Product[]) => {
                this.products = products;
              });
          });
      }
    });
  }

  onEdit(product: Product) {
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {
    this.matDialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.productsService.delete(product.id).subscribe(() => {
            this.products = this.products.filter((p) => p.id !== product.id);
            this.matSnackBar.open('🛒 Item deletado', 'ok');
          });
        } else {
          this.matSnackBar.open('🛒 Item mantido', 'ok');
        }
      });
  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
