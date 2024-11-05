import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  productsService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  
  product: Product = inject(ActivatedRoute).snapshot.data['product'];

  form = new FormGroup({
    id: new FormControl<number | null>(null),
    title: new FormControl<string>(this.product.title, {
      nonNullable: true,
      validators: Validators.required,
    }),
    amount: new FormControl<number>(this.product.amount, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  onSubmit() {
    if (this.form.valid) {
      this.productsService
        .put(this.product.id, {
          title: this.form.controls['title'].value,
          amount: this.form.controls['amount'].value,

          done: false,
          userEmail: this.product.userEmail
        })
        .subscribe(() => {
          this.matSnackBar.open('🛒 Item editado com sucesso!', 'ok');
          this.router.navigateByUrl('/');
        });
    }
  }

  // refatorar

  foodAndDrinkEmojis = [
    "🍎", "🍏", "🍌", "🍇", "🍉", "🍓", "🍈", "🍒", "🍑", "🍍", "🥭", "🥥", "🥝", "🥦", "🥬", "🥒", "🌽", "🥕", "🌶️", "🥔", "🍠", "🥑", "🍆", "🧄", "🧅", "🍞", "🥖", "🥯", "🥨", "🧀", "🍗", "🥩", "🍖", "🍔", "🍟", "🍕", "🌭", "🍣", "🍱", "🍤", "🥟", "🍜", "🍲", "🍝", "🍛", "🥫", "🍿", "🍩", "🍪", "🧃", "🥤", "🍼", "🍶", "🍷", "🍺", "🍻", "🥂", "🍸", "🍹", "☕", "🫖"
  ];
  emoji: string = '';

  ngOnInit() {
    this.setRandomEmoji();
  }

  setRandomEmoji(): void {
    const emojis = this.foodAndDrinkEmojis;
    const randomIndex = Math.floor(Math.random() * emojis.length);
    this.emoji = emojis[randomIndex];
  }
}
