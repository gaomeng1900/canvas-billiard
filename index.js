/**
 * 桌球
 * @author Simon
 * @create 2016-08-12
 */

// 游戏图层, 刷新率60Hz (其中辅助线的绘制频率等于物理定律的运行频率, which is 60*SAMSARA_COUNT === 240)
const canvasZone = document.getElementById('playZone');
const ctZone     = canvasZone.getContext('2d');
// 背景图层, 刷新率0
const canvasDesk = document.getElementById('desk');
const ctDesk     = canvasDesk.getContext('2d');
// 辅助线图层, 刷新率与物理定律运行频率相同, 60*SAMSARA_COUNT = 240Hz
// !! 实测发现这个高刷新率的图层的存在严重影响了整个页面的刷新率
// !! 物理引擎中主动降频
// ** 实测又发现, 清空两个同频率图层还不如只维护一个图层性能好.......
// 暂时弃用
const canvasHelper = document.getElementById('helper');
const ctHelper     = canvasHelper.getContext('2d');

canvasZone.width = canvasHelper.width = canvasDesk.width = window.innerWidth;
canvasZone.height = canvasHelper.height = canvasDesk.height = window.innerHeight;

// 游戏进行状态
const STATE = {
    win: false,
    lose: false,
}

// 初始化红球
const redBalls = [];
for (let i = 0; i < 10; i++) {
    let ball = new Ball(POS_RED[i][0], POS_RED[i][1], BALL_RADIUS);
    // const v = 5;
    // let theta = Math.random() * Math.PI * 2;
    // ball.vx = Math.cos(theta) * v;
    // ball.vy = Math.sin(theta) * v;
    ball.m = ball.radius / 10;
    ball.f = F;
    ball.fillStyle = '#D84315';
    redBalls.push(ball);
}

// 初始化白球
const whiteBalls = [];
const whiteBall = new Ball(POS_WHITE[0], POS_WHITE[1], BALL_RADIUS);
whiteBall.m = whiteBall.radius / 10;
whiteBall.f = F;
whiteBall.fillStyle = '#EEEEEE';
whiteBalls.push(whiteBall);

// 所有球
const balls = redBalls.concat(whiteBall);

// 球洞
const holes = [];
for (let i = 0; i < 6; i++) {
    let hole = new Hole(POS_HOLE[i][0], POS_HOLE[i][1], HOLE_RADIUS);
    hole.fillStyle = '#000000';
    holes.push(hole);
}

// Hand of God !!!
const hog = new Engine(canvasZone, canvasHelper, SAMSARA_COUNT);

// 添加实体
hog.add(balls);

// 添加球之间的碰撞规则
hog.addLaw(() => {
    // 碰撞检测
    hog.checkCollition(balls, (A, B) => {
        // 防重叠
        hog.noCross(A, B);
        // 弹性碰撞
        hog.elasticImpact(A, B);
    })
});

// 添加桌面边缘碰撞规则
hog.addLaw(() => {
    balls.map(ball => {
        if (ball.x + ball.radius >= PLAY_ZONE[2]) {
            ball.vx = -ball.vx * RESTITUTION;
            ball.ax = -ball.ax;
            ball.x = PLAY_ZONE[2] - ball.radius; // 立刻退回区域内, 暂时不按原路径退回
        }
        if (ball.x - ball.radius <= PLAY_ZONE[0]) {
            ball.vx = -ball.vx * RESTITUTION;
            ball.ax = -ball.ax;
            ball.x = PLAY_ZONE[0] + ball.radius; // 立刻退回区域内, 暂时不按原路径退回
        }
        if (ball.y + ball.radius >= PLAY_ZONE[3]) {
            ball.vy = -ball.vy * RESTITUTION;
            ball.ay = -ball.ay;
            ball.y = PLAY_ZONE[3] - ball.radius; // 立刻退回区域内, 暂时不按原路径退回
        }
        if (ball.y - ball.radius <= PLAY_ZONE[1]) {
            ball.vy = -ball.vy * RESTITUTION;
            ball.ay = -ball.ay;
            ball.y = PLAY_ZONE[1] + ball.radius; // 立刻退回区域内, 暂时不按原路径退回
        }
    })
});

// 添加拖拽规则
hog.addLaw(() => {
    // balls.map(ball => hog.draftSimple(ball));
    // balls.map(ball => hog.draftEase(ball, 0.1 / SAMSARA_COUNT));
    whiteBalls.map(ball => hog.bungee(ball, SHOT_POWER, 300));
})

// 添加进洞规则
hog.addLaw(() => {
    balls.map(ball => {
        // ball与hole的圆心距
        let topLeft  = hog.getDistance(ball, holes[0]);
        let btmLeft  = hog.getDistance(ball, holes[1]);
        let topRight = hog.getDistance(ball, holes[2]);
        let btmRight = hog.getDistance(ball, holes[3]);
        let topMid   = hog.getDistance(ball, holes[4]);
        let btmMid   = hog.getDistance(ball, holes[5]);
        if (topLeft < HOLE_RADIUS + 2  || btmLeft < HOLE_RADIUS + 2 ||
            topRight < HOLE_RADIUS + 2 || btmRight < HOLE_RADIUS + 2 ||
            topMid < HOLE_RADIUS + 2   || btmMid < HOLE_RADIUS + 2) {
            ball.destory();
        }
    })
    // 清除尸体
    hog.clean();
})

// 添加游戏规则
hog.addLaw(() => {
    if (redBalls.filter(redBall => !redBall.dead).length === 0 && !STATE.win) {
        console.log("*************\nYOU WIN ｡:.ﾟヽ(*´∀´)ﾉﾟ.:｡\n*************");
        STATE.win = true;
    }
    if (whiteBall.dead && !STATE.lose) {
        console.log("*************\nYOU LOSE (◞‸◟)\n*************");
        STATE.lose = true;
    }
})

// 开始运行
hog.run();

// 静态背景: 球桌
const desk = new Background();
desk.draw(ctDesk);

// 静态背景: 球洞
holes.map(hole => hole.draw(ctDesk));
