import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  productsService = inject(ProductsService);

  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  

  form = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  onSubmit() {
    
    this.productsService
    .post({
      title: this.form.controls.title.value,
      amount: 0,
    })
    this.matSnackBar.open('acrescentar icone / Item adicionado', 'ok', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    // pretendo utilizar na construção de outras etapas
    // .subscribe(() => {
    //     alert('sucesso!');
    //   });
    this.router.navigateByUrl('/')
    // .catch(console.log)
  }
}
