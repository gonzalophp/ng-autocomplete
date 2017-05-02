import { Component, Input, OnInit, ViewChild, ViewChildren, ContentChildren, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.css']
})

export class AutocompleteComponent implements OnInit {

    @Input() filterCallback;
    @Input() value;
    @Input() maxItemsDisplayed;

    @ViewChild('divList') divList;

    private filteredList = [];
    private selectedIndex = 0;
    private settings = {
        itemsDisplayed: 4,
        filterDelay: 1000
    };
    private valueSubject: Subject<string>;

    private metadata = {
        itemHeight: 0
    }

    constructor() {}

    ngAfterViewInit() {
        this.metadata.itemHeight = parseInt(window.getComputedStyle(this.divList.nativeElement.querySelector('li')).height, 10);
        this.divList.nativeElement.style.height = (this.metadata.itemHeight * this.settings.itemsDisplayed) + 'px';
    }

    ngOnInit() {
        this.settings.itemsDisplayed = this.maxItemsDisplayed;

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
                if (this.selectedIndex < (this.divList.nativeElement.scrollTop / this.metadata.itemHeight)) {
                    this.divList.nativeElement.scrollTop = (this.selectedIndex) * this.metadata.itemHeight;
                }
            } else if (event.key === 'ArrowDown') {
                if (this.selectedIndex < (this.filteredList.length - 1)) {
                    this.selectedIndex++;
                    if (this.selectedIndex >= this.maxItemsDisplayed) {
                        this.divList.nativeElement.scrollTop = (this.selectedIndex - this.maxItemsDisplayed + 1) * this.metadata.itemHeight;
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
