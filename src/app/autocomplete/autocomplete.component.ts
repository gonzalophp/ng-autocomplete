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
  searchText = '';
  initialList = [];
  selectedIndex = 0;

  constructor() {}

  onKeyDown(event) {
  }

  onKeyUp(event) {
    this.value = event;
    console.log('ON KEY UP',this.value,'c',event);
    this.itemList = this.filterCallback(this.value, this.initialList);
  }

  onChange(event) {
    console.log('ON CHANGE','c',this.value);
  }

  ngOnInit() {
    this.initialList = this.itemList;
  }

  isHighlighted(i) {
    return i === this.selectedIndex;
  }
}
