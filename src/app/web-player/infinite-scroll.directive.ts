import {Input, ElementRef, Directive, Output, EventEmitter} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {InfiniteScroll} from '../../common/core/ui/infinite-scroll/infinite.scroll';

@Directive({
    selector: '[infinite-scroll]'
})
export class InfiniteScrollDirective extends InfiniteScroll {
    @Input() infiniteScrollEnabled = false;
    @Output() onInfiniteScroll = new EventEmitter();

    constructor(protected el: ElementRef) {
        super();
    }

    ngOnInit() {
        fromEvent(this.getScrollContainer(), 'scroll', {capture: true})
            .pipe(debounceTime(20))
            .subscribe((e: Event) => this.onScroll(e.target as HTMLElement));
    }

    protected canLoadMore() {
        return this.infiniteScrollEnabled;
    }

    protected isLoading() {
        return false;
    }

    protected loadMoreItems() {
        this.onInfiniteScroll.emit();
    }
}
