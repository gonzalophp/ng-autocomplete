import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  @Input() itemList;
  @Input() filterCallback;
  @Input() value;
  settings = {
    selectedIndex: 0,
    frameStart: 0,
    itemsDisplayed: 4,
      filteredList: [],
      displayedList: []
  }

  constructor() {}

  onKeyDown(event) {

      if (event) {
          console.log('FFFFFFFFF', this.settings.filteredList, this.settings.selectedIndex);
          if (event.key === 'ArrowUp') {
              console.log('UP 1', this.settings.selectedIndex, this.settings.frameStart, this.settings.itemsDisplayed);
              if (this.settings.selectedIndex > 0) {
                  this.settings.selectedIndex--;
              }

              if ((this.settings.selectedIndex - this.settings.frameStart ) < 0) {
                  this.settings.frameStart = this.settings.selectedIndex;
                  this.updateDisplayedList();
              }
              console.log('UP 2', this.settings.selectedIndex, this.settings.frameStart, this.settings.itemsDisplayed);
          } else if (event.key === 'ArrowDown') {
              console.log('DOWN 1', this.settings.selectedIndex, this.settings.frameStart, this.settings.itemsDisplayed);
              if (this.settings.selectedIndex < (this.settings.filteredList.length - 1)) {
                  this.settings.selectedIndex++;
              }

              if (this.settings.selectedIndex >= (this.settings.frameStart + this.settings.itemsDisplayed)) {
                  this.settings.frameStart = this.settings.selectedIndex - this.settings.itemsDisplayed + 1;
                  this.updateDisplayedList();
              }
              console.log('DOWN 2', this.settings.selectedIndex, this.settings.frameStart, this.settings.itemsDisplayed);
          } else {
              this.settings.selectedIndex = 0;
          }
      }
  }

    onKeyUp(event) {
        if (event && ! ((event.key === 'ArrowDown') || (event.key === 'ArrowUp'))) {
            this.updateFilteredList();
            this.updateDisplayedList();
        }
    }

    updateDisplayedList() {
        this.settings.displayedList = this.settings.filteredList.slice(
            this.settings.frameStart,
            this.settings.itemsDisplayed + this.settings.frameStart);
    }

    updateFilteredList() {
      this.settings.filteredList = this.filterCallback(this.value, this.itemList);
    }

  onChange(event) {
  }

  ngOnInit() {
    this.updateFilteredList();
      this.updateDisplayedList();
  }

  isHighlighted(i) {
    return i === (this.settings.selectedIndex - this.settings.frameStart);
  }
}
