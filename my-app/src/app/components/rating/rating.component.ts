import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  countOfStars: number = 5;
  hoveredStarIndex: number = -1;
  showTooltipStarIndex: number;
  @Input() disabled: boolean = false;
  @Input() rating: number;
  @Output() ratingChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  starMouseEnter(index: number): void {
    if (this.disabled) return;
    this.hoveredStarIndex = index;
    this.showTooltipStarIndex = index;
    this.isStarFilled(index);
  }

  starMouseLeave(): void {
    this.hoveredStarIndex = -1;
    this.showTooltipStarIndex = undefined;
  }

  isStarFilled(index: number): boolean {
    return index < this.rating || index <= this.hoveredStarIndex;
  }

  getStarRatingName(index: number): string {
    switch (index) {
      case 0: return 'Неудовлeтворительно';
      case 1: return 'Ниже среднего';
      case 2: return 'Удовлeтворительно';
      case 3: return 'Хорошо';
      case 4: return 'Отлично';
      default:
        break;
    }
  }

  showTooltip(index: number): boolean {
    if (this.disabled) return;
    return this.showTooltipStarIndex === index;
  }

  emitRating(index: number): void {
    if (this.disabled) return;
    this.ratingChange.emit(index + 1);
  }

}
