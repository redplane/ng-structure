import {IController} from "angular";
import {ISidebarScope} from "./sidebar.scope";
import {UrlStatesConstant} from "../../constants/url-states.constant";
import {StateService} from "@uirouter/core";
import {INgRxMessageBusService} from "../../services/interfaces/ngrx-message-bus-service.interface";
import {MessageChannelNameConstant} from "../../constants/message-channel-name.constant";
import {MessageEventNameConstant} from "../../constants/message-event-name.constant";

export class SidebarController implements IController {

    //#region Constructor

    public constructor(protected $scope: ISidebarScope,
                       protected $state: StateService,
                       protected $messageBus: INgRxMessageBusService) {

        // Properties binding.
        this.$scope.urlStatesConstant = UrlStatesConstant;

        // Methods binding.
        this.$scope.clickChangeState = this.clickChangeState;
    }

    //#endregion

    //#region Methods


    protected clickChangeState = (stateName: string): void => {

        // Block the ui.
        this.$messageBus.addMessage(MessageChannelNameConstant.ui,
            MessageEventNameConstant.toggleFullScreenLoader, true);

        this.$state
            .go(stateName)
            .finally(() => {
                this.$messageBus.addMessage(MessageChannelNameConstant.ui, MessageEventNameConstant.toggleFullScreenLoader, false)
            })
    }

    //#endregion
}
