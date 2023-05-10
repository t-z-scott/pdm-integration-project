// created by Ren Yuan for c2.js library
// edited by Taylor Scott to fit their project


const renderPerlin = new c2.Renderer(document.getElementById('c2'));
resize();

renderPerlin.background('#cccccc');
let perlin = new c2.Perlin();
//perlin.detail(4, .5);
//perlin.seed(0);


let row = 20;
let col = 10;

renderPerlin.draw(() => {
    renderPerlin.clear();

    let time = renderPerlin.frameCount * .01;

    renderPerlin.stroke('#333333');
    renderPerlin.lineWidth(1);
    for (let i=0; i<row; i++) {
      let t = c2.norm(i, 0, row);
      let c = c2.Color.hsl(30*t, 30+30*t, 20+70*t);
      renderPerlin.fill(c);
      renderPerlin.beginPath();
      for (let j=0; j<col; j++) {
        let x = c2.map(j, 0, col-1, 0, renderPerlin.width);
        let y = c2.map(i, 0, row, renderPerlin.height/3, renderPerlin.height)
          + (perlin.noise(time+j*.1, time+i*.04)-.5)
          * renderPerlin.height*2;
        renderPerlin.lineTo(x, y);
      }
      renderPerlin.lineTo(renderPerlin.width, renderPerlin.height);
      renderPerlin.lineTo(0, renderPerlin.height);
      renderPerlin.endPath(true);
    }
});


window.addEventListener('resize', resize);
function resize() {
    let parent = renderPerlin.canvas.parentElement;
    renderPerlin.size(parent.clientWidth, parent.clientWidth / 16 * 9);
}