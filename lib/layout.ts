import { apps, eras, skills, ventures, type Category } from '@/data/profile';

// Scene layout, camera keyframes and section highlights. No three.js imports.

export type Vec3 = [number, number, number];

export const CATEGORY_ORDER: Category[] = ['frontend', 'backend', 'cloud', 'security', 'ai'];

export const GROUND_Y = -5;

// mulberry32, so the layout is stable
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}


export const eraPositions: Record<string, Vec3> = {
  ibm: [-46, 9, -40],
  rbc: [-33, 5, -24],
  clarify: [-19, 2, -11],
  rcaf: [0, 0, 0],
  ai: [0, 0, 0],
};

export const flightPath: Vec3[] = [
  [-58, 13, -52],
  eraPositions.ibm,
  eraPositions.rbc,
  eraPositions.clarify,
  [-8, 0.8, -3.5],
  [0, 0, 0],
];


export type Orbit = {
  id: string;
  radius: number;
  tilt: number; // radians about X
  yaw: number; // radians about Y
  phase: number;
  speed: number; // radians / second
  ai: boolean;
};

export const orbits: Orbit[] = apps.map((a, i) => {
  const r = rng(101 + i);
  return {
    id: a.id,
    radius: 4.6 + (i % 4) * 1.25 + r() * 0.4,
    tilt: (r() - 0.5) * 0.9,
    yaw: r() * Math.PI * 2,
    phase: (i / apps.length) * Math.PI * 2,
    speed: 0.05 + (1 / (4.6 + (i % 4) * 1.25)) * 0.22,
    ai: !!a.ai,
  };
});

export function orbitPosition(o: Orbit, t: number, out: Vec3): Vec3 {
  const a = o.phase + t * o.speed;
  // circle in XZ plane
  let x = Math.cos(a) * o.radius;
  let y = 0;
  let z = Math.sin(a) * o.radius;
  // tilt about X
  const ct = Math.cos(o.tilt);
  const st = Math.sin(o.tilt);
  const y1 = y * ct - z * st;
  const z1 = y * st + z * ct;
  y = y1;
  z = z1;
  // yaw about Y
  const cy = Math.cos(o.yaw);
  const sy = Math.sin(o.yaw);
  const x2 = x * cy + z * sy;
  const z2 = -x * sy + z * cy;
  out[0] = x2;
  out[1] = y;
  out[2] = z2;
  return out;
}


export const ventureCenter: Vec3 = [30, 1, -4];
export const venturePositions: Record<string, Vec3> = {
  perus: [27, 3, -8],
  zerotax: [34, -1.5, -2],
  jinx: [28.5, -3, 3],
};
export const ventureSize: Record<string, number> = { perus: 1.0, zerotax: 0.7, jinx: 0.55 };


export type SkillLayout = {
  id: string;
  category: Category;
  level: number;
  star: Vec3; // constellation position
  city: Vec3; // base of the tower in the code-city district
  height: number; // tower height
};

export const categoryCenters: Record<Category, Vec3> = {} as Record<Category, Vec3>;
export const districtCenters: Record<Category, Vec3> = {} as Record<Category, Vec3>;

CATEGORY_ORDER.forEach((c, i) => {
  const a = (i / CATEGORY_ORDER.length) * Math.PI * 2 + 0.35;
  categoryCenters[c] = [Math.cos(a) * 15, (i % 2 ? 3.5 : -2.5) + (i === 4 ? 2 : 0), Math.sin(a) * 15];
  districtCenters[c] = [Math.cos(a) * 10.5, GROUND_Y, Math.sin(a) * 10.5];
});

export const skillLayout: SkillLayout[] = (() => {
  const out: SkillLayout[] = [];
  for (const c of CATEGORY_ORDER) {
    const group = skills.filter((s) => s.category === c);
    const n = group.length;
    const center = categoryCenters[c];
    const district = districtCenters[c];
    const cols = Math.ceil(Math.sqrt(n));
    group.forEach((s, i) => {
      const r = rng(7 + out.length * 13);
      // fibonacci sphere around the cluster centre
      const yy = 1 - (2 * (i + 0.5)) / n;
      const rad = Math.sqrt(1 - yy * yy);
      const th = i * 2.399963 + r() * 0.3;
      const shell = 2.2 + r() * 1.3 + (4 - s.level) * 0.35;
      const star: Vec3 = [
        center[0] + Math.cos(th) * rad * shell,
        center[1] + yy * shell * 0.8,
        center[2] + Math.sin(th) * rad * shell,
      ];
      const col = i % cols;
      const row = Math.floor(i / cols);
      const spacing = 1.35;
      const city: Vec3 = [
        district[0] + (col - (cols - 1) / 2) * spacing,
        GROUND_Y,
        district[2] + (row - (Math.ceil(n / cols) - 1) / 2) * spacing,
      ];
      out.push({ id: s.id, category: c, level: s.level, star, city, height: 0.9 + s.level * 1.25 });
    });
  }
  return out;
})();

export const skillIndex = new Map(skillLayout.map((s, i) => [s.id, i]));

// one camera keyframe per page section

export type Keyframe = {
  pos: Vec3;
  target: Vec3;
  // 0 constellation, 1 city
  morph: number;
  // horizontal shift past the text column (desktop)
  shift: number;
};

const off = (p: Vec3, d: Vec3): Vec3 => [p[0] + d[0], p[1] + d[1], p[2] + d[2]];

export const keyframes: Record<string, Keyframe> = {
  hero: { pos: [0, 9, 44], target: [0, 0, 0], morph: 0, shift: 1.2 },
  platform: { pos: [9, 6, 19], target: [0, 0, 0], morph: 0, shift: 1 },
  ibm: { pos: off(eraPositions.ibm, [7, 3.5, 11]), target: eraPositions.ibm, morph: 0, shift: 1 },
  rbc: { pos: off(eraPositions.rbc, [7, 3.5, 11]), target: eraPositions.rbc, morph: 0, shift: 1 },
  clarify: { pos: off(eraPositions.clarify, [7, 3, 11]), target: eraPositions.clarify, morph: 0, shift: 1 },
  rcaf: { pos: [5, 7, 15], target: [0, 0, 0], morph: 0, shift: 1 },
  ai: { pos: [3.2, 1.6, 7.5], target: [0, 0, 0], morph: 0, shift: 1 },
  ventures: { pos: off(ventureCenter, [-5, 5, 17]), target: ventureCenter, morph: 0, shift: 1 },
  skills: { pos: [0, 16, 24], target: [0, GROUND_Y + 1, 0], morph: 1, shift: 1 },
  contact: { pos: [4, 12, 58], target: [2, 0, 0], morph: 0, shift: 0 },
};

export const sectionHighlights: Record<string, string[]> = {
  platform: ['rap', ...apps.map((a) => a.id)],
  ibm: ['ibm'],
  rbc: ['rbc'],
  clarify: ['clarify'],
  rcaf: ['rcaf', 'rap'],
  ai: ['ai', ...apps.filter((a) => a.ai).map((a) => a.id)],
  ventures: ventures.map((v) => v.id),
};

export const eraIds = eras.map((e) => e.id);
