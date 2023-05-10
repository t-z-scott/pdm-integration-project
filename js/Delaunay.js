// created by Ren Yuan for c2.js library
// edited by Taylor Scott to fit their project


const renderDelaunay = new c2.Renderer(document.getElementById('c2'));
resize();

renderDelaunay.background('#cccccc');
let rand = new c2.Random();


class AgentD extends c2.Point {
    constructor() {
        let x = rand.next(renderDelaunay.width);
        let y = rand.next(renderDelaunay.height);
        super(x, y);

        this.vx = rand.next(-2, 2);
        this.vy = rand.next(-2, 2);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) {
            this.x = 0;
            this.vx *= -1;
        } else if (this.x > renderDelaunay.width) {
            this.x = renderDelaunay.width;
            this.vx *= -1;
        }
        if (this.y < 0) {
            this.y = 0;
            this.vy *= -1;
        } else if (this.y > renderDelaunay.height) {
            this.y = renderDelaunay.height;
            this.vy *= -1;
        }
    }

    display() {
        renderDelaunay.stroke('#333333');
        renderDelaunay.lineWidth(5);
        renderDelaunay.point(this.x, this.y);
    }
}

let agentsD = new Array(20);
for (let i = 0; i < agentsD.length; i++) agentsD[i] = new AgentD();


renderDelaunay.draw(() => {
    renderDelaunay.clear();

    let delaunay = new c2.Delaunay();
    delaunay.compute(agentsD);
    let vertices = delaunay.vertices;
    let edges = delaunay.edges;
    let triangles = delaunay.triangles;

    let maxArea = 0;
    let minArea = Number.POSITIVE_INFINITY;
    for (let i = 0; i < triangles.length; i++) {
        let area = triangles[i].area();
        if(area < minArea) minArea = area;
        if(area > maxArea) maxArea = area;
    }

    renderDelaunay.stroke('#333333');
    renderDelaunay.lineWidth(1);
    for (let i = 0; i < triangles.length; i++) {
        let t = c2.norm(triangles[i].area(), minArea, maxArea);
        let color = c2.Color.hsl(30*t, 30+30*t, 20+80*t);
        renderDelaunay.fill(color);
        renderDelaunay.triangle(triangles[i]);
    }
    

    for (let i = 0; i < agentsD.length; i++) {
        agentsD[i].display();
        agentsD[i].update();
    }
});


window.addEventListener('resize', resize);
function resize() {
    let parent = renderDelaunay.canvas.parentElement;
    renderDelaunay.size(parent.clientWidth, parent.clientWidth / 16 * 9);
}