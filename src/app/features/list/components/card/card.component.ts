import { Component, computed, EventEmitter, Input, input, Output, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  product = input.required<Product>();
  // @Input() product!: Product;
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
  this.toggle.emit(); 
}

}

