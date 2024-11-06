import { Component, computed, EventEmitter, Input, input, Output, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../../shared/interfaces/product.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ChangeDetectionStrategy, model, NgModule} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';


export interface Task {
 
 
  done:false

}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatCheckboxModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,  
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {

 

  readonly checked = model(false);
  readonly indeterminate = model(false);
  readonly labelPosition = model<'before' | 'after'>('after');
  readonly disabled = model(false);
  
  product = input.required<Product>();
  // @Input() product!: Product;
  // @Input({ required: true }) product!: Product;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter<void>();  
  @Output() toggle = new EventEmitter<void>();
  
  

productTitle = computed(() => this.product().title);
productAmount = computed(() => this.product().amount);


onEdit() {
  this.edit.emit();
}

onDelete() {
  this.delete.emit(); 
}

onToggle() {
  setTimeout(() => {
  this.toggle.emit(); 
}, 500); // 500ms = meio segundo
}

}

