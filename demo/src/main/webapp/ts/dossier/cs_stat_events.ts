namespace GUI {
	
	import WUtil = WUX.WUtil;
	
	export class GUIStatEvents extends WUX.WComponent {
		container: WUX.WContainer;
		tagsFilter: WUX.WTags;
		fpFilter: WUX.WFormPanel;
		selMonth: SelMonth;
		btnFind: WUX.WButton;
		btnReset: WUX.WButton;
		// Risultato
		chrPE: WUX.WChartJS; // Done
		chrPV: WUX.WChartJS; // Value
		chrPP: WUX.WChartJS; // Composition
		chrGV: WUX.WChartJS; // Trend

		constructor(id?: string) {
			super(id ? id : '*', 'GUIStatEvents');
		}

		protected render() {
			this.btnFind = new WUX.WButton(this.subId('bf'), TXT.FIND, '', WUX.BTN.SM_PRIMARY);
			this.btnFind.on('click', (e: JQueryEventObject) => {
				let check = this.fpFilter.checkMandatory(true, true);
				if (check) {
					WUX.showWarning(I18.M_MAND + ': ' + check);
					return false;
				}
				let box = WUX.getComponent('boxFilter');
				if (box instanceof WUX.WBox) {
					this.tagsFilter.setState(this.fpFilter.getValues(true));
					box.collapse();
				}
				jrpc.execute('STATISTICS.load', [this.fpFilter.getState()], (result) => {
					if (WUtil.isEmpty(result)) {
						WUX.showWarning(I18.M_NFND);
						return;
					}
					this.chrPE.setState(result['pe']);
					this.chrPV.setState(result['pv']);
					this.chrPP.setState(result['pp']);
					this.chrGV.setState(result['gv']);

					setTimeout(() => {
						this.fix();
					}, 200);
				});
			});
			this.btnReset = new WUX.WButton(this.subId('br'), TXT.RESET, '', WUX.BTN.SM_SECONDARY);
			this.btnReset.on('click', (e: JQueryEventObject) => {
				this.chrPE.setState(null);
				this.chrPV.setState(null);
				this.chrPP.setState(null);
				this.chrGV.setState(null);

				this.fpFilter.clear();
				this.tagsFilter.setState({});
			});

			this.tagsFilter = new WUX.WTags('tagsFilter');

			this.selMonth = new SelMonth();

			this.fpFilter = new WUX.WFormPanel(this.subId('fpf'));
			this.fpFilter.addRow();
			this.fpFilter.addComponent('code', I18.L_MONT, this.selMonth);
			this.fpFilter.addBlankField();

			this.fpFilter.setMandatory('code');

			this.fpFilter.onEnterPressed((e: WUX.WEvent) => {
				this.btnFind.trigger('click');
			});

			this.chrPE = new WUX.WChartJS('chrpe', 'bar');
			this.chrPV = new WUX.WChartJS('chrpv', 'bar');
			this.chrPP = new WUX.WChartJS('chrpp', 'pie');
			this.chrGV = new WUX.WChartJS('chrgv', 'line');

			this.container = new WUX.WContainer();
			this.container.attributes = WUX.ATT.STICKY_CONTAINER;
			this.container
				.addBox(I18.L_FILT + ":", '', '', 'boxFilter', WUX.ATT.BOX_FILTER)
				.addTool(this.tagsFilter)
				.addCollapse(this.collapseHandler.bind(this))
				.addRow()
				.addCol('col-xs-11 b-r')
				.add(this.fpFilter)
				.addCol('col-xs-1 b-l')
				.addGroup({ classStyle: 'form-group text-right' }, this.btnFind, this.btnReset)
				.end() // end Box
				.addRow()
				.addCol('6').section(I18.L_DONE)
				.add(this.chrPE)
				.addCol('6').section(I18.L_VALU)
				.add(this.chrPV)
				.addRow()
				.addCol('6').section(I18.L_COMP)
				.add(this.chrPP)
				.addCol('6').section(I18.L_TREN)
				.add(this.chrGV);

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

		protected fix(): void {
			// Quando si espande o si collassa il menu i grafici cambiano dimensione
			// per questo motivo si imposta anche il max-height.
			let r = this.chrPE.getRoot();
			let v = r.height();
			if (v) {
				this.chrPE.css({ h: v, maxh: v });
				this.chrPV.css({ h: v, maxh: v });
				this.chrPP.css({ h: v, maxh: v });
				this.chrGV.css({ h: v, maxh: v });
			}
		}

	}
}