class RadixConverter {

	constructor(query) {
		this._inputs = [];
		const table = document.createElement('table');
		for (let i = 2; i <= 36; i += 1) {
			const tr = document.createElement('tr');
			const th = document.createElement('th');
			const td = document.createElement('td');
			const label = document.createElement('label');
			const input = document.createElement('input');
			label.htmlFor = i;
			label.innerText = i;
			input.id = i;
			input.type = 'text';
			input.addEventListener('change', this.changeInput.bind(this));
			tr.appendChild(th);
			tr.appendChild(td);
			th.appendChild(label);
			td.appendChild(input);
			table.appendChild(tr);
			this._inputs.push(input);
		}
		document.querySelector(query).appendChild(table);
	}

	changeInput(event) {
		const radix = event.currentTarget.id;
		const value = event.currentTarget.value.split('.');
		const valueInt = value[0] || "0";
		const valueDec = value[1] || "0";
		const integer = parseInt(valueInt, radix);
		const decimal = parseInt(valueDec, radix) * Math.pow(radix, -(valueDec.length));
		this._inputs.forEach(e => {
			if (e.id != radix) {
				e.value = (integer + decimal).toString(e.id);
			}
		});
	}

}

window.addEventListener('DOMContentLoaded', () => {
	new RadixConverter('#radixConverter');
});
