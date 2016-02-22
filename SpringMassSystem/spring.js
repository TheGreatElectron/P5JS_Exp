function Spring(pos_, k_, m_, lengthOfSpring_, oscAmp_) {
  boxsize = 40;
  //no of coils (purely decorative, odd numbers work better)
  this.noOfCoils = 11;
  //how long is the equilibrium length of the spring, in px
  this.lengthOfSpring = lengthOfSpring_;
  //the transverse amplitude (also purely decorative)
  this.transAmp = 15;
  //time variables 
  this.tzero = millis();
  this.time = 0;
  //get the starting position of the spring.
  this.xcent = pos_.x;
  this.ycent = pos_.y;
  //how do we want it? horizontal (theta = 0), vertical? (theta = PI/2)
  this.rotation = 0;
  //how big should the oscillation amplitude be? (as a fraction of the lengthOfSpring. i.e 0.5 means it will have an Amplitude equal to half the length of the spring, which is kinda long. 0.2 works good)
  this.oscAmp = oscAmp_;
  //calculate the frequency based on the spring constant k and the mass of the block m
  this.freq = sqrt(k_ / m_);


  //some kinematics values
  //where is equilibrium?
  this.equilibrium = createVector(this.lengthOfSpring, 0);
  //where is the mass?
  this.displacement = createVector(0, 0);
  //what is its velocity
  this.velocity = createVector(0, 0);
  //and its acceleration?
  this.acceleration = createVector(0, 0);

};

Spring.prototype.update = function() {
  //update time
  this.time = millis()/1000-this.tzero;
}

Spring.prototype.display = function() {
  //this draws the mass at the end
  push();
  translate(this.xcent, this.ycent);
  rotate(this.rotation)
  fill(200);
  rect(this.lengthOfSpring - (boxsize / 2) + (this.lengthOfSpring - 60) * this.oscAmp * sin((this.time) * this.freq), -(boxsize / 2), boxsize, boxsize)
  noFill();
  stroke(80);
  strokeWeight(3);
  //this makes the spring
  beginShape();
  //this part is cosmetic
  curveVertex(-1, 0);
  curveVertex(0, 0);
  curveVertex(5, 0);
  curveVertex(20, 0);
  curveVertex(25, 0);
  //this part makes the coil
  for (var i = 0; i < this.lengthOfSpring - 60; i++) {
    curveVertex(30 + (i * (1 + this.oscAmp * sin((this.time) * this.freq))), -this.transAmp * sin(2 * PI * this.noOfCoils * i / this.lengthOfSpring));
  }
  //and a nice little bit at the end
  curveVertex(30 + (i * (1 + this.oscAmp * sin((this.time) * this.freq))) + 5, 0)
  curveVertex(30 + (i * (1 + this.oscAmp * sin((this.time) * this.freq))) + 20, 0)
  curveVertex(30 + (i * (1 + this.oscAmp * sin((this.time) * this.freq))) + 25, 0)
  curveVertex(30 + (i * (1 + this.oscAmp * sin((this.time) * this.freq))) + 30, 0)
  curveVertex(30 + (i * (1 + this.oscAmp * sin((this.time) * this.freq))) + 31, 0)
  endShape();

  //update the kinematic variables
  this.displacement.x = this.equilibrium.x + (this.oscAmp * sin((this.time) * this.freq));
  this.velocity.x = this.oscAmp * cos((this.time) * this.freq);
  this.acceleration.x = this.oscAmp * sin((this.time) * this.freq);
  pop();


}
