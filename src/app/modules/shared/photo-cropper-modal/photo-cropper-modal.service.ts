import {IPromise, IQService} from "angular";
import Cropper from 'cropperjs/dist/cropper.esm.js';
const uuid = require('uuid/v1');

export class PhotoCropperModalService {

    //#region Constructor

    public constructor(protected $uibModal: ng.ui.bootstrap.IModalService,
                       protected $q: IQService) {

    }

    //#endregion

    //#region Methods

    public displayPhotoCropperModalAsync(defaultImage: string,
                                         options: Cropper.Options): IPromise<Blob> {
        // Load controller.
        const loadControllerPromise = import('./photo-cropper-modal.controller')
            .then(m => m.PhotoCropperModalController);

        return this.$q
            .all([loadControllerPromise])
            .then((loadedResults: any[]) => {

                const modalId = uuid().replace(/-/gi, '');

                const modalInstance = this.$uibModal
                    .open({
                        template: require('./photo-cropper-modal.html'),
                        controller: loadedResults[0],
                        backdrop: 'static',
                        resolve: {
                            defaultImage: () => defaultImage,
                            modalId: () => modalId,
                            modalOptions: () => options
                        }
                    });

                return <IPromise<Blob>> modalInstance.result;
            });


    }

    //#endregion
}
