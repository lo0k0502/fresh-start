import type { Star } from '../types/stars.ts';
import { random } from '../utils/common.ts';

const starAmount = 1000;

const starColors = ['255, 255, 255'];

const magnitudeCardinal = 0.2;
const maxMagnitude = 8;

const minBlinkDuration = 50;
const maxBlinkDuration = 200;
const minBlinkDelay = 500;
const maxBlinkDelay = 2000;

const minSpeed = 0;
const maxSpeed = 0;

const resetBlinkCounters = (star: Star) => {
  const blinkBaseDuration = Math.floor(Math.random() * (maxBlinkDuration - minBlinkDuration) + minBlinkDuration);

  star.blinkBaseDuration = blinkBaseDuration;
  star.blinkDurationCount = blinkBaseDuration;
  star.blinkDelayCount = Math.floor(Math.random() * (maxBlinkDelay - minBlinkDelay) + minBlinkDelay);
};

export const getStars = async () => {
  const jsonPath = './data/stars.json';
  const jsonImportPath = '../data/stars.json';

  try {
    await Deno.stat(jsonPath);

    const stars = (await import(jsonImportPath, { with: { type: 'json' } })).default;

    return stars;
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) throw error;
  }

  const stars = Array.from({ length: starAmount }, () => {
    return {
      x: Math.random(),
      y: Math.random(),
      radius: (Math.floor(Math.random() * maxMagnitude) + 1) * magnitudeCardinal,
      blinkBaseDuration: 0,
      blinkDurationCount: 0,
      blinkDelayCount: 0,
      color: starColors[~~(random(0, starColors.length))],
      xVelocity: random(minSpeed, maxSpeed),
      yVelocity: random(minSpeed, maxSpeed),
    } as Star;
  });

  await Deno.writeTextFile(jsonPath, JSON.stringify(stars));

  return stars;
};

export class StarrySky {
  constructor(
    private stars: Star[],
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
  ) {}

  render() {
    const wHeight = window.innerHeight;
    const wWidth = window.innerWidth;

    this.canvas.width = wWidth;
    this.canvas.height = wHeight;

    for (const star of this.stars) {
      star.x *= this.canvas.width;
      star.y *= this.canvas.height;

      resetBlinkCounters(star);

      this.#draw(star);
    }

    this.#startAnimation(this.stars);
  }

  #startAnimation(stars: Star[]) {
    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (const star of stars) {
        star.x += star.xVelocity;
        star.y -= star.yVelocity;

        const isOffScreen = star.x > this.canvas.width + star.radius || star.y > this.canvas.height + star.radius;
        if (isOffScreen) this.#resetStar(star);

        this.#draw(star);
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  #draw(star: Star) {
    let alpha = 1;
    if (!star.blinkDelayCount && star.blinkDurationCount) {
      const halfBaseDuration = star.blinkBaseDuration / 2;
      const percentage = Math.abs(star.blinkDurationCount - halfBaseDuration) / halfBaseDuration * 0.8;
      alpha = percentage + 0.2;
    }

    this.ctx.fillStyle = `rgba(${star.color}, ${alpha})`;

    this.ctx.beginPath();
    this.ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI, false);
    this.ctx.fill();

    if (!star.blinkDelayCount && !star.blinkDurationCount) return resetBlinkCounters(star);
    if (!star.blinkDelayCount) return star.blinkDurationCount--;

    star.blinkDelayCount--;
  }

  #resetStar(star: Star) {
    const fromLeft = random(0, 1) > 0.5;

    star.x = fromLeft ? -star.radius : random(0, this.canvas.width);
    star.y = fromLeft ? random(0, this.canvas.height) : this.canvas.height + star.radius;
  }
}
