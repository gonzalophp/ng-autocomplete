import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  @Input() itemList;
  @Input() filterCallback;
  @Input() value;
  private frameStart = 0;
  private filteredList = [];
  private displayedList = [];
  private selectedIndex = 0;
  private settings = {
    itemsDisplayed: 4,
    filterDelay: 1000
  };
  private valueBehaviourSubject: BehaviorSubject<string>;

  constructor() {}

  ngOnInit() {
    this.valueBehaviourSubject = new BehaviorSubject<string>(this.value);

    this.valueBehaviourSubject
      .distinctUntilChanged()
      .debounceTime(this.settings.filterDelay).skip(1)
      .subscribe(data => this.newInputValue());

    this.newInputValue();
  }

  newInputValue() {
      console.log('ddddd');
    this.updateFilteredList();
    this.selectedIndex = 0;
    this.frameStart = 0;
    this.updateDisplayedList();
  }

  onKeyDown(event) {

      if (event) {
          if (event.key === 'ArrowUp') {
              console.log('UP 1', this.selectedIndex, this.frameStart, this.settings.itemsDisplayed);
              if (this.selectedIndex > 0) {
                  this.selectedIndex--;
              }

              if ((this.selectedIndex - this.frameStart ) < 0) {
                  this.frameStart = this.selectedIndex;
                  this.updateDisplayedList();
              }
              console.log('UP 2', this.selectedIndex, this.frameStart, this.settings.itemsDisplayed);
          } else if (event.key === 'ArrowDown') {
              console.log('DOWN 1', this.selectedIndex, this.frameStart, this.settings.itemsDisplayed);
              if (this.selectedIndex < (this.filteredList.length - 1)) {
                  this.selectedIndex++;
              }

              if ((this.selectedIndex - this.frameStart) > this.settings.itemsDisplayed - 1) {
                  this.frameStart = this.selectedIndex - this.settings.itemsDisplayed + 1;
                  this.updateDisplayedList();
              }
              console.log('DOWN 2', this.selectedIndex, this.frameStart, this.settings.itemsDisplayed);
          }
      }
  }

    onKeyUp(event) {
        this.valueBehaviourSubject.next(this.value);
    }

    updateDisplayedList() {
        this.displayedList = this.filteredList.slice(
            this.frameStart,
            this.settings.itemsDisplayed + this.frameStart);
    }

    updateFilteredList() {
      this.filteredList = this.filterCallback(this.value, this.itemList);
    }

  onChange(event) {}

  isHighlighted(i) {
    return i === (this.selectedIndex - this.frameStart);
  }
}
