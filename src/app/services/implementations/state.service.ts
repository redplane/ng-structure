import {IStateService} from "../interfaces/state-service.interface";
import {AddStateViewModel} from "../../view-models/state/add-state.view-model";
import {StateViewModel} from "../../view-models/state/state-view.model";
import {EditStateViewModel} from "../../view-models/state/edit-state.view-model";
import {LoadStatesViewModel} from "../../view-models/state/load-states.view-model";
import {SearchResultViewModel} from "../../view-models/search-result.view-model";
import {IHttpResponse, IHttpService, IPromise} from "angular";
import {IAppSettings} from "../../interfaces/app-setting.interface";
import {DeleteStateViewModel} from "../../view-models/state/delete-state.view-model";

export class StateService implements IStateService {

    //#region Constructor

    public constructor(protected $http: IHttpService,
                       protected appSettings: IAppSettings) {

    }

    //#endregion

    //#region Methods

    public addStateAsync(model: AddStateViewModel): IPromise<StateViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/state`;
        return this.$http
            .post<StateViewModel>(fullUrl, model)
            .then((addStateResponse: IHttpResponse<StateViewModel>) => addStateResponse.data);
    }

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
            .then(_ => void(0));
    }

    public editStateAsync(stateId: string, model: EditStateViewModel): IPromise<StateViewModel> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/state/${stateId}`;
        return this.$http
            .put<StateViewModel>(fullUrl, model)
            .then((editStateResponse: IHttpResponse<StateViewModel>) => editStateResponse.data);
    }

    public loadStatesAsync(condition: LoadStatesViewModel): IPromise<SearchResultViewModel<StateViewModel>> {
        const fullUrl = `${this.appSettings.apiEndpoint}/api/state/search`;
        return this.$http
            .post<SearchResultViewModel<StateViewModel>>(fullUrl, condition)
            .then((loadStatesResponse: IHttpResponse<SearchResultViewModel<StateViewModel>>) => loadStatesResponse.data);
    }

    //#endregion

}
