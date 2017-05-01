import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.css']
})

export class AutocompleteComponent implements OnInit {

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
    private valueSubject: Subject<string>;

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
        this.frameStart = 0;
        this.updateDisplayedList();
    }

    onKeyDown(event) {

        if (event) {
            if (event.key === 'ArrowUp') {
                if (this.selectedIndex > 0) {
                    this.selectedIndex--;
                }

                if ((this.selectedIndex - this.frameStart) < 0) {
                    this.frameStart = this.selectedIndex;
                    this.updateDisplayedList();
                }
            } else if (event.key === 'ArrowDown') {
                if (this.selectedIndex < (this.filteredList.length - 1)) {
                    this.selectedIndex++;
                }

                if ((this.selectedIndex - this.frameStart) > this.settings.itemsDisplayed - 1) {
                    this.frameStart = this.selectedIndex - this.settings.itemsDisplayed + 1;
                    this.updateDisplayedList();
                }
            } else if (event.key === 'Enter') {
                this.itemClick(this.selectedIndex);
            }
        }
    }

    onKeyUp(event) {
        this.valueSubject.next(this.value);
    }

    updateDisplayedList() {
        this.displayedList = this.filteredList.slice(
            this.frameStart,
            this.settings.itemsDisplayed + this.frameStart);
    }

    updateFilteredList() {
        this.filteredList = this.filterCallback(this.value);
    }

    isHighlighted(i) {
        return i === (this.selectedIndex - this.frameStart);
    }

    itemClick(i) {
        this.selectedIndex = this.frameStart + i;
        this.value = this.filteredList[this.selectedIndex];
        this.valueSubject.next(this.value);
    }
}
