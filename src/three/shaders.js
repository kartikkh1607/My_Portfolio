// Point sprites are sized in world units: gl_PointSize = size * uScale / depth,
// where uScale is drawing-buffer pixels per world unit at distance 1.
// Everything is additive (blending set in Scene.jsx), so glow stacks.

// Ambient field. Drift and twinkle come from uTime, which the scene freezes
// for reduced motion.
export const fieldVert = /* glsl */ `
uniform float uTime;
uniform float uScale;
uniform float uFade;
uniform float uDim;
uniform float uDrift;
uniform float uMaxPx;
uniform vec4 uGlow;
attribute vec3 aColor;
attribute float aSize;
attribute float aAlpha;
attribute float aSeed;
attribute float aGroup;
varying vec3 vColor;
varying float vAlpha;

void main() {
  float s = aSeed * 6.2831;
  vec3 p = position + uDrift * vec3(
    sin(uTime * 0.21 + s),
    sin(uTime * 0.17 + s * 2.7),
    cos(uTime * 0.19 + s * 1.9)
  );
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  vec4 oh = vec4(equal(vec4(aGroup), vec4(0.0, 1.0, 2.0, 3.0)));
  float glow = dot(uGlow, oh);
  float anyGlow = max(max(uGlow.x, uGlow.y), max(uGlow.z, uGlow.w));
  float isHaze = step(-1.5, aGroup);

  float depth = max(-mv.z, 0.001);
  float px = aSize * uScale * (1.0 + glow * 0.6) / depth;
  gl_PointSize = clamp(px, 1.5, uMaxPx);

  float twinkle = 0.78 + 0.22 * sin(uTime * (0.5 + aSeed) + aSeed * 40.0);
  float near = smoothstep(0.3, 1.6, depth); // fade points that brush the camera
  float tiny = clamp(px / 1.5, 0.15, 1.0);    // sub-pixel points dim instead of shimmering
  float focus = mix(1.0, 1.0 + glow * 2.2, isHaze) * mix(1.0, 0.55, anyGlow * isHaze * (1.0 - glow));

  vColor = mix(aColor, vec3(1.0), glow * 0.2);
  vAlpha = aAlpha * uFade * uDim * near * tiny * twinkle * focus;
}
`

export const fieldFrag = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d2 = dot(c, c) * 4.0;
  if (d2 > 1.0) discard;
  float a = (exp(-d2 * 5.0) * 0.7 + exp(-d2 * 28.0) * 0.5) * (1.0 - d2) * vAlpha;
  gl_FragColor = vec4(vColor * a, a);
}
`

// The 98 real map points: a solid core the size of the SVG dot plus a halo.
// aLit: 1 normal, < 1 dimmed, > 1 highlighted.
export const mapVert = /* glsl */ `
uniform float uScale;
uniform float uSize;
uniform float uMaxPx;
attribute vec3 aColor;
attribute float aLit;
varying vec3 vColor;
varying float vLit;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  float grow = 1.0 + clamp(aLit - 1.0, 0.0, 1.5) * 0.45;
  // Capped near the hero size: up close the points stay stars, not blobs.
  gl_PointSize = clamp(uSize * uScale / max(-mv.z, 0.001), 2.0, uMaxPx) * grow;
  vColor = aColor;
  vLit = aLit;
}
`

export const mapFrag = /* glsl */ `
uniform float uFade;
varying vec3 vColor;
varying float vLit;

void main() {
  float r = length(gl_PointCoord - 0.5) * 2.0;
  if (r > 1.0) discard;
  float core = smoothstep(0.33, 0.27, r);
  float halo = exp(-r * r * 7.0) * 0.6 * (1.0 - r);
  float hot = clamp(vLit - 1.0, 0.0, 1.0);
  vec3 col = mix(vColor, vec3(1.0), core * hot * 0.5);
  float a = (core * 0.9 + halo * (0.8 + hot)) * clamp(vLit, 0.0, 1.8) * uFade;
  gl_FragColor = vec4(col * a, a);
}
`

// Query beams: one line per neighbour, from the query (aT = 0) to the
// neighbour (aT = 1). Each line grows out from the query, then a bright
// pulse runs along it on a loop. uPulse = 0 draws them still.
export const beamVert = /* glsl */ `
attribute float aT;
attribute float aK;
varying float vT;
varying float vK;

void main() {
  vT = aT;
  vK = aK;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const beamFrag = /* glsl */ `
uniform float uProg;
uniform float uAlpha;
uniform float uPulse;
uniform vec3 uFrom;
uniform vec3 uTo;
varying float vT;
varying float vK;

void main() {
  float start = vK * 0.08;
  float grow = clamp((uProg - start) / 0.5, 0.0, 1.0);
  if (vT > grow) discard;
  float ph = mod(uProg - start - 0.5, 2.2) / 1.2;
  float pulse = uPulse * step(start + 0.5, uProg) * exp(-pow((vT - ph) * 7.0, 2.0));
  float a = (0.45 + 0.25 * (1.0 - vT) + pulse * 1.6) * uAlpha;
  vec3 col = mix(uFrom, uTo, vT);
  gl_FragColor = vec4(col * a, a);
}
`

// Beam heads and the query marker. aAlpha per sprite, aRing adds a ring
// (used for the query point).
export const sparkVert = /* glsl */ `
uniform float uScale;
uniform float uMaxPx;
attribute float aSize;
attribute float aAlpha;
attribute float aRing;
varying float vAlpha;
varying float vRing;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(aSize * uScale / max(-mv.z, 0.001), 2.0, uMaxPx);
  vAlpha = aAlpha;
  vRing = aRing;
}
`

export const sparkFrag = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
varying float vRing;

void main() {
  float r = length(gl_PointCoord - 0.5) * 2.0;
  if (r > 1.0) discard;
  float core = exp(-r * r * 18.0);
  float halo = exp(-r * r * 4.0) * 0.45;
  float ring = vRing * smoothstep(0.08, 0.0, abs(r - 0.72)) * 0.9;
  float a = (core + halo + ring) * (1.0 - r * 0.3) * vAlpha;
  vec3 col = mix(uColor, vec3(1.0), core * 0.7);
  gl_FragColor = vec4(col * a, a);
}
`
