function getUserLogged() {
    var userLogged = window ? window['_userLogged'] : undefined;
    if (userLogged && typeof userLogged == 'object')
        return userLogged;
    return { id: 1, userName: 'user', currLogin: new Date(), role: 'user', email: 'user@mail.com' };
}
function getConfig() {
    var config = window ? window['_config'] : undefined;
    if (config && typeof config == 'object')
        return config;
    return {};
}
function getPage() {
    var page = window ? window['_page'] : undefined;
    if (page && typeof page == 'object')
        return page;
    return {};
}
function getLocale() {
    var u = getUserLogged();
    if (u != null && u.locale)
        return u.locale;
    return WUX.WUtil.getString(getConfig(), 'locale', '');
}
var HelloWorld = (function (_super) {
    __extends(HelloWorld, _super);
    function HelloWorld() {
        return _super.call(this, '', 'HelloWorld') || this;
    }
    HelloWorld.prototype.render = function () {
        var user = getUserLogged();
        console.log("user.userName = " + user.userName);
        var align = WUX.WUtil.getString(getPage(), 'align', 'left');
        console.log("page.align = " + align);
        var locale = getLocale();
        console.log("locale = " + locale);
        var greeting = locale == "it" ? "Ciao" : "Hello";
        return '<div class="hello" style="text-align:' + align + ';">' + greeting + ' ' + user.userName + '!</div>';
    };
    return HelloWorld;
}(WUX.WComponent));
//# sourceMappingURL=hello.js.map