export default class Roue {
	constructor(r = 100) {
		this.r = r;
		this.circ = 2 * Math.PI * this.r;
		this.dom = this.DOM.main();
		
		this.dom.obj = this;
		this.dom.style.setProperty('translate', `1024px ${448-this.r}px`);
		this.vitesse = document.getElementById('vitesse').valueAsNumber;
		this.traction = document.getElementById('traction').valueAsNumber;

		// document.getElementById('play').addEventListener('click', e => {
		// 	this.play();
		// });
		// document.getElementById('stop').addEventListener('click', e => {
		// 	this.pause();
		// });
		document.getElementById('vitesse').addEventListener('input', e => {
			this.vitesse = e.target.valueAsNumber;
		});
		document.getElementById('traction').addEventListener('input', e => {
			this.traction = e.target.valueAsNumber;
		});
		this.pause();
	}
	get vitesse() {
		return this._vitesse;
	}
	set vitesse(v) {
		this._vitesse = v;
	}
	get traction() {
		return this._traction;
	}
	set traction(d) {
		this._traction = d;
		this.animations.translate.playbackRate = d;
	}
	play() {	
		for (let a in this.animations) {
		console.log(this.animations[a]);
		
			this.animations[a].play();
		}
	}
	pause() {
		for (let a in this.animations) {
			this.animations[a].pause();
		}
	}
	DOM = {
		main: () => {
			let result = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			result.setAttribute('id', 'roue');
			let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			result.appendChild(g);
			g.appendChild(this.DOM.circle());
			this.animations = {
				translate: this.animTranslate(result),			
				rotate: this.animRotate(result),
			};
			g.appendChild(this.DOM.marks());
			result.appendChild(g);
			console.log(result.getAnimations());
			
			return result;
		},
		marks: () => {
			let result = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			// create an array from 0 to 12
			let n = 12 * 4;
			let arr = Array.from(Array(n).keys()).map(i => {
				let l = (i%12 === 0) ? 15 : (i%4 === 0) ? 8 : 2;
				let x = Math.cos(i / n * Math.PI * 2);
				let y = Math.sin(i / n * Math.PI * 2);
				return `M ${(x * this.r).toFixed(2)} ${(y * this.r).toFixed(2)} L ${(x * (this.r - l)).toFixed(2)} ${(y * (this.r - l)).toFixed(2)}`;
			}).join(" ");

			result.setAttribute('d', arr);
			result.setAttribute('stroke', 'brown');
			result.setAttribute('stroke-width', 1);
			return result;
		},
		circle: () => {
			let result = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
			result.setAttribute('cx', 0);
			result.setAttribute('cy', 0);
			result.setAttribute('r', this.r);
			result.setAttribute('fill', 'beige');
			result.style.backgroundColor = 'blue';
			return result;
		}
	};
	animTranslate(element = null) {
		const result = new KeyframeEffect(
			element,
			{
				translate: [`${-this.circ}px 0`]
			},
			{
				duration: 1000,
				iterations: Infinity,
				composite: 'add',
				iterationComposite: 'accumulate',
				fill: 'forwards',
			});
		return new Animation(result, document.timeline);
	}
	animRotate(element = null) {
		const result = new KeyframeEffect(
			element,
			{
				rotate: ["0deg", "-360deg"]
			},
			{
				duration: 1000,
				iterations: Infinity,
			});
		return new Animation(result, document.timeline);
	}
	static rpm2rad(rpm) {
		return rpm * 2 * Math.PI / 60;
	}
	static rad2rpm(rad) {
		return rad * 60 / (2 * Math.PI);
	}
}
