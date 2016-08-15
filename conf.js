/**
 * 相关配置
 */

const SAMSARA_COUNT = 40; // 每帧几个轮回

const DESK_WIDTH = 1530 / 5;
const DESK_HIGHT = 2810 / 5;
// const F = 0.015 / SAMSARA_COUNT; // 桌面摩擦系数
const F = 0.015; // 桌面摩擦系数
// const SHOT_POWER = 1.2 / SAMSARA_COUNT; // 击球力量系数
const SHOT_POWER = 1.2; // 击球力量系数
const RESTITUTION = 0.9; // 碰撞恢复系数
const BALL_RADIUS = 11; // 球半径
const HOLE_RADIUS = 20; // 球洞半径

const PLAY_ZONE = [100, 100, 1000, 550];

const POS_HOLE = [ // 球洞位置
    [PLAY_ZONE[0], PLAY_ZONE[1]],
    [PLAY_ZONE[0], PLAY_ZONE[3]],
    [PLAY_ZONE[2], PLAY_ZONE[1]],
    [PLAY_ZONE[2], PLAY_ZONE[3]],

    [(PLAY_ZONE[0] + PLAY_ZONE[2])/2, PLAY_ZONE[1]],
    [(PLAY_ZONE[0] + PLAY_ZONE[2])/2, PLAY_ZONE[3]],
];


const _firstRedBall = {
    x: (PLAY_ZONE[0] + PLAY_ZONE[2]) / 2 - 100 ,
    y: (PLAY_ZONE[1] + PLAY_ZONE[3]) / 2,
}
const _dX = BALL_RADIUS * 2 * Math.cos(Math.PI/6) + 0.1;
const _dY = BALL_RADIUS * 2 * Math.sin(Math.PI/6) + 0.1;

const POS_RED = [
    [_firstRedBall.x, _firstRedBall.y],

    [_firstRedBall.x - _dX , _firstRedBall.y - _dY],
    [_firstRedBall.x - _dX , _firstRedBall.y + _dY],

    [_firstRedBall.x - 2 * _dX , _firstRedBall.y - 2 * _dY],
    [_firstRedBall.x - 2 * _dX , _firstRedBall.y + 2 * _dY],
    [_firstRedBall.x - 2 * _dX , _firstRedBall.y],

    [_firstRedBall.x - 3 * _dX , _firstRedBall.y - 3 * _dY],
    [_firstRedBall.x - 3 * _dX , _firstRedBall.y + 3 * _dY],
    [_firstRedBall.x - 3 * _dX , _firstRedBall.y - _dY],
    [_firstRedBall.x - 3 * _dX , _firstRedBall.y + _dY],
]

const POS_WHITE = [_firstRedBall.x + 200, _firstRedBall.y]
