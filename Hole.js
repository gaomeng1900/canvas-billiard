/**
 * 球洞
 * - 一个黑色的圆
 * - 位置固定
 * - 记录自己吃掉了谁
 * @author Simon
 * @create 2016-08-12
 */

class Hole extends Base {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }

    draw(ct) {
        ct.save();
        ct.translate(this.x, this.y);
        ct.rotate(this.rotate);
        ct.scale(this.scale, this.scale);

        ct.beginPath();
        ct.arc(0, 0, this.radius, 0, Math.PI*2, true);
        ct.closePath();

        // ct.lineWidth = this.lineWidth;
        // ct.strokeStyle = this.strokeStyle;
        // ct.stroke();

        let radgrad = ct.createRadialGradient(-this.radius/2, -this.radius/2, this.radius * 2, -this.radius * 0.8, -this.radius * 0.8, 7);
        radgrad.addColorStop(0, '#616161');
        // radgrad.addColorStop(0.1, 'rgba(0,0,0,0)');
        // radgrad.addColorStop(0.5, 'rgba(0,0,0,0.1)');
        // radgrad.addColorStop(0.7, 'rgba(0,0,0,0.3)');
        // radgrad.addColorStop(0.85, 'rgba(0,0,0,0.6)');
        radgrad.addColorStop(1, '#212121');
        ct.fillStyle = radgrad;
        ct.fill();

        let radgrad1 = ct.createRadialGradient(0, 0, this.radius, 0, 0, 3);
        radgrad1.addColorStop(0, 'rgba(0,0,0,0.3)');
        radgrad1.addColorStop(0.7, 'rgba(0,0,0,0.1)');
        radgrad1.addColorStop(1, 'rgba(0,0,0,0)');
        ct.fillStyle = radgrad1;
        ct.fill();

        ct.restore();

        // 阴影
    }

    move() {};

    getBounds() {
        return {
            type: 'arc',
            x: this.x,
            y: this.y,
            radius: this.radius,
        }
    }
}
