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
		return { id: 1, userName: 'user', currLogin: new Date(), role: 'user', email: 'user@mail.com', tokenId: 'devtkn'};
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
	
	export class AppTableActions extends WUX.WComponent {
		left: WUX.WContainer;
		right: WUX.WContainer;
		
		constructor(id: string) {
			super(id, 'AppTableActions', null, 'table-actions-wrapper');
			this.left = new WUX.WContainer(this.subId('l'), 'left-actions');
			this.right = new WUX.WContainer(this.subId('r'), 'right-actions');
		}
		
		protected componentDidMount(): void {
			let $i = $('<div class="table-actions clearfix" data-b2x-sticky-element="1" data-b2x-sticky-element-z-index="3"></div>');
			this.root.append($i);
			this.left.mount($i);
			this.right.mount($i);
		}
	}
	
	export class SYM_E {
		static ID = '_id';
		static CODE = 'code';
		static DESC = 'desc';
		static TYPE = 'type';
		static FARE = 'fare';
		static TYPE_DESC = 'typeDesc';
		static AGRE = 'agre';
	}
	
}

WUX.global.locale = GUI.getLocale();

var jrpc = new JRPC("/dossier/rpc");
jrpc.setToken(GUI.getUserLogged().tokenId);
