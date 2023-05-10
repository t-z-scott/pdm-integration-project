// created by Ren Yuan for c2.js library
// edited by Taylor Scott to fit their project


const renderPoint = new c2.Renderer(document.getElementById('c2'));
resize();

renderPoint.background('#cccccc');
let random = new c2.Random();


class AgentP extends c2.Point {
    constructor(x, y) {
        super(x, y);

        this.weight = random.next(1, 5);
        this.color = c2.Color.hsl(random.next(0, 30), random.next(30, 60), random.next(20, 100), .5);
    }
}

let agents = new Array(10);
for (let i = 0; i < agents.length; i++) {
    let x = random.next(renderPoint.width);
    let y = random.next(renderPoint.height);
    agents[i] = new AgentP(x, y);
}


renderPoint.draw(() => {
    for (let i = 0; i < agents.length; i++) {
        let next = (i+1) % agents.length;
        agents[i].rotate(.01, agents[next]);

        renderPoint.stroke(agents[i].color);
        renderPoint.lineWidth(agents[i].weight);
        renderPoint.line(agents[i].x, agents[i].y, agents[next].x, agents[next].y);

        renderPoint.stroke('#333333');
        renderPoint.point(agents[i].x, agents[i].y);
    }
});


window.addEventListener('resize', resize);
function resize() {
    let parent = renderPoint.canvas.parentElement;
    renderPoint.size(parent.clientWidth, parent.clientWidth / 16 * 9);
}