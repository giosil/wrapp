namespace GUI {
	import WUtil = WUX.WUtil;
	
	export class GUIServices extends WUX.WComponent {
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
		// Risultato
		tabResult: WUX.WDXTable;
		selId: any;
		// Stato editing
		isNew: boolean;
		status: number;
		readonly iSTATUS_STARTUP = 0;
		readonly iSTATUS_VIEW = 1;
		readonly iSTATUS_EDITING = 2;
		
		constructor(id?: string) {
			super(id ? id : '*', 'GUIServices');
			this.status = this.iSTATUS_STARTUP;
		}
		
		protected render() {
			this.btnFind = new WUX.WButton(this.subId('bf'), TXT.FIND, '', WUX.BTN.SM_PRIMARY);
			this.btnFind.on('click', (e: JQueryEventObject) => {
				if (this.status == this.iSTATUS_EDITING) {
					WUX.showWarning(I18.M_EDIT);
					return;
				}
				
				this.fpDetail.clear();
				
				let box = WUX.getComponent('bxf');
				if (box instanceof WUX.WBox) {
					this.tagsFilter.setState(this.fpFilter.getValues(true));
					box.collapse();
				}
				jrpc.execute('SERVICES.find', [this.fpFilter.getState()], (result: any[]) => {
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
			this.fpFilter.addTextField(SYM_E.CODE, I18.L_CODE);
			this.fpFilter.addTextField(SYM_E.DESC, I18.L_DESC);
			this.fpFilter.addComponent(SYM_E.TYPE, I18.L_TYPE, new SelSerType());

			this.fpFilter.setMandatory(SYM_E.CODE, SYM_E.DESC, SYM_E.TYPE);

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
				jrpc.execute('SERVICES.exists', [cf, id], (result) => {
					if (result) {
						this.btnSave.blur();
						WUX.showWarning(I18.M_ALRP);
						return;
					}
					
					if (this.isNew) {
						jrpc.execute('SERVICES.insert', [values], (result) => {
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
						jrpc.execute('SERVICES.update', [values], (result) => {
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
			
			this.fpDetail = new WUX.WFormPanel(this.subId('fpd'));
			this.fpDetail.addRow();
			this.fpDetail.addTextField(SYM_E.CODE, I18.L_CODE);
			this.fpDetail.addTextField(SYM_E.DESC, I18.L_DESC);
			this.fpDetail.addComponent(SYM_E.TYPE, I18.L_TYPE, new SelSerType());
			this.fpDetail.addCurrencyField(SYM_E.FARE, I18.L_FARE);
			this.fpDetail.addInternalField(SYM_E.ID);
			this.fpDetail.enabled = false;

			this.fpDetail.setMandatory(SYM_E.CODE, SYM_E.DESC, SYM_E.TYPE);

			this.cntActions = new AppTableActions('ta');
			this.cntActions.left.add(this.btnOpen);
			this.cntActions.left.add(this.btnSave);
			this.cntActions.left.add(this.btnCancel);
			this.cntActions.right.add(this.btnNew);

			let rc = [
				[I18.L_CODE, SYM_E.CODE, 's'],
				[I18.L_DESC, SYM_E.DESC, 's'],
				[I18.L_TYPE, SYM_E.TYPE_DESC, 's'],
				[I18.L_FARE, SYM_E.FARE, 'c'],
			];

			this.tabResult = new WUX.WDXTable(this.subId('tab'), WUtil.col(rc, 0), WUtil.col(rc, 1));
			this.tabResult.filter = true;
			this.tabResult.exportFile = 'services';
			this.tabResult.types = WUtil.col(rc, 2);
			this.tabResult.css({ h: 250, f: 10 });
			this.tabResult.onSelectionChanged((e: { element?: JQuery, selectedRowsData?: Array<any> }) => {
				var item = e.selectedRowsData[0];
				if (!item) return;

				let id = WUtil.getString(item, SYM_P.ID);
				if (!id) return;

				jrpc.execute('SERVICES.read', [id], (result) => {
					this.fpDetail.clear();
					this.fpDetail.setState(result);
				});
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
	}

}