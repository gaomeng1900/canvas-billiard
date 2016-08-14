/**
 * 桌球
 * @author Simon
 * @create 2016-08-12
 */

class Ball extends Base {
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

        // 投影
        ct.shadowOffsetX = 1;
        ct.shadowOffsetY = 1;
        ct.shadowBlur = 4;
        ct.shadowColor = "rgba(0, 0, 0, 0.2)";

        // 边框
        // ct.strokeStyle = this.strokeStyle;
        // ct.lineWidth = this.lineWidth;
        // ct.stroke();

        // 基本颜色
        ct.fillStyle = this.fillStyle;
        ct.fill();

        // 阴影
        let radgrad = ct.createRadialGradient(-this.radius/2, -this.radius/2, this.radius * 2, -this.radius/3, -this.radius/3, 3);
        radgrad.addColorStop(0, 'rgba(255,255,255,0)');
        radgrad.addColorStop(0.1, 'rgba(255,255,255,0)');
        radgrad.addColorStop(0.5, 'rgba(255,255,255,0.1)');
        radgrad.addColorStop(0.7, 'rgba(255,255,255,0.3)');
        radgrad.addColorStop(0.85, 'rgba(255,255,255,0.6)');
        radgrad.addColorStop(1, 'rgba(255,255,255,0.8)');
        ct.fillStyle = radgrad;
        ct.fill();

        ct.restore();

        // 显示速度辅助线
        // ct.save();
        // ct.translate(this.x, this.y);
        // ct.lineWidth = 1;
        // ct.strokeStyle = 'red';
        // ct.beginPath();
        // ct.moveTo(0, 0);
        // ct.lineTo(this.vx * 5, this.vy * 5);
        // ct.stroke();
        // ct.restore();
    }

    destory() {
        this.dead = true;
    }

    getBounds() {
        return {
            type: 'arc',
            x: this.x,
            y: this.y,
            radius: this.radius,
        }
    }
}
