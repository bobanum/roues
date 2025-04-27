import Particule from "./Particule.js";
import Roue from "./Roue.js";

export default class App {
	static main() {
		this.roue = new Roue();
		document.querySelector('svg').appendChild(this.roue.dom);
		document.getElementById('play').addEventListener('click', e => {
			this.play();
		});
		document.getElementById('stop').addEventListener('click', e => {
			this.pause();
		});
		let p = new Particule();
		p.vx = 100;
		p.vy = 100;
		p.r = 5;
		document.querySelector('svg').appendChild(p.dom);

		p.play();
	}
	static play() {
		this.roue.play();
		let intInterval = setInterval(() => {
			let particule = new Particule();
		}, 100);
	}
	static pause() {
		this.roue.pause();
	}
}