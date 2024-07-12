
class Sheep {
  constructor(img) {
    this.pos = createVector(random(width), random(30, height));
    this.vel = createVector(random(0.1, 2), 0);
    this.acc = createVector(0, 0);

    this.maxSpeed = 2;
    this.maxSteering = 0.5;
    this.img = img;
  }

  behaviors(predator, obstacles) {
    this.flee(predator);
    
    for (let i = 0; i < obstacles.length; i++) {
      this.flee2(obstacles[i]);
    }

    return this;
  }

  applyForce(f) {
    this.acc.add(f);
  }

  flee(predator) {
    let desired = 0;
    let val = behaviorSelect.value();
    let dog_range = 0;
    desired = p5.Vector.sub(this.pos, predator.pos);
    


    let distance = desired.mag();
    switch (val) {
      case 'Collie':
        dog_range = 250;
        break;
      case 'Shetland':
        dog_range = 160;
        break;
      case 'German':
        dog_range = 100;
        break;
    }
    



    if (distance < dog_range) {
      desired.normalize();
      desired.mult(map(distance, dog_range, 0, 0, this.maxSpeed));

      let steer = p5.Vector.sub(desired, this.v);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
  }

  flee2(obstacle) {
    let desired = 0;
    let val = behaviorSelect.value();
    desired = p5.Vector.sub(this.pos, obstacle.pos);
      
    let distance = desired.mag();

    if (distance < 50) {
      desired.normalize();
      desired.mult(map(distance, 50, 0, 0, this.maxSpeed));

      let steer = p5.Vector.sub(desired, this.v);
      steer.limit(this.maxForce);
      this.applyForce(steer);
    }
  }

  bounds() {
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = height;
    if (this.pos.y > height) this.pos.y = 0;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.bounds();
    return this;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading())
    noStroke();
    fill(217);
    ellipse(5, 0, 15, 10);
    image(this.img,0, 0, 80,80);
    pop();
    
    return this;
  }

  render(predator, obstacles) {
    return this.update().display().behaviors(predator, obstacles);
  }
}

//