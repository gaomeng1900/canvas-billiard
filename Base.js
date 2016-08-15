/**
 * 基类(虚基类)
 * @author Simon
 * @create 2016-08-09
 */

class Base {
    constructor(x, y) {
        this.x  = x;
        this.y  = y;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.f  = 0; // 摩擦力
        this.spring = 0.5; // 弹性
        // this.free   = true; // 按照自己的v/a自由运动
        this.scale  = 1; // 缩放比例
        this.rotate = 0; // 旋转角度
        this.fillStyle   = 'rgba(0, 0, 0, 0)'; // 填充颜色
        this.strokeStyle = 'rgba(0, 0, 0, 1)'; // 描边颜色
        this.playYard  = PLAY_ZONE ; // 活动区域
        this.m = 1; // 质量
        this.dead = false; // 为true证明可以清理了
    }

    move(freq = 1) {
        // 是否可以自由移动
        // if (this.free) {
            // let bounds = this.getBounds();
            //
            //
            // if (this.x + this.vx >= this.playYard[2]) {
            //     this.vx = -this.vx;
            //     this.ax = -this.ax;
            //     this.x = this.playYard[2]; // 立刻退回区域内, 暂时不按原路径退回
            // }
            // if (this.x + this.vx <= this.playYard[0]) {
            //     this.vx = -this.vx;
            //     this.ax = -this.ax;
            //     this.x = this.playYard[0]; // 立刻退回区域内, 暂时不按原路径退回
            // }
            // if (this.y + this.vy >= this.playYard[3]) {
            //     this.vy = -this.vy;
            //     this.ay = -this.ay;
            //     this.y = this.playYard[3]; // 立刻退回区域内, 暂时不按原路径退回
            // }
            // if (this.y + this.vy <= this.playYard[1]) {
            //     this.vy = -this.vy;
            //     this.ay = -this.ay;
            //     this.y = this.playYard[1]; // 立刻退回区域内, 暂时不按原路径退回
            // }
            // 加速度
            this.vx += this.ax / freq;
            this.vy += this.ay / freq;
            // 摩擦力
            this.vx *= 1 - this.f / freq;
            this.vy *= 1 - this.f / freq;
            // 移动
            this.x += this.vx / freq;
            this.y += this.vy / freq;
        // }
    }

    draw() {/**/}
    getBounds() {/**/}
    destory() {/**/}
    action() {/**/}
}
