module.exports = function(ngModule){
    ngModule.service('validationService', function(moment){

        //#region Methods

        /*
        * Check whether datetime is valid or not.
        * */
        this.bIsValidDateTime = function (szDate) {
            if (!szDate)
                return false;
            console.log(szDate);

            return moment(szDate).isValid();
        };

        //#endregion
    });
};