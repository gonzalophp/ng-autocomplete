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
    frameStart: 0,
    itemsDisplayed: 4
  }

  constructor() {}

  onKeyDown(event) {
    let filteredList = this.filterCallback(event.target.value, this.settings.initialList);

    if (event.key === 'ArrowDown') {
        (this.settings.selectedIndex >= (filteredList.length-1)) ? this.settings.selectedIndex=0 : this.settings.selectedIndex++;
    } else if (event.key === 'ArrowUp') {
        (this.settings.selectedIndex > 0) ? this.settings.selectedIndex-- : this.settings.selectedIndex=filteredList.length-1;
    }

    this.settings.frameStart = ((this.settings.selectedIndex-this.settings.itemsDisplayed) >= 0) ? this.settings.selectedIndex-this.settings.itemsDisplayed+1 : 0;

    let displayedList = filteredList.slice(
        this.settings.frameStart,
        this.settings.itemsDisplayed+this.settings.frameStart);
    this.itemList = displayedList;
    console.log(event);
  }

    onKeyUp(event) {

        console.log('ddddddddd',this.settings.selectedIndex,this.settings.frameStart);
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
    return i === (this.settings.selectedIndex-this.settings.frameStart);
  }
}
