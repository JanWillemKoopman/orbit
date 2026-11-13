'use client'

import { useEffect, useRef, useState } from 'react'

// Een cover die langzaam beweegt, als een foto in slow motion. De foto zelf blijft een gewone <img>; daaroverheen
// tekent een WebGL-canvas dezelfde foto met beweging erin. Lukt dat niet (geen WebGL, of de bezoeker wil minder
// beweging), dan blijft de foto staan zoals hij is.
//
// De scène 'astronaut' (public/images/cover-astronaut.webp):
// - door het raam drijft het asteroïdenveld naar de kijker toe en vliegen losse rotsblokken voorbij;
// - in de cockpit spatten vonken, pulseren de limegroene lampjes en deint het schip mee met het manoeuvreren.
// De astronaut zelf staat stil. Masker en rotsblokken komen uit tools/levende-cover/astronaut.py.

const HULP = '/images/cover-astronaut'

const VERTEX = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

// Alle posities staan in 'hoogtes': x loopt van 0 tot 2, y van 0 tot 1 (de foto is 2:1), y naar beneden.
const FRAGMENT = `
precision highp float;
uniform sampler2D uFoto, uMasker, uRotsen;
uniform float uT;
uniform vec2 uSchaal;
varying vec2 vUv;

const vec2 VLUCHT = vec2(1.150, 0.361); // het punt in het raam waar de rotsen vandaan komen
const vec2 VONK = vec2(0.3236, 0.124);  // de vonkenregen linksboven
const vec3 LIME = vec3(0.737, 1.0, 0.184);

float hash(float n) { return fract(sin(n * 127.1) * 43758.5453); }
float ruis(float x) { float i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f); return mix(hash(i), hash(i + 1.0), f); }
vec3 foto(vec2 p) { return texture2D(uFoto, vec2(p.x * 0.5, p.y)).rgb; }
vec3 masker(vec2 p) { return texture2D(uMasker, vec2(p.x * 0.5, p.y)).rgb; }

void main() {
  // Uitsnede zoals object-fit: cover, daarna het deinen van het schip: iets ingezoomd, traag schuivend en rollend.
  vec2 uv = (vUv - 0.5) * uSchaal + 0.5;
  vec2 deining = vec2(sin(uT * 0.41) + 0.5 * sin(uT * 0.23 + 1.3), cos(uT * 0.33) + 0.5 * sin(uT * 0.19)) * 0.0035;
  float rol = sin(uT * 0.27) * 0.004;
  vec2 c = (uv - 0.5) * vec2(2.0, 1.0) * 0.972;
  c = mat2(cos(rol), -sin(rol), sin(rol), cos(rol)) * c;
  vec2 p = c + vec2(1.0, 0.5) + deining;

  vec3 m = masker(p);
  float raam = m.r;

  // De ruimte ligt ver weg en beweegt dus anders mee dan de cockpit.
  vec2 q = p - deining * 1.5 * raam;

  // Het asteroïdenveld drijft vanuit het vluchtpunt naar buiten. Twee verschuivingen die een halve ronde uit
  // elkaar lopen en in elkaar overvloeien: zo gaat de beweging eindeloos door zonder dat het beeld wegloopt.
  float a = fract(uT / 9.0), b = fract(a + 0.5);
  vec2 v = q - VLUCHT;
  vec2 oa = v * 0.09 * (a - 0.5) * raam, ob = v * 0.09 * (b - 0.5) * raam;
  oa *= masker(q - oa).r; ob *= masker(q - ob).r;
  vec3 kleur = mix(foto(q - oa), foto(q - ob), abs(2.0 * a - 1.0));

  // Losse rotsblokken: klein en scherp in de verte, groter, sneller en vager naarmate ze dichterbij komen.
  for (int i = 0; i < 7; i++) {
    float fi = float(i);
    float s1 = hash(fi + 1.0), s2 = hash(fi + 11.0), s3 = hash(fi + 23.0);
    float t = fract(uT / mix(16.0, 30.0, s2) + s1 + fi * 0.37);
    float hoek = mix(-0.8, 0.55, s3);
    vec2 r = vec2(cos(hoek), sin(hoek));
    vec2 midden = VLUCHT + r * (0.04 + 0.95 * pow(t, 1.6));
    float grootte = mix(0.035, 0.06, s1) * (0.5 + 3.0 * t);
    vec2 l = q - midden;
    vec2 loc = vec2(dot(l, r), dot(l, vec2(-r.y, r.x))) / grootte;
    if (abs(loc.x) < 1.0 && abs(loc.y) < 1.0) {
      vec2 st = vec2((floor(s2 * 3.999) + loc.x * 0.5 + 0.5) / 4.0, (loc.y * 0.5 + 0.5) * 0.5);
      vec4 rots = mix(texture2D(uRotsen, st), texture2D(uRotsen, st + vec2(0.0, 0.5)), smoothstep(0.3, 0.75, t) * 0.75);
      float zicht = smoothstep(0.0, 0.1, t) * (1.0 - smoothstep(0.92, 1.0, t));
      kleur = mix(kleur, rots.rgb * mix(0.8, 1.15, t), rots.a * zicht * raam);
    }
  }

  // Vonken: korte strepen die uit de vonkenregen wegschieten, afremmen, zakken en doven.
  float vonken = 0.0;
  for (int i = 0; i < 12; i++) {
    float fi = float(i);
    float s1 = hash(fi + 3.0), s2 = hash(fi + 17.0), s3 = hash(fi + 31.0);
    float tt = uT / mix(2.4, 5.0, s1) + s2;
    float t = fract(tt);
    float hoek = mix(-0.9, 2.3, hash(fi + floor(tt) * 7.3 + 5.0));
    vec2 r = vec2(cos(hoek), sin(hoek));
    vec2 kop = VONK + r * mix(0.035, 0.085, s3) * (1.0 - pow(1.0 - t, 2.2)) + vec2(0.0, 0.02) * t * t;
    vec2 staart = kop - r * mix(0.006, 0.016, s3) * (1.0 - t * 0.5);
    vec2 pa = p - staart, ba = kop - staart;
    float d = length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0));
    vonken += smoothstep(0.0022, 0.0006, d) * pow(1.0 - t, 1.5) * smoothstep(0.0, 0.08, t);
  }
  kleur += vec3(vonken) * 0.9;
  // Het licht van de vonken flakkert over de panelen eromheen.
  vec2 dv = p - VONK;
  kleur += kleur * exp(-dot(dv, dv) / 0.02) * (ruis(uT * 2.2) - 0.5) * 0.7;

  // Lampjes: elk lampje dimt en gloeit op zijn eigen moment.
  float puls = smoothstep(0.15, 0.85, 0.5 + 0.5 * sin(uT * 1.1 + p.x * 7.0 + p.y * 4.0));
  kleur *= 1.0 - m.b * 0.45 * (1.0 - puls);
  kleur += LIME * m.g * 0.22 * puls;

  gl_FragColor = vec4(kleur, 1.0);
}`

function laad(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export function LevendeCover({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [levend, setLevend] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) return

    let gestopt = false
    let frame = 0
    let opruimen = () => {}

    Promise.all([laad(src), laad(`${HULP}/masker.png`), laad(`${HULP}/rotsen.png`)]).then((beelden) => {
      if (gestopt) return

      const shader = (type: number, bron: string) => {
        const s = gl.createShader(type)!
        gl.shaderSource(s, bron)
        gl.compileShader(s)
        return s
      }
      const programma = gl.createProgram()!
      gl.attachShader(programma, shader(gl.VERTEX_SHADER, VERTEX))
      gl.attachShader(programma, shader(gl.FRAGMENT_SHADER, FRAGMENT))
      gl.linkProgram(programma)
      if (!gl.getProgramParameter(programma, gl.LINK_STATUS)) return
      gl.useProgram(programma)

      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
      const aPos = gl.getAttribLocation(programma, 'aPos')
      gl.enableVertexAttribArray(aPos)
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
      beelden.forEach((beeld, i) => {
        gl.activeTexture(gl.TEXTURE0 + i)
        gl.bindTexture(gl.TEXTURE_2D, gl.createTexture())
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, beeld)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.uniform1i(gl.getUniformLocation(programma, ['uFoto', 'uMasker', 'uRotsen'][i]), i)
      })
      const uT = gl.getUniformLocation(programma, 'uT')
      const uSchaal = gl.getUniformLocation(programma, 'uSchaal')
      const verhouding = beelden[0].naturalWidth / beelden[0].naturalHeight

      const pasAan = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const b = Math.max(1, Math.round(canvas.clientWidth * dpr))
        const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
        if (canvas.width !== b || canvas.height !== h) {
          canvas.width = b
          canvas.height = h
          gl.viewport(0, 0, b, h)
        }
        const vak = b / h
        gl.uniform2f(uSchaal, Math.min(1, vak / verhouding), Math.min(1, verhouding / vak))
      }

      // De klok loopt alleen terwijl de cover in beeld is, zodat de beweging daarna verdergaat waar hij was.
      let tijd = 0
      let vorige = 0
      let inBeeld = true
      const teken = (nu: number) => {
        frame = 0
        if (vorige) tijd += Math.min(nu - vorige, 100) / 1000
        vorige = nu
        pasAan()
        gl.uniform1f(uT, tijd)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        setLevend(true)
        plan()
      }
      const plan = () => {
        if (!frame && inBeeld && !document.hidden && !gestopt) frame = requestAnimationFrame(teken)
        else if (!inBeeld || document.hidden) vorige = 0
      }
      const kijker = new IntersectionObserver(([e]) => { inBeeld = e.isIntersecting; plan() })
      kijker.observe(canvas)
      const verlies = (e: Event) => { e.preventDefault(); gestopt = true; setLevend(false) }
      document.addEventListener('visibilitychange', plan)
      canvas.addEventListener('webglcontextlost', verlies)
      opruimen = () => {
        kijker.disconnect()
        document.removeEventListener('visibilitychange', plan)
        canvas.removeEventListener('webglcontextlost', verlies)
      }
      plan()
    }).catch(() => {})

    return () => {
      gestopt = true
      cancelAnimationFrame(frame)
      opruimen()
    }
  }, [src])

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" loading="eager" />
      <canvas ref={canvasRef} className={levend ? 'levende-cover is-levend' : 'levende-cover'} aria-hidden="true" />
    </>
  )
}
