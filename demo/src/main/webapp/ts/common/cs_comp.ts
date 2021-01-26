namespace GUI {

	export class SelMonth extends WUX.WSelect2 {
		constructor(id?: string, mesi: number = 12, pros: number = 0) {
			super(id);
			this.multiple = false;
			this.name = 'SelMonth';
			this.options = [] as WUX.WEntity[];
			let currDate = new Date();
			let currMonth = currDate.getMonth() + 1;
			let currYear = currDate.getFullYear();
			if (pros > 0) {
				currMonth += pros;
				if (currMonth > 12) {
					currMonth -= 12;
					if (currMonth > 12) currMonth = 1;
					currYear++;
				}
			}
			for (let i = 0; i < mesi; i++) {
				let m = currYear * 100 + currMonth;
				this.options.push({ id: m, text: formatMonth(currMonth, true, currYear) });
				currMonth--;
				if (currMonth == 0) {
					currMonth = 12;
					currYear--;
				}
			}
		}
	}

	export class SelSerType extends WUX.WSelect2 {
		constructor(id?: string, multiple?: boolean) {
			super(id);
			this.multiple = multiple;
			this.name = 'SelSerType';
			this.options = [
				{ id: '', text: '' },
				{ id: 'CAR', text: 'Cardiologie' },
				{ id: 'OPH', text: 'Ophtalmologie' },
				{ id: 'ORT', text: 'Orthopédie' },
				{ id: 'DER', text: 'Dermatologie' },
				{ id: 'DEN', text: 'Dentisterie' },
				{ id: 'OTO', text: 'Otolaryngologie' },
				{ id: 'PHI', text: 'Physiatrie' },
				{ id: 'DIA', text: 'Diabétologie' }
			];
		}
	}

	export class SelPatType extends WUX.WSelect2 {
		constructor(id?: string, multiple?: boolean) {
			super(id);
			this.multiple = multiple;
			this.name = 'SelPatType';
			this.options = [
				{ id: '', text: '' },
				{ id: 'CAR', text: 'Cardiologie' },
				{ id: 'OPH', text: 'Ophtalmologie' },
				{ id: 'ORT', text: 'Orthopédie' },
				{ id: 'DER', text: 'Dermatologie' },
				{ id: 'DEN', text: 'Dentisterie' },
				{ id: 'OTO', text: 'Otolaryngologie' },
				{ id: 'PHI', text: 'Physiatrie' },
				{ id: 'DIA', text: 'Diabétologie' }
			];
		}
	}

	export class SelServices extends WUX.WSelect2 {
		constructor(id?: string, multiple?: boolean) {
			super(id, [], multiple);
			this.name = 'SelServices';
		}

		protected componentDidMount(): void {
			jrpc.execute('SERVICES.find', [{}], (result) => {
				let data = [];
				for (var i = 0; i < result.length; i++) {
					var r = result[i];
					var d = {
						id: r['_id'],
						text: r['desc']
					};
					data.push(d);
				}
				let options: Select2Options = {
					data: data,
					placeholder: "",
					allowClear: true,
				};
				this.init(options);
			});
		}
	}

	export class SelStructures extends WUX.WSelect2 {
		constructor(id?: string, multiple?: boolean) {
			super(id, [], multiple);
			this.name = 'SelStructures';
		}

		protected componentDidMount(): void {
			jrpc.execute('STRUCTURES.find', [{}], (result) => {
				let data = [];
				for (var i = 0; i < result.length; i++) {
					var r = result[i];
					var d = {
						id: r['_id'],
						text: r['desc']
					};
					data.push(d);
				}
				let options: Select2Options = {
					data: data,
					placeholder: "",
					allowClear: true,
				};
				this.init(options);
			});
		}
	}

	export class SelPathologies extends WUX.WSelect2 {
		constructor(id?: string, multiple?: boolean) {
			super(id, [], multiple);
			this.name = 'SelPathologies';
		}

		protected componentDidMount(): void {
			jrpc.execute('PATHOLOGIES.find', [{}], (result) => {
				let data = [];
				for (var i = 0; i < result.length; i++) {
					var r = result[i];
					var d = {
						id: r['_id'],
						text: r['desc']
					};
					data.push(d);
				}
				let options: Select2Options = {
					data: data,
					placeholder: "",
					allowClear: true,
				};
				this.init(options);
			});
		}
	}

}