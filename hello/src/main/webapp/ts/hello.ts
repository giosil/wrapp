interface User {
    id: number;
    userName: string;
    currLogin: Date;
    tokenId?: string;
    role?: string;
    email?: string;
    mobile?: string;
    locale?: string;
}

function getUserLogged(): User {
    let userLogged = window ? window['_userLogged'] : undefined;
    if (userLogged && typeof userLogged == 'object') return userLogged as User;
    return { id: 1, userName: 'user', currLogin: new Date(), role: 'user', email: 'user@mail.com' };
}

function getConfig(): any {
    let config = window ? window['_config'] : undefined;
    if (config && typeof config == 'object') return config;
    return {};
}

function getPage(): any {
    let page = window ? window['_page'] : undefined;
    if (page && typeof page == 'object') return page;
    return {};
}

function getLocale(): string {
    let u = getUserLogged();
    if(u != null && u.locale) return u.locale;
    return WUX.WUtil.getString(getConfig(), 'locale', '');
}

class HelloWorld extends WUX.WComponent {

    constructor() {
        super('', 'HelloWorld');
    }

    protected render() {
        let user = getUserLogged();

        console.log("user.userName = " + user.userName);

        let align = WUX.WUtil.getString(getPage(), 'align', 'left');

        console.log("page.align = " + align);

        let locale = getLocale();

        console.log("locale = " + locale);

        let greeting = locale == "it" ? "Ciao" : "Hello";

        return '<div class="hello" style="text-align:' + align + ';">' + greeting + ' ' + user.userName + '!</div>';
    }

}
