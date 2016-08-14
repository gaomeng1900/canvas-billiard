/**
 * 桌面背景
 */

class Background extends Base {
    constructor() {
        super();
    }

    draw(ct) {
        let gap = 10;
        ct.save();

        // 桌边缘
        ct.beginPath();
        ct.moveTo(PLAY_ZONE[0], PLAY_ZONE[1] - HOLE_RADIUS - gap);

        ct.lineTo(PLAY_ZONE[2], PLAY_ZONE[1] - HOLE_RADIUS - gap);
        ct.arc(PLAY_ZONE[2], PLAY_ZONE[1], HOLE_RADIUS + gap, -Math.PI/2, 0, false);

        ct.lineTo(PLAY_ZONE[2] + HOLE_RADIUS + gap, PLAY_ZONE[3]);
        ct.arc(PLAY_ZONE[2], PLAY_ZONE[3], HOLE_RADIUS + gap, 0, Math.PI/2, false);

        ct.lineTo(PLAY_ZONE[0], PLAY_ZONE[3] + HOLE_RADIUS + gap);
        ct.arc(PLAY_ZONE[0], PLAY_ZONE[3], HOLE_RADIUS + gap, Math.PI/2, Math.PI, false);

        ct.lineTo(PLAY_ZONE[0] - HOLE_RADIUS - gap, PLAY_ZONE[1]);
        ct.arc(PLAY_ZONE[0], PLAY_ZONE[1], HOLE_RADIUS + gap, Math.PI, -Math.PI/2, false);

        ct.closePath()
        ct.fillStyle = '#5D4037';
        ct.fill();

        // 桌面
        ct.beginPath();
        ct.fillStyle = '#388E3C';
        ct.fillRect(PLAY_ZONE[0],
                    PLAY_ZONE[1],
                    PLAY_ZONE[2] - PLAY_ZONE[0],
                    PLAY_ZONE[3] - PLAY_ZONE[1]);

        ct.restore();
    }
}
