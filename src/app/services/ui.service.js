module.exports = (ngModule) => {

    ngModule.service('$ui', () => {

        return {
            //#region Methods

            /*
            * Trigger windows resize function.
            * */
            reloadWindowSize: () => {
                $(window).resize();
            }

        //#endregion
    }
    });
};