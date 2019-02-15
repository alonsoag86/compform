const canvasSketch = require('canvas-sketch');
//https://github.com/mattdesl/canvas-sketch-util/
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');


const settings = {
  //here in pixels but you can use cm, ft, or even paper size
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {

  const palette = ["#EE4266", "#540D6E"]
  const createGrid = () => {
    //make an array to store our points
    const points = [];
    //count determines the grid size
    const count = 30
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        //calculating the coordinates of the circles
        const u = x / (count - 1);
        const v = y / (count - 1);
        const radius = Math.abs(random.noise2D(u,v) * 0.025)
        points.push({
          //create a random radius for each circle
          //gaussian is going to provide us with a distribution
          // -3.5 and 3.5
          color: random.pick(palette),
          radius,
          position: [ u, v ]
        }); 
      }
    }
    return points;
  };

  //introduce randomness
  const points = createGrid().filter(() => random.value() > 0.5)
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = '#01172F';
    context.fillRect(0, 0, width, height);
    //determine the actual position of the circles
    //and get the pixel context set in dimensions
    points.forEach(data => {
      const {
        color,
        position,
        radius
      } = data;

      const [ u, v ] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.beginPath();
      context.arc(x, y, radius * width, Math.PI * 2, false);
      context.fillStyle = color;
      context.fill()

    });
  };
};

canvasSketch(sketch, settings);
