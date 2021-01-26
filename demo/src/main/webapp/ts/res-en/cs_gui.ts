WUX.RES.OK = 'OK';
WUX.RES.CLOSE = 'Close';
WUX.RES.CANCEL = 'Cancel';
WUX.RES.ERR_DATE = 'Invalid date.';
WUX.RES.FILE_NAME = 'File';
WUX.RES.FILE_SIZE = 'Size';
WUX.RES.FILE_TYPE = 'Type';
WUX.RES.FILE_LMOD = 'Last.Mod.';

namespace GUI {
	import WIcon = WUX.WIcon;

	export class TXT {
		// Captions
		static readonly OK = 'OK';
		static readonly CLOSE = 'Close';
		static readonly NEW = 'New';
		static readonly OPEN = 'Modify';
		static readonly DELETE = 'Delete';
		static readonly SAVE = 'Save';
		static readonly SEND = 'Send';
		static readonly SEND_EMAIL = 'Email';
		static readonly FIND = 'Find';
		static readonly FORCE = 'Force';
		static readonly SEARCH = 'Search';
		static readonly CANCEL = 'Cancel';
		static readonly RESET = 'Reset';
		static readonly PRINT = 'Print';
		static readonly PRINT_ALL = 'Print All';
		static readonly PREVIEW = 'Preview';
		static readonly EXPORT = 'Export';
		static readonly IMPORT = 'Import';
		static readonly HELP = 'Help';
		static readonly VIEW = 'View';
		static readonly ENABLE = 'Enable';
		static readonly DISABLE = 'Disable';
		static readonly ADD = 'Add';
		static readonly APPLY = 'Apply';
		static readonly REMOVE = 'Remove';
		static readonly REMOVE_ALL = 'Rem.All';
		static readonly REFRESH = 'Refresh';
		static readonly UNDO = 'Undo';
		static readonly SETTINGS = 'Settings';
		static readonly COPY = 'Copy';
		static readonly CUT = 'Cut';
		static readonly PASTE = 'Paste';
		static readonly CONFIRM = 'Confirm';
		static readonly FORWARD = 'Forward';
		static readonly BACKWARD = 'Backward';
		static readonly NEXT = 'Next';
		static readonly PREVIOUS = 'Previous';
		static readonly SELECT = 'Select';
		static readonly SELECT_ALL = 'Sel.All';
		static readonly WORK = 'Work';
		static readonly AGGREGATE = 'Aggregate';
		static readonly SET = 'Set';
		static readonly DEFAULT = 'Default';
		static readonly REWORK = 'Rework';
		static readonly PUSH = 'Push';
		static readonly SUSPEND = 'Suspend';
		static readonly RESUME = 'Resume';
		// Entities
		static readonly CODE = 'Code';
		static readonly DESCRIPTION = 'Description';
		static readonly GROUP = 'Group';
		static readonly ROLE = 'Role';
		static readonly TYPE = 'Type';
		// APP
		static readonly HELLO = 'Hello';
	}

	export class MSG {
		static readonly CONF_DELETE = 'Do you want to delete the selected item?';
		static readonly CONF_DISABLE = 'Do you want to disable the selected item?';
		static readonly CONF_ENABLE = 'Do you want to enable the selected item?';
		static readonly CONF_CANCEL = 'Do you want to undo the changes?';
		static readonly CONF_PROCEED = 'Do you want to proceed with the operation?';
		static readonly CONF_OVERWRITE = 'Do you want to proceed with the overwrite?';

		static readonly MSG_COMPLETED = 'Operation completed successfully.';
		static readonly MSG_ERRORS = 'Error during processing.';
	}

	export class ICO {
		// base
		static readonly TRUE = WIcon.CHECK_SQUARE_O;
		static readonly FALSE = WIcon.SQUARE_O;
		static readonly CLOSE = WIcon.TIMES;
		static readonly OK = WIcon.CHECK;
		static readonly CALENDAR = WIcon.CALENDAR;
		// common form tools
		static readonly AGGREGATE = WIcon.CHAIN;
		static readonly NEW = WIcon.PLUS_SQUARE_O;
		static readonly EDIT = WIcon.EDIT;
		static readonly OPEN = WIcon.EDIT;
		static readonly DELETE = WIcon.TRASH;
		static readonly DETAIL = WIcon.FILE_TEXT_O;
		static readonly SAVE = WIcon.CHECK;
		static readonly FIND = WIcon.SEARCH;
		static readonly FIND_DIFF = WIcon.SEARCH_MINUS;
		static readonly FIND_PLUS = WIcon.SEARCH_PLUS;
		static readonly FORCE = WIcon.CHECK_CIRCLE;
		static readonly FORCE_ALL = WIcon.CHECK_CIRCLE_O;
		static readonly SEARCH = WIcon.SEARCH;
		static readonly CANCEL = WIcon.UNDO;
		static readonly RESET = WIcon.TIMES_CIRCLE;
		static readonly PRINT = WIcon.PRINT;
		static readonly PREVIEW = WIcon.SEARCH_PLUS;
		static readonly EXPORT = WIcon.SHARE_SQUARE_O;
		static readonly IMPORT = WIcon.SIGN_IN;
		static readonly FILE = WIcon.FILE_O;
		static readonly HELP = WIcon.QUESTION_CIRCLE;
		static readonly VIEW = WIcon.FILE_TEXT_O;
		static readonly ENABLE = WIcon.THUMBS_O_UP;
		static readonly DISABLE = WIcon.THUMBS_O_DOWN;
		static readonly ADD = WIcon.PLUS;
		static readonly APPLY = WIcon.CHECK;
		static readonly REMOVE = WIcon.MINUS;
		static readonly REFRESH = WIcon.REFRESH;
		static readonly UNDO = WIcon.UNDO;
		static readonly SETTINGS = WIcon.COG;
		static readonly OPTIONS = WIcon.CHECK_SQUARE;
		static readonly PASSWORD = WIcon.UNDO;
		static readonly COPY = WIcon.COPY;
		static readonly CUT = WIcon.CUT;
		static readonly PASTE = WIcon.PASTE;
		static readonly FORWARD = WIcon.ANGLE_DOUBLE_RIGHT;
		static readonly BACKWARD = WIcon.ANGLE_DOUBLE_LEFT;
		static readonly NEXT = WIcon.FORWARD;
		static readonly PREVIOUS = WIcon.BACKWARD;
		static readonly CONFIRM = WIcon.CHECK;
		static readonly FILTER = WIcon.FILTER;
		static readonly SEND = WIcon.SEND;
		static readonly SEND_EMAIL = WIcon.ENVELOPE_O;
		static readonly WAIT = WIcon.COG;
		static readonly WORK = WIcon.COG;
		static readonly CONFIG = WIcon.COG;
		static readonly LEFT = WIcon.ARROW_CIRCLE_LEFT;
		static readonly RIGHT = WIcon.ARROW_CIRCLE_RIGHT;
		static readonly SELECT_ALL = WIcon.TH_LIST;
		static readonly REWORK = WIcon.REFRESH;
		static readonly PUSH = WIcon.TRUCK;
		static readonly AHEAD = WIcon.ANGLE_DOUBLE_RIGHT;
		static readonly SUSPEND = WIcon.TOGGLE_OFF;
		static readonly RESUME = WIcon.RECYCLE;
		static readonly PAIRING = WIcon.RANDOM;
		static readonly CHECK = WIcon.CHECK_SQUARE_O;
		// common entities
		static readonly EVENT = WIcon.BOLT;
		static readonly MESSAGE = WIcon.ENVELOPE_O;
		static readonly USER = WIcon.USER_O;
		static readonly GROUP = WIcon.USERS;
		static readonly TOOL = WIcon.WRENCH;
		static readonly DEMOGRAPHIC = WIcon.ADDRESS_CARD;
		static readonly DOCUMENT = WIcon.FILE_TEXT_O;
		static readonly LINKS = WIcon.CHAIN;
		// messages
		static readonly WARNING = WIcon.WARNING;
		static readonly INFO = WIcon.INFO_CIRCLE;
		static readonly CRITICAL = WIcon.TIMES_CIRCLE;
	}

	export function formatMonth(m: number, e?: boolean, y?: any): string {
		if (m > 100) {
			// YYYYMM
			y = Math.floor(m / 100);
			m = m % 100;
		}
		y = y ? ' ' + y : '';
		switch (m) {
			case 1: return e ? 'January' + y : 'Jan' + y;
			case 2: return e ? 'February' + y : 'Feb' + y;
			case 3: return e ? 'March' + y : 'Mar' + y;
			case 4: return e ? 'April' + y : 'Apr' + y;
			case 5: return e ? 'May' + y : 'May' + y;
			case 6: return e ? 'June' + y : 'Jun' + y;
			case 7: return e ? 'July' + y : 'Jul' + y;
			case 8: return e ? 'August' + y : 'Aug' + y;
			case 9: return e ? 'September' + y : 'Sep' + y;
			case 10: return e ? 'October' + y : 'Oct' + y;
			case 11: return e ? 'November' + y : 'Nov' + y;
			case 12: return e ? 'December' + y : 'Dec' + y;
		}
		return '';
	}
}