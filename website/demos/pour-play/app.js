import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.querySelector('#bean-scene');
const stage = document.querySelector('.hero-stage');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && stage && !reducedMotion) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(stage.clientWidth, stage.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, stage.clientWidth / stage.clientHeight, .1, 100);
  camera.position.z = 10;
  scene.add(new THREE.AmbientLight(0xffe5c7, 2.1));
  const key = new THREE.DirectionalLight(0xffffff, 3.1); key.position.set(4, 5, 7); scene.add(key);
  const fill = new THREE.PointLight(0xb77c4e, 24, 20); fill.position.set(-4, -2, 4); scene.add(fill);

  const beanGeometry = new THREE.SphereGeometry(.36, 32, 24);
  beanGeometry.scale(1.18, .7, .48);
  const beans = [];
  const materials = [0x51301f, 0x70442b, 0x3e251a, 0x8b5b39].map(color => new THREE.MeshStandardMaterial({ color, roughness: .48, metalness: .02 }));
  for (let i = 0; i < 24; i++) {
    const bean = new THREE.Mesh(beanGeometry, materials[i % materials.length]);
    const angle = i * 2.399;
    const radius = 1.25 + (i % 5) * .28;
    bean.position.set(Math.cos(angle) * radius * 1.25, Math.sin(angle) * radius * .85, (i % 6 - 2.5) * .36);
    bean.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    bean.userData = { speed: .25 + Math.random() * .45, phase: Math.random() * Math.PI * 2, baseY: bean.position.y };
    scene.add(bean); beans.push(bean);
  }
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.65, .008, 8, 160), new THREE.MeshBasicMaterial({ color: 0x987354, transparent: true, opacity: .4 }));
  ring.rotation.x = 1.15; ring.rotation.y = -.2; scene.add(ring);
  let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
  stage.addEventListener('pointermove', e => {
    const rect = stage.getBoundingClientRect();
    targetX = ((e.clientX - rect.left) / rect.width - .5) * .5;
    targetY = ((e.clientY - rect.top) / rect.height - .5) * .3;
  });
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    pointerX += (targetX - pointerX) * .035; pointerY += (targetY - pointerY) * .035;
    beans.forEach(bean => {
      bean.rotation.x += .002 * bean.userData.speed;
      bean.rotation.y += .004 * bean.userData.speed;
      bean.position.y = bean.userData.baseY + Math.sin(t * bean.userData.speed + bean.userData.phase) * .11;
    });
    ring.rotation.z = t * .055;
    scene.rotation.y = pointerX; scene.rotation.x = pointerY;
    renderer.render(scene, camera);
  }
  animate();
  new ResizeObserver(() => {
    const w = stage.clientWidth, h = stage.clientHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
  }).observe(stage);
}

const revealTargets = document.querySelectorAll('.manifesto-content,.collection-head,.product,.ritual-image,.ritual-copy,.closing h2');
revealTargets.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .14 });
  revealTargets.forEach(el => observer.observe(el));
} else revealTargets.forEach(el => el.classList.add('visible'));

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav nav');
menuButton?.addEventListener('click', () => nav?.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  document.documentElement.style.setProperty('--scroll-progress', Math.min(current / (document.body.scrollHeight - innerHeight), 1));
  lastScroll = current;
}, { passive: true });