import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
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
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})

export class CreateComponent implements OnInit {
  productsService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  form = new FormGroup({
    id: new FormControl<number | null>(null),
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    amount: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  onSubmit() {
    if (this.form.valid) {
      this.productsService
        .post({
          title: this.form.controls['title'].value,
          amount: this.form.controls['amount'].value,
        })
        .subscribe((response) => {
          this.matSnackBar.open('🛒 Item adicionado', 'ok');
          this.router.navigateByUrl('/');
        });
    }
  }

  // refatorar

  foodAndDrinkEmojis = [
    '🍎',
    '🍏',
    '🍌',
    '🍇',
    '🍉',
    '🍓',
    '🍈',
    '🍒',
    '🍑',
    '🍍',
    '🥭',
    '🥥',
    '🥝',
    '🥦',
    '🥬',
    '🥒',
    '🌽',
    '🥕',
    '🌶️',
    '🥔',
    '🍠',
    '🥑',
    '🍆',
    '🧄',
    '🧅',
    '🍞',
    '🥖',
    '🥯',
    '🥨',
    '🧀',
    '🍗',
    '🥩',
    '🍖',
    '🍔',
    '🍟',
    '🍕',
    '🌭',
    '🍣',
    '🍱',
    '🍤',
    '🥟',
    '🍜',
    '🍲',
    '🍝',
    '🍛',
    '🥫',
    '🍿',
    '🍩',
    '🍪',
    '🧃',
    '🥤',
    '🍼',
    '🍶',
    '🍷',
    '🍺',
    '🍻',
    '🥂',
    '🍸',
    '🍹',
    '☕',
    '🫖',
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
