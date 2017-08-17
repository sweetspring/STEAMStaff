function CandidateGrid(gridindex, image) {
  this.gridindex        = gridindex;
  this.image            = image; 
}


CandidateGrid.prototype.serialize = function () {
  return {
    gridindex: this.gridindex,
    image: this.image
  };
};
