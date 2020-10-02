namespace GUI {
    
    export interface User {
        id: number;
        userName: string;
        currLogin: Date;
        tokenId?: string;
        role?: string;
        email?: string;
        mobile?: string;
        locale?: string;
    }

    export function getUserLogged(): User {
        let userLogged = window ? window['_userLogged'] : undefined;
        if (userLogged && typeof userLogged == 'object') return userLogged as User;
        return { id: 1, userName: 'user', currLogin: new Date(), role: 'user', email: 'user@mail.com' };
    }

    export function getConfig(): any {
        let config = window ? window['_config'] : undefined;
        if (config && typeof config == 'object') return config;
        return {};
    }

    export function getPage(): any {
        let page = window ? window['_page'] : undefined;
        if (page && typeof page == 'object') return page;
        return {};
    }

    export function getLocale(): string {
        let u = getUserLogged();
        if(u != null && u.locale) return u.locale;
        return WUX.WUtil.getString(getConfig(), 'locale', '');
    }

    export class HelloWorld extends WUX.WComponent {
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

            return '<div class="hello" style="text-align:' + align + ';">' + GUI.TXT.HELLO + ' ' + user.userName + '!</div>';
        }
    }
    
}

WUX.global.locale = GUI.getLocale();

