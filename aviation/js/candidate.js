function Candidate(position, image) {
  this.x                = position.x;
  this.y                = position.y;
 
  //this.position = {x:position.x,y:position.y};
  this.image            = image;
 
}


Candidate.prototype.serialize = function () {
  return {
    position: {
      x: this.x,
      y: this.y
    },
    image: this.image
  };
};
