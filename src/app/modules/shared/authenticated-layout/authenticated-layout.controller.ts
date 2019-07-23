import {IController} from "angular";
import {IAuthenticatedLayoutScope} from "./authenticated-layout.scope";
import {UrlStatesConstant} from "../../../constants/url-states.constant";
import {StateService} from "@uirouter/core";
import {ProfileViewModel} from "../../../view-models/user/profile.view-model";
import {INgRxMessageBusService} from "../../../services/interfaces/ngrx-message-bus-service.interface";
import {Subscription} from "rxjs";
import {filter, switchMap} from "rxjs/operators";
import {MessageChannelNameConstant} from "../../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../../constants/message-event-name.constant";

/* @ngInject */
export class AuthenticatedLayoutController implements IController {

    //#region Properties

    protected _hookLoaderSubscription: Subscription;

    //#endregion

    //#region Constructor

    public constructor(protected $scope: IAuthenticatedLayoutScope,
                       protected $state: StateService,
                       protected $messageBus: INgRxMessageBusService,
                       protected profile: ProfileViewModel) {

        // Properties binding.
        this.$scope.profile = profile;
        this.$scope.hasLoaderDisplayed = false;

        // Methods binding.
        this.$scope.ngOnSignOutClicked = this.ngOnSignOutClicked;


    }

    //#endregion

    //#region Methods

    /*
    * Called when sign out is clicked.
    * */
    public ngOnSignOutClicked = (): void => {
        this.$state.go(UrlStatesConstant.loginModuleName);
    };

    public $onDestroy(): void {

        if (this._hookLoaderSubscription && !this._hookLoaderSubscription.closed) {
            this._hookLoaderSubscription.unsubscribe();
        }
    }

    public $onInit(): void {

        if (this._hookLoaderSubscription && !this._hookLoaderSubscription.closed) {
            this._hookLoaderSubscription.unsubscribe();
        }

        this._hookLoaderSubscription = this.$messageBus
            .channelAddedEvent
            .pipe(
                filter((model: {channelName: string, eventName: string}) => {
                    return model.channelName === MessageChannelNameConstant.ui && model.eventName === MessageEventNameConstant.toggleFullScreenLoader;
                }),
                switchMap((model: {channelName: string, eventName: string}) => {
                    return this.$messageBus
                        .hookMessageChannel(model.channelName, model.eventName, false);
                })
            )
            .subscribe((status: boolean) => {
                this.$scope.hasLoaderDisplayed = status;
                this.$scope.$applyAsync();
            })
    }

    //#endregion
}
