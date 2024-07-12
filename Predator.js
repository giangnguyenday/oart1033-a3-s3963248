class Predator {
	constructor(img) {
		this.pos = createVector(random(width), random(height));
		this.img = img;
	}

	move(x, y) {
		this.pos.set(x, y);
	}

	switchDog(img){
		this.img = img;
	}

	display() {
		var angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
		push();
		translate(this.pos.x, this.pos.y);
		fill(217);
    	ellipse(5, 0, 15, 10);
		rotate(angle);
		image(this.img,0, 0, 100,100);
		pop();
		
    	return this;
		
	}
}