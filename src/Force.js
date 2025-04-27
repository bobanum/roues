export default class Force {
	constructor(angle, acc) {
		this.angle = angle;
		this.acc = acc;
	}

	setForce(force) {
		this.force = force;
	}

	getForce() {
		return this.force;
	}
}