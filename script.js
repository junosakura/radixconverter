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
		const value = event.currentTarget.value;
		const radix = event.currentTarget.id;
		const result = this.convertRadix(value, radix);
		this._inputs.forEach(e => e.value = result.toString(e.id));
	}

	convertRadix(value, radix) {
		const a = value.split('.')[0] || 0;
		const b = value.split('.')[1] || 0;
		const int = parseInt(a, radix);
		const dec = parseInt(b, radix) * Math.pow(radix, b.toString().length * -1);
		const sign = value.slice(0, 1) == '-' ? -1 : 1;
		return int + dec * sign;
	}

}

window.addEventListener('DOMContentLoaded', () => {
	new RadixConverter('#radixConverter');
});
