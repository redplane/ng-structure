import {IStateService} from "../interfaces/state-service.interface";
import {AddStateViewModel} from "../../view-models/state/add-state.view-model";
import {StateViewModel} from "../../view-models/state/state-view.model";
import {EditStateViewModel} from "../../view-models/state/edit-state.view-model";
import {LoadStatesViewModel} from "../../view-models/state/load-states.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {IHttpResponse, IHttpService, IPromise} from "angular";
import {IAppSettings} from "../../interfaces/app-setting.interface";
import {DeleteStateViewModel} from "../../view-models/state/delete-state.view-model";
import {PagerViewModel} from "../../view-models/pager.view-model";
import {ValidationValueConstant} from "../../constants/validation-value.constant";

export class StateService implements IStateService {

    //#region Constructor

    public constructor(protected $http: IHttpService,
                       protected appSettings: IAppSettings) {

    }

    //#endregion

    //#region Methods

    /*
    * Add state asynchronously.
    * */
    public addStateAsync(model: AddStateViewModel): IPromise<StateViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/state`;
        return this.$http
            .post<StateViewModel>(fullUrl, model)
            .then((addStateResponse: IHttpResponse<StateViewModel>) => addStateResponse.data);
    }

    /*
    * Delete state asynchronously.
    * */
    public deleteStateAsync(stateId: string): IPromise<void> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/state/${stateId}`;
        const model = new DeleteStateViewModel();
        model.shouldRecordHardDeleted = true;

        return this.$http
            .delete(fullUrl, {
                data: model,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(_ => void (0));
    }

    /*
    * Edit state asynchronously.
    * */
    public editStateAsync(stateId: string, model: EditStateViewModel): IPromise<StateViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/state/${stateId}`;
        return this.$http
            .put<StateViewModel>(fullUrl, model)
            .then((editStateResponse: IHttpResponse<StateViewModel>) => editStateResponse.data);
    }

    /*
    * Load state asynchronously.
    * */
    public loadStatesAsync(condition: LoadStatesViewModel): IPromise<SearchResultViewModel<StateViewModel>> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/state/search`;
        return this.$http
            .post<SearchResultViewModel<StateViewModel>>(fullUrl, condition)
            .then((loadStatesResponse: IHttpResponse<SearchResultViewModel<StateViewModel>>) => loadStatesResponse.data);
    }

    /*
    * Load all states in the system.
    * */
    public loadWholeStatesAsync(): IPromise<StateViewModel[]> {

        // Initialize pager information
        const initialPager = new PagerViewModel();
        initialPager.page = 1;
        initialPager.records = ValidationValueConstant.maxSupportedSearchRecords;

        // Initialize initial condition.
        const initialCondition = new LoadStatesViewModel();
        initialCondition.pager = initialPager;

        return this.loadStatesAsync(initialCondition)
            .then((loadStatesResult: SearchResultViewModel<StateViewModel>) => {

                // No next result is found.
                if (!loadStatesResult.pager.hasNext) {
                    return loadStatesResult.items;
                }

                // Get total records.
                const totalRecords = loadStatesResult.pager.totalRecords;

                // Calculate download batches.
                let pages = Math.floor(totalRecords / ValidationValueConstant.maxSupportedSearchRecords);
                const remainder = totalRecords % ValidationValueConstant.maxSupportedSearchRecords;

                if (remainder > 0) {
                    pages++;
                }

                // List of promises to be completed.
                const loadStatesTasks = [];
                let states = loadStatesResult.items;

                for (let page = 2; page < pages + 2; page++) {
                    const pager = {...initialPager};
                    const condition = {...initialCondition};
                    pager.page = page;
                    condition.pager = pager;

                    const loadStatesTask = this.loadStatesAsync(condition)
                        .then(loadStatesResult => loadStatesResult.items);
                    loadStatesTasks.push(loadStatesTask);
                }

                return Promise.all(loadStatesTasks)
                    .then((loadedStatesList: Array<StateViewModel[]>) => {
                        for (const loadedStates of loadedStatesList) {
                            states.concat(loadedStates);
                        }

                        return states;
                    })
            });
    }

    //#endregion

}
