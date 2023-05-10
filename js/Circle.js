// created by Ren Yuan for c2.js library
// edited by Taylor Scott to fit their project


const renderCircle = new c2.Renderer(document.getElementById('c2'));
resize();

renderCircle.background('#cccccc');
let random = new c2.Random();


class AgentC extends c2.Circle{
    constructor() {
        let x = random.next(renderCircle.width);
        let y = random.next(renderCircle.height);
        let r = random.next(renderCircle.width/4);
        super(x, y, r);

        this.vx = random.next(-2, 2);
        this.vy = random.next(-2, 2);
        this.color = c2.Color.hsl(random.next(0, 30), random.next(30, 60), random.next(20, 100));
    }

    update(){
        this.p.x += this.vx;
        this.p.y += this.vy;

        if (this.p.x < this.r) {
            this.p.x = this.r;
            this.vx *= -1;
        } else if (this.p.x > renderCircle.width-this.r) {
            this.p.x = renderCircle.width-this.r;
            this.vx *= -1;
        }
        if (this.p.y < this.r) {
            this.p.y = this.r;
            this.vy *= -1;
        } else if (this.p.y > renderCircle.height-this.r) {
            this.p.y = renderCircle.height-this.r;
            this.vy *= -1;
        }
    }

    display(){
        renderCircle.stroke(false);
        renderCircle.fill(this.color);
        renderCircle.circle(this);
    }
}


let agents = [];
for (let i = 0; i < 10; i++) agents[i] = new AgentC();


renderCircle.draw(() => {
    renderCircle.clear();

    for (let i = 0; i < agents.length; i++) {
        agents[i].update();
        agents[i].display();
    }

    for (let i = 0; i < agents.length-1; i++) {
        for (let j = i+1; j < agents.length; j++) {
          let points = agents[i].intersection(agents[j]);
            if(points!=null){
              let c = c2.Color.lerp(agents[i].color, agents[j].color, .5);
              renderCircle.stroke(c);
              renderCircle.lineWidth(2);
              renderCircle.line(points[0].x, points[0].y, points[1].x, points[1].y);
              
              renderCircle.stroke('#333333');
              renderCircle.lineWidth(5);
              renderCircle.point(points[0]);
              renderCircle.point(points[1]);
            }
        }
    }
});


window.addEventListener('resize', resize);
function resize() {
    let parent = renderCircle.canvas.parentElement;
    renderCircle.size(parent.clientWidth, parent.clientWidth / 16 * 9);
}