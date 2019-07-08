import {PagerResultViewModel} from "./pager-result.view-model";

export class SearchResultViewModel<T> {

    public items: T[];

    public pager: PagerResultViewModel;
    
}
