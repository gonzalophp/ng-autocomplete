import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

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
  settings = {
    itemsDisplayed: 4
  };
  private valueObservable: Subject<string>;

  constructor() {
      this.valueObservable = new Subject<string>();
  }

  ngOnInit() {

      this.valueObservable.distinctUntilChanged()
      .subscribe(data => this.newInputValue());
      this.valueObservable.next(this.value);
  }

  newInputValue() {
      this.updateFilteredList();
    this.updateDisplayedList();
    this.selectedIndex = 0;
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
        this.valueObservable.next(this.value);
        // if (event && ! ((event.key === 'ArrowDown') || (event.key === 'ArrowUp'))) {
        //     this.updateFilteredList();
        //     this.updateDisplayedList();
        //     this.selectedIndex = 0;
        // }
    }

    updateDisplayedList() {
        this.displayedList = this.filteredList.slice(
            this.frameStart,
            this.settings.itemsDisplayed + this.frameStart);
    }

    updateFilteredList() {
      this.filteredList = this.filterCallback(this.value, this.itemList);
    }

  onChange(event) {
      
  }

  isHighlighted(i) {
    return i === (this.selectedIndex - this.frameStart);
  }
}
