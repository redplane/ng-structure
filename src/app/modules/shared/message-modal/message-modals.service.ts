import {IMessageModalsService} from "./message-modals-service.interface";
import {IBasicMessageModalOptions} from "./basic-message-modal-option.interface";
import {IPromise, IQService} from "angular";
import {IModalService} from "angular-ui-bootstrap";

export class MessageModalsService implements IMessageModalsService {

    //#region Constructor

    public constructor(protected $uibModal: IModalService,
                       protected $q: IQService) {

    }

    //#endregion

    //#region Methods

    public displayBasicModalAsync<T>(options: IBasicMessageModalOptions): IPromise<T> {

        const loadModalTemplatePromise = this
            .$q(resolve => {
                require.ensure([], () => resolve(require('./message-modal.html')));
            });

        const loadModalControllerPromise = import('./message-modal.controller')
            .then(m => m.MessageModalController);

        return this.$q
            .all([loadModalTemplatePromise, loadModalControllerPromise])
            .then((loadedItems: any[]) => {
                const modalInstance = this.$uibModal
                    .open({
                        template: loadedItems[0],
                        controller: loadedItems[1],
                        resolve: {
                            initialModalOptions: options
                        }
                    });

                return modalInstance.result;
            })
            .then(data => <T>data);
    }

    //#endregion

}