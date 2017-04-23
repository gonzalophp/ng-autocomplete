import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ng-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  @Input() itemList;
  @Input() filterCallback;
  @Input() value;
  settings = {
    initialList: [],
    selectedIndex: 0,
    itemsDisplayed:4
  }

  constructor() {}

  onKeyDown(event) {
    if (event.key === 'ArrowDown') {
        (this.settings.selectedIndex >= (this.settings.itemsDisplayed-1)) ? this.settings.selectedIndex=0 : this.settings.selectedIndex++;
    } else if (event.key === 'ArrowUp') {
        (this.settings.selectedIndex > 0) ? this.settings.selectedIndex-- : this.settings.selectedIndex=this.settings.itemsDisplayed-1;
    }
    console.log(event);
  }

    onKeyUp(event) {
        let filteredList = this.filterCallback(event.target.value, this.settings.initialList);
        let displayedList = filteredList.slice(
            0,
            this.settings.itemsDisplayed);
        this.itemList = displayedList;
    }

  onChange(event) {
  }

  ngOnInit() {
    this.settings.initialList = this.itemList;
      this.itemList = this.settings.initialList.slice(
          0,
          this.settings.itemsDisplayed);
  }

  isHighlighted(i) {
    return i === this.settings.selectedIndex;
  }
}
