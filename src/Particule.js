export default class Particule {
	constructor(x = 0, y = 0, r = 1) {
		this.dom = this.DOM.main();
		this.x = x;
		this.y = y;
		this.r = r;
		this.vx = 0;
		this.vy = 0;
		this.mass = 1;
		this.forces = [];
		this.start = null;
	}
	get x() {
		return this._x;
	}
	set x(v) {
		this._x = v;
		this.dom.setAttribute('cx', v);
	}
	get y() {
		return this._y;
	}
	set y(v) {
		this._y = v;
		this.dom.setAttribute('cy', v);
	}
	get r() {
		return this._r;
	}
	set r(v) {
		this._r = v;
		this.dom.setAttribute('r', v);
	}
	DOM = {
		main: () => {
			let result = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
			result.classList.add('particule');
			// result.setAttribute('cx', this.x);
			// result.setAttribute('cy', this.y);
			// result.setAttribute('r', this.r);
			return result;
		},
	}
	play() {
		if (!this.start) {
			this.start = performance.now();
		}
		this.move();
	}
	move(timestamp) {
		
		let t = (performance.now() - this.start) / 1000;
		this.x = this.vx * t;
		this.y = this.vy * t;
		if (this.y < 1000) {
			requestAnimationFrame(this.move.bind(this));
		}
	}

}