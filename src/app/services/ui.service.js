module.exports = function(ngModule){

    ngModule.service('uiService', function(){

        //#region Methods

        /*
        * Trigger windows resize function.
        * */
        this.reloadWindowSize = function(){
            $(window).resize();
        };

        //#endregion
    });
};