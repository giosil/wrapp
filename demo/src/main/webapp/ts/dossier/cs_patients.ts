namespace GUI {
	import WUtil = WUX.WUtil;

	export class SYM_P {
		static ID = '_id';
		static CODE = 'code';
		static FAMILY = 'family';
		static NAME = 'name';
		static BIRTHDATE = 'birthDate';
		static GENDER = 'gender';
		static EMAIL = 'email';
		static PHONE = 'phone';
		static TITLE = 'title';
	}

	export class SYM_H {
		static ID = '_id';
		static DATE = 'date';
		static SERV = 'serv';
		static STRU = 'stru';
		static PATH = 'path';
		static FARE = 'fare';
		static AGRE = 'agre';
	}

	export class DlgHistory extends WUX.WDialog<string, any[]> {
		protected fp: WUX.WFormPanel;
		protected table: WUX.WDXTable;
		protected btnAdd: WUX.WButton;
		protected btnRes: WUX.WButton;

		constructor(id: string) {
			super(id, 'DlgHistory');

			this.title = I18.L_EVNS;

			this.fp = new WUX.WFormPanel(this.subId('fp'));
			this.fp.addRow();
			this.fp.addDateField(SYM_H.DATE, I18.L_DATE);
			this.fp.addComponent(SYM_H.SERV, I18.L_SERV, new SelServices());
			this.fp.addCurrencyField(SYM_H.FARE, I18.L_FARE);
			this.fp.addRow();
			this.fp.addComponent(SYM_H.STRU, I18.L_STRU, new SelStructures());
			this.fp.addComponent(SYM_H.PATH, I18.L_PATH, new SelPathologies());
			this.fp.addBlankField();

			this.fp.setMandatory(SYM_H.DATE, SYM_H.SERV, SYM_H.STRU);

			this.btnAdd = new WUX.WButton(this.subId('ba'), TXT.ADD, '', WUX.BTN.SM_PRIMARY);
			this.btnAdd.on('click', (e: JQueryEventObject) => {
				let check = this.fp.checkMandatory(true, true, true);
				if (check) {
					WUX.showWarning(I18.M_MAND + ': ' + check);
					return;
				}
				let v = this.fp.getState();
				v["patient"] = this.props;
				jrpc.execute('EVENTS.insert', [v], (result: any) => {
					if (!result || !result["_id"]) {
						WUX.showWarning(I18.M_KO);
						return;
					}

					let s = this.table.getState();

					if (!s) s = [];
					result['nfl'] = 1;
					s.unshift(result);

					this.table.setState(s);
				});
			});

			this.btnRes = new WUX.WButton(this.subId('br'), TXT.RESET, '', WUX.BTN.SM_DANGER);
			this.btnRes.on('click', (e: JQueryEventObject) => {
				this.fp.clear();
				this.fp.focus();
			});

			let sc = [
				[I18.L_DATE, SYM_H.DATE, 'd'],
				[I18.L_SERV, SYM_H.SERV, 's'],
				[I18.L_STRU, SYM_H.STRU, 's'],
				[I18.L_AGRE, SYM_H.AGRE, 'b'],
				[I18.L_PATH, SYM_H.PATH, 's'],
				[I18.L_FARE, SYM_H.FARE, 'c']
			];

			this.table = new WUX.WDXTable(this.subId('tah'), WUtil.col(sc, 0), WUtil.col(sc, 1));
			this.table.types = WUtil.col(sc, 2);
			this.table.css({ h: 400, f: 10 });
			this.table.exportFile = 'events';
			this.table.filter = true;
			this.table.onRowPrepared((e: { element?: JQuery, rowElement?: JQuery, data?: any, rowIndex?: number }) => {
				if (!e.data) return;
				let nfl = WUtil.getInt(e.data, 'nfl');
				if(nfl) {
					WUX.setCss(e.rowElement, WUX.CSS.WARNING);
				}
			});

			this.table.addActions('_id', {
				id: 'del',
				type: WUX.WInputType.Link,
				classStyle: 'btn btn-link btn-xs',
				style: 'text-danger',
				label: TXT.DELETE,
				icon: WUX.WIcon.TRASH
			});
			this.table.onClickAction((e: JQueryEventObject) => {
				let sub = WUX.firstSub(e.currentTarget);
				let eid = WUX.lastSub(e.currentTarget);
				console.log('[DlgHistory] onClickAction sub=' + sub, 'eid=' + eid);
				if (sub == 'del') {
					this.delete(eid);
				}
			});

			this.body
				.addRow()
				.addCol('col-xs-11 b-r')
				.add(this.fp)
				.addCol('col-xs-1 b-l')
				.addGroup({ classStyle: 'form-group text-right' }, this.btnAdd, this.btnRes)
				.addRow()
				.addCol('12')
				.addDiv(8)
				.add(this.table);
		}

		updateState(nextState: any[]) {
			super.updateState(nextState);
			if (this.table) this.table.setState(nextState);
		}

		getState(): any[] {
			if (this.table) return this.table.getState();
			return [];
		}

		delete(id: string) {
			if (!id) return;
			jrpc.execute('EVENTS.delete', [id], (result) => {
				if (result) {
					let s = this.table.getState();
					let i = WUtil.indexOf(s, '_id', id);
					if (i < 0) return;
					s.splice(i, 1);
					this.table.setState(s);
				}
				else {
					WUX.showWarning(I18.M_KO);
				}
			});
		}

		protected onShown() {
			this.fp.clear();
			this.fp.focus();
		}
	}

	export class GUIPatients extends WUX.WComponent {
		container: WUX.WContainer;
		tagsFilter: WUX.WTags;
		fpFilter: WUX.WFormPanel;
		fpDetail: WUX.WFormPanel;
		btnFind: WUX.WButton;
		btnReset: WUX.WButton;
		// Nuovo
		btnNew: WUX.WButton;
		// Azioni base
		cntActions: AppTableActions;
		btnOpen: WUX.WButton;
		btnSave: WUX.WButton;
		btnCancel: WUX.WButton;
		btnHist: WUX.WButton;
		// Risultato
		tabResult: WUX.WDXTable;
		selId: any;
		// Stato editing
		isNew: boolean;
		status: number;
		readonly iSTATUS_STARTUP = 0;
		readonly iSTATUS_VIEW = 1;
		readonly iSTATUS_EDITING = 2;
		// Opzioni
		ckFlt: boolean;
		// Dialogs
		dlgHist: DlgHistory;

		constructor(id?: string) {
			super(id ? id : '*', 'GUIPatients');
			this.status = this.iSTATUS_STARTUP;
			this.ckFlt = false;

			this.dlgHist = new DlgHistory(this.subId('dh'));
		}

		protected render() {
			this.btnFind = new WUX.WButton(this.subId('bf'), TXT.FIND, '', WUX.BTN.SM_PRIMARY);
			this.btnFind.on('click', (e: JQueryEventObject) => {
				if (this.status == this.iSTATUS_EDITING) {
					WUX.showWarning(I18.M_EDIT);
					return;
				}
				if (this.ckFlt) {
					if (this.fpFilter.isBlank()) {
						WUX.showWarning(I18.M_CRIT);
						return;
					}
					let check = this.fpFilter.checkMandatory(true, true, true);
					if (check) {
						WUX.showWarning(I18.M_MAND + ': ' + check);
						return;
					}
				}

				this.fpDetail.clear();

				let box = WUX.getComponent('bxf');
				if (box instanceof WUX.WBox) {
					this.tagsFilter.setState(this.fpFilter.getValues(true));
					box.collapse();
				}
				jrpc.execute('PATIENTS.find', [this.fpFilter.getState()], (result: any[]) => {
					this.status = this.iSTATUS_VIEW;
					this.tabResult.setState(result);
					if (this.selId) {
						let idx = WUtil.indexOf(result, SYM_P.CODE, this.selId);
						if (idx >= 0) {
							setTimeout(() => {
								this.tabResult.select([idx]);
							}, 100);
						}
						this.selId = null;
					}
					else {
						if (result && result.length) {
							WUX.showSuccess(result.length + ' ' + I18.M_IFND);
						}
						else {
							WUX.showWarning(I18.M_NFND);
						}
					}
				});
			});
			this.btnReset = new WUX.WButton(this.subId('br'), TXT.RESET, '', WUX.BTN.SM_SECONDARY);
			this.btnReset.on('click', (e: JQueryEventObject) => {
				// Clear filter
				this.fpFilter.clear();
				this.tagsFilter.setState({});
				// Clear result table
				this.tabResult.setState([]);
				// Clear detail
				this.fpDetail.clear();
				// Focus on
				this.fpFilter.focus();
			});

			this.tagsFilter = new WUX.WTags('tf');

			this.fpFilter = new WUX.WFormPanel(this.subId('fpf'));
			this.fpFilter.addRow();
			this.fpFilter.addTextField(SYM_P.FAMILY, I18.L_FAML);
			this.fpFilter.addTextField(SYM_P.NAME, I18.L_NAME);

			this.fpFilter.setMandatory(SYM_P.FAMILY, SYM_P.CODE);

			this.fpFilter.onEnterPressed((e: WUX.WEvent) => {
				this.btnFind.trigger('click');
			});

			this.btnNew = new WUX.WButton(this.subId('bn'), TXT.NEW, '', WUX.BTN.SM_INFO);
			this.btnNew.on('click', (e: JQueryEventObject) => {
				if (this.status == this.iSTATUS_EDITING) {
					this.btnNew.blur();
					return;
				}

				this.isNew = true;
				this.status = this.iSTATUS_EDITING;
				this.selId = null;

				this.tabResult.clearSelection();

				this.fpDetail.enabled = true;

				this.fpDetail.clear();

				setTimeout(() => { this.fpDetail.focus(); }, 100);
			});
			this.btnOpen = new WUX.WButton(this.subId('bo'), TXT.OPEN, ICO.OPEN, WUX.BTN.ACT_OUTLINE_PRIMARY);
			this.btnOpen.on('click', (e: JQueryEventObject) => {
				if (this.status == this.iSTATUS_EDITING || this.status == this.iSTATUS_STARTUP) {
					this.btnOpen.blur();
					return;
				}
				let sr = this.tabResult.getSelectedRows();
				if (!sr || !sr.length) {
					WUX.showWarning(I18.M_SEL);
					this.btnOpen.blur();
					return;
				}
				this.isNew = false;
				this.status = this.iSTATUS_EDITING;
				this.selId = null;

				this.fpDetail.enabled = true;

				setTimeout(() => { this.fpDetail.focus(); }, 100);
			});
			this.btnSave = new WUX.WButton(this.subId('bs'), TXT.SAVE, ICO.SAVE, WUX.BTN.ACT_OUTLINE_PRIMARY);
			this.btnSave.on('click', (e: JQueryEventObject) => {
				if (this.status != this.iSTATUS_EDITING) {
					WUX.showWarning(I18.M_MOD);
					this.btnSave.blur();
					return;
				}
				let check = this.fpDetail.checkMandatory(true, true, false);
				if (check) {
					this.btnSave.blur();
					WUX.showWarning(I18.M_MAND + ': ' + check);
					return;
				}
				let values = this.fpDetail.getState();
				let id = WUtil.getString(values, SYM_P.ID);
				let cf = WUtil.getString(values, SYM_P.CODE);
				jrpc.execute('PATIENTS.exists', [cf, id], (result) => {
					if (result) {
						this.btnSave.blur();
						WUX.showWarning(I18.M_ALRP);
						return;
					}

					if (this.isNew) {
						jrpc.execute('PATIENTS.insert', [values], (result) => {
							this.status = this.iSTATUS_VIEW;
							this.fpDetail.enabled = false;
							WUX.showSuccess(I18.M_OK);

							this.selId = result[SYM_P.ID];
							this.fpFilter.clear();
							this.fpFilter.setValue(SYM_P.CODE, result[SYM_P.CODE]);
							this.btnFind.trigger('click');
						});
					}
					else {
						jrpc.execute('PATIENTS.update', [values], (result) => {
							this.status = this.iSTATUS_VIEW;
							this.fpDetail.enabled = false;
							WUX.showSuccess(I18.M_OK);

							this.selId = result[SYM_P.ID];
							let selRows = this.tabResult.getSelectedRows();
							if (!selRows || !selRows.length) {
								this.btnFind.trigger('click');
							}
						});
					}
				});
			});
			this.btnCancel = new WUX.WButton(this.subId('bc'), TXT.CANCEL, ICO.CANCEL, WUX.BTN.ACT_OUTLINE_INFO);
			this.btnCancel.on('click', (e: JQueryEventObject) => {
				this.btnCancel.blur();
				if (this.status != this.iSTATUS_EDITING) return;
				WUX.confirm(MSG.CONF_CANCEL, (res: any) => {
					if (!res) return;
					if (this.isNew) {
						this.fpDetail.clear();
					}
					this.status = this.iSTATUS_VIEW;

					this.fpDetail.enabled = false;

					this.selId = null;
				});
			});

			this.btnHist = new WUX.WButton(this.subId('bh'), I18.L_EVNS, ICO.DETAIL, WUX.BTN.ACT_OUTLINE_INFO);
			this.btnHist.on('click', (e: JQueryEventObject) => {
				this.showHistory();
			});

			this.fpDetail = new WUX.WFormPanel(this.subId('fpd'));
			this.fpDetail.addRow();
			this.fpDetail.addTextField(SYM_P.FAMILY, I18.L_FAML);
			this.fpDetail.addTextField(SYM_P.NAME, I18.L_NAME);
			this.fpDetail.addTextField(SYM_P.CODE, I18.L_CODE);
			this.fpDetail.addDateField(SYM_P.BIRTHDATE, I18.L_BIDT);
			this.fpDetail.addRow();
			this.fpDetail.addTextField(SYM_P.TITLE, I18.L_TIT);
			this.fpDetail.addTextField(SYM_P.EMAIL, I18.L_MAIL);
			this.fpDetail.addTextField(SYM_P.PHONE, I18.L_PHON);
			this.fpDetail.addBlankField();
			this.fpDetail.addInternalField(SYM_P.ID);
			this.fpDetail.enabled = false;

			this.fpDetail.setMandatory(SYM_P.FAMILY, SYM_P.NAME);

			this.cntActions = new AppTableActions('ta');
			this.cntActions.left.add(this.btnOpen);
			this.cntActions.left.add(this.btnSave);
			this.cntActions.left.add(this.btnCancel);
			this.cntActions.left.add(this.btnHist);
			this.cntActions.right.add(this.btnNew);

			let rc = [
				[I18.L_FAML, SYM_P.FAMILY, 's'],
				[I18.L_NAME, SYM_P.NAME, 's'],
				[I18.L_BIDT, SYM_P.BIRTHDATE, 'd'],
				[I18.L_CODE, SYM_P.CODE, 's'],
				[I18.L_MAIL, SYM_P.EMAIL, 's'],
				[I18.L_PHON, SYM_P.PHONE, 's'],
			];

			this.tabResult = new WUX.WDXTable(this.subId('tab'), WUtil.col(rc, 0), WUtil.col(rc, 1));
			this.tabResult.filter = true;
			this.tabResult.exportFile = 'patients';
			this.tabResult.types = WUtil.col(rc, 2);
			this.tabResult.css({ h: 250, f: 10 });
			this.tabResult.onSelectionChanged((e: { element?: JQuery, selectedRowsData?: Array<any> }) => {
				var item = e.selectedRowsData[0];
				if (!item) return;

				let id = WUtil.getString(item, SYM_P.ID);
				if (!id) return;

				jrpc.execute('PATIENTS.read', [id], (result) => {
					this.fpDetail.clear();
					this.fpDetail.setState(result);
				});
			});
			this.tabResult.onDoubleClick((e: { element?: JQuery }) => {
				this.showHistory();
			});

			this.container = new WUX.WContainer();
			this.container.attributes = WUX.ATT.STICKY_CONTAINER;
			this.container
				.addBox(I18.L_FILT + ':', '', '', 'bxf', WUX.ATT.BOX_FILTER)
				.addTool(this.tagsFilter)
				.addCollapse(this.collapseHandler.bind(this))
				.addRow()
				.addCol('col-xs-11 b-r')
				.add(this.fpFilter)
				.addCol('col-xs-1 b-l')
				.addGroup({ classStyle: 'form-group text-right' }, this.btnFind, this.btnReset)
				.end() // end Box
				.addBox()
				.addGroup({ classStyle: 'search-actions-and-results-wrapper' }, this.cntActions, this.tabResult)
				.end() // end Box
				.addRow()
				.addCol('12').section(I18.L_DET)
				.add(this.fpDetail);

			return this.container;
		}

		collapseHandler(e: JQueryEventObject) {
			let c = WUtil.getBoolean(e.data, 'collapsed');
			if (c) {
				this.tagsFilter.setState({});
			}
			else {
				this.tagsFilter.setState(this.fpFilter.getValues(true));
			}
		}

		showHistory() {
			let srd = this.tabResult.getSelectedRowsData();
			if (!srd || !srd.length) return;

			let pid = WUtil.getString(srd[0], "_id");
			if (!pid) return;

			jrpc.execute('EVENTS.find', [{ "patient": pid }], (result: any[]) => {
				this.dlgHist.setProps(pid);
				this.dlgHist.setState(result);
				this.dlgHist.show(this);
			});
		}
	}

}