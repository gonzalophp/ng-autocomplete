import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.css']
})

export class AutocompleteComponent implements OnInit {

    @Input() filterCallback;
    @Input() value;

    @ViewChild('divList') divList;

    private filteredList = [];
    private selectedIndex = 0;
    private settings = {
        itemsDisplayed: 4,
        filterDelay: 1000
    };
    private valueSubject: Subject<string>;
private myStyleWidth;
    constructor() { }

    ngOnInit() {
        this.valueSubject = new Subject<string>();

        this.valueSubject
            .distinctUntilChanged()
            .debounceTime(this.settings.filterDelay).skip(1)
            .subscribe(data => this.newInputValue());
        this.valueSubject.next(this.value);
        this.valueSubject.skip(1);

        this.newInputValue();
    }

    newInputValue() {
        this.updateFilteredList();
        this.selectedIndex = 0;
    }

    onKeyDown(event) {

        if (event) {
            if (event.key === 'ArrowUp') {
                if (this.selectedIndex > 0) {
                    this.selectedIndex--;
                }
            } else if (event.key === 'ArrowDown') {
                if (this.selectedIndex < (this.filteredList.length - 1)) {
                    this.selectedIndex++;
                    // this.myStyleWidth = 500;
                    // this.divList.offsetTop = 300;
                    console.log(this.divList);
                    if (this.selectedIndex > 3) {
                        this.divList.nativeElement.scrollTop = (this.selectedIndex-3)*35;
                    }
                    
                }
            } else if (event.key === 'Enter') {
                this.itemClick(this.selectedIndex);
            }
        }
    }

    onKeyUp(event) {
        this.valueSubject.next(this.value);
    }

    updateFilteredList() {
        this.filteredList = this.filterCallback(this.value);
    }

    isHighlighted(i) {
        return i === this.selectedIndex;
    }

    itemClick(i) {
        this.value = this.filteredList[this.selectedIndex];
        this.valueSubject.next(this.value);
    }
}
