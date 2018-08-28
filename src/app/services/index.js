module.exports = (ngModule) => {
    const {UiService} = require("./ui.service");
    ngModule.service('$ui', UiService);
};