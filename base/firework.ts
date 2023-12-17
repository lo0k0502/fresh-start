interface DrawInfo {
  x: number;
  y: number;
  sx: number;
  sy: number;
  size: number;
  r: number;
  g: number;
  b: number;
}

type ParticleInput = Omit<DrawInfo, 'sx' | 'sy' | 'size'>;

class Firework {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  drawInfo: DrawInfo;
  shouldExplode: boolean;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.shouldExplode = false;

    const colorVal = Math.round(0xffffff * Math.random());
    this.drawInfo = {
      x: Math.random() * canvas.width,
      y: canvas.height,
      sx: Math.random() * 3 - 1.5,
      sy: Math.random() * -3 - 3,
      size: Math.random() * 2 + 1,
      r: colorVal >> 16,
      g: (colorVal >> 8) & 255,
      b: colorVal & 255,
    };
  }

  update() {
    switch (true) {
      case this.drawInfo.sy >= -2:
      case this.drawInfo.y <= 100:
      case this.drawInfo.x <= 0:
      case this.drawInfo.x >= this.canvas.width:
        this.shouldExplode = true;
        break;

      default:
        this.drawInfo.sy += 0.01;
    }

    this.drawInfo.x += this.drawInfo.sx;
    this.drawInfo.y += this.drawInfo.sy;

    const { x, y, size, r, g, b } = this.drawInfo;
    this.ctx.fillStyle = `rgb(${r},${g},${b})`;
    this.ctx.beginPath();
    this.ctx.arc(x, y, size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

class Particle {
  ctx: CanvasRenderingContext2D;
  drawInfo: DrawInfo;
  life: number;
  constructor(ctx: CanvasRenderingContext2D, particleInput: ParticleInput) {
    this.ctx = ctx;
    this.life = 100;
    this.drawInfo = {
      ...particleInput,
      sx: Math.random() * 3 - 1.5,
      sy: Math.random() * 3 - 1.5,
      size: Math.random() * 2 + 1,
    };
  }

  update() {
    this.drawInfo.x += this.drawInfo.sx;
    this.drawInfo.y += this.drawInfo.sy;
    this.life -= 1;

    const { x, y, size, r, g, b } = this.drawInfo;
    this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.life / 100})`;
    this.ctx.beginPath();
    this.ctx.arc(x, y, size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

export { Firework, Particle };
