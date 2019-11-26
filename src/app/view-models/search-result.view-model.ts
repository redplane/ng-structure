import {PagerResultViewModel} from "./pager-result.view-model";

export class SearchResultViewModel<T> {

    public items: T[];

    public pager: PagerResultViewModel;

    public constructor(items?: T[], pager?: PagerResultViewModel) {
        this.items = items;
        this.pager = pager;
    }
}
