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
    initialList: [],
    selectedIndex: 0,
    frameStart: 0,
    itemsDisplayed: 4
  }

  constructor() {}

  onKeyDown(event) {

  }

  updateDropDown(event) {

    const inputTextValue = (event) ? event.target.value : this.value;

    const filteredList = this.filterCallback(inputTextValue, this.settings.initialList);

    if (event) {
      if (event.key === 'ArrowDown') {
        (this.settings.selectedIndex >= (filteredList.length - 1)) ? this.settings.selectedIndex = 0 : this.settings.selectedIndex++;
      } else if (event.key === 'ArrowUp') {
        (this.settings.selectedIndex > 0) ? this.settings.selectedIndex--
            : this.settings.selectedIndex = filteredList.length - 1;
      }
    }

    this.settings.frameStart = ((this.settings.selectedIndex - this.settings.itemsDisplayed) >= 0) ?
        this.settings.selectedIndex - this.settings.itemsDisplayed + 1 : 0;

    const displayedList = filteredList.slice(
        this.settings.frameStart,
        this.settings.itemsDisplayed + this.settings.frameStart);
    this.itemList = displayedList;

    console.log('XXXXXXX', inputTextValue, this.itemList, filteredList);
  }

    onKeyUp(event) {
      this.updateDropDown(event);
      console.log('aaaaaaaaaaaaaaa', this.value);
    }

  onChange(event) {
  }

  ngOnInit() {
    this.settings.initialList = this.itemList;
    this.updateDropDown(null);
  }

  isHighlighted(i) {
    return i === (this.settings.selectedIndex-this.settings.frameStart);
  }
}
