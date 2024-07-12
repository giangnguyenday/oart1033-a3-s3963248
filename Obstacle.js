class Obstacle {
	constructor(img,x,y) {
		this.pos = createVector(x,y);
		this.img = img;
	}

	move(x, y) {
		this.pos.set(x, y);
	}

	display() {
		push();
		blendMode(ADD);
    	//square(this.pos.x-10, this.pos.y-10, 20);
		pop();
		image(this.img,this.pos.x, this.pos.y, 20,20);
    	return this;
		
	}
}