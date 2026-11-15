(() => {
  "use strict";

  const canvas = document.getElementById("coffee-scene");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initCoffeeScene() {
    if (!canvas || !window.THREE) return;
    try {
      const THREE = window.THREE;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
      camera.position.set(0, 0.65, 7.5);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power"
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;

      scene.add(new THREE.HemisphereLight(0xffe9cf, 0x24150d, 2.1));
      const keyLight = new THREE.DirectionalLight(0xffd5a1, 2.8);
      keyLight.position.set(3.5, 5, 5);
      scene.add(keyLight);
      const rimLight = new THREE.PointLight(0xc28c50, 22, 12);
      rimLight.position.set(-3, 1.5, 2.5);
      scene.add(rimLight);

      const group = new THREE.Group();
      scene.add(group);

      const porcelain = new THREE.MeshStandardMaterial({
        color: 0xeee5d8,
        roughness: 0.2,
        metalness: 0.035
      });
      const gold = new THREE.MeshStandardMaterial({
        color: 0xb68b51,
        roughness: 0.24,
        metalness: 0.68
      });
      const espresso = new THREE.MeshStandardMaterial({
        color: 0x32190d,
        roughness: 0.16
      });
      const cremaMaterial = new THREE.MeshStandardMaterial({
        color: 0xc38f52,
        roughness: 0.28
      });

      const cupProfile = [
        new THREE.Vector2(0.52, -0.62),
        new THREE.Vector2(0.6, -0.56),
        new THREE.Vector2(0.73, 0.43),
        new THREE.Vector2(0.78, 0.57),
        new THREE.Vector2(0.74, 0.62),
        new THREE.Vector2(0.68, 0.58),
        new THREE.Vector2(0.64, 0.43)
      ];
      const cup = new THREE.Mesh(new THREE.LatheGeometry(cupProfile, 96), porcelain);
      group.add(cup);

      const handle = new THREE.Mesh(
        new THREE.TorusGeometry(0.38, 0.075, 24, 80, Math.PI * 1.72),
        porcelain
      );
      handle.position.set(0.7, 0.03, 0);
      handle.rotation.z = -0.8;
      group.add(handle);

      const saucer = new THREE.Mesh(
        new THREE.CylinderGeometry(1.03, 1.1, 0.085, 96),
        porcelain
      );
      saucer.position.y = -0.7;
      group.add(saucer);

      const saucerEdge = new THREE.Mesh(
        new THREE.TorusGeometry(0.94, 0.018, 14, 96),
        gold
      );
      saucerEdge.rotation.x = Math.PI / 2;
      saucerEdge.position.y = -0.65;
      group.add(saucerEdge);

      const coffee = new THREE.Mesh(
        new THREE.CylinderGeometry(0.665, 0.665, 0.025, 96),
        espresso
      );
      coffee.position.y = 0.49;
      group.add(coffee);

      const crema = new THREE.Mesh(
        new THREE.TorusGeometry(0.3, 0.018, 12, 64),
        cremaMaterial
      );
      crema.rotation.x = Math.PI / 2;
      crema.position.set(-0.1, 0.507, 0.09);
      group.add(crema);

      const beanMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a2515,
        roughness: 0.38
      });
      const beans = [];
      for (let i = 0; i < 9; i += 1) {
        const bean = new THREE.Mesh(
          new THREE.SphereGeometry(0.09, 20, 14),
          beanMaterial
        );
        bean.scale.set(1.35, 0.72, 0.5);
        bean.userData.phase = (i / 9) * Math.PI * 2;
        bean.userData.radius = 1.38 + (i % 3) * 0.12;
        beans.push(bean);
        group.add(bean);
      }

      const steamMaterial = new THREE.LineBasicMaterial({
        color: 0xf0dfc8,
        transparent: true,
        opacity: 0.32
      });
      const steamLines = [];
      for (let i = 0; i < 3; i += 1) {
        const points = [];
        for (let j = 0; j <= 24; j += 1) {
          const t = j / 24;
          points.push(new THREE.Vector3(
            (i - 1) * 0.2 + Math.sin(t * 5 + i) * 0.07,
            0.62 + t * 1.05,
            Math.cos(t * 4 + i) * 0.025
          ));
        }
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(points),
          steamMaterial.clone()
        );
        group.add(line);
        steamLines.push(line);
      }

      group.rotation.x = -0.08;
      group.rotation.y = -0.22;

      let pointerX = 0;
      let pointerY = 0;
      let targetX = 0;
      let targetY = 0;
      window.addEventListener("pointermove", (event) => {
        targetX = ((event.clientX / window.innerWidth) - 0.5) * 0.34;
        targetY = ((event.clientY / window.innerHeight) - 0.5) * 0.16;
      }, { passive: true });

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        renderer.setSize(rect.width, rect.height, false);
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };
      const observer = new ResizeObserver(resize);
      observer.observe(canvas);
      resize();

      const clock = new THREE.Clock();
      const renderFrame = () => {
        const time = clock.getElapsedTime();
        pointerX += (targetX - pointerX) * 0.035;
        pointerY += (targetY - pointerY) * 0.035;
        group.rotation.y = -0.22 + pointerX + Math.sin(time * 0.42) * 0.045;
        group.rotation.x = -0.08 + pointerY;
        group.rotation.z = Math.sin(time * 0.32) * 0.018;
        group.position.y = reducedMotion ? 0 : Math.sin(time * 0.78) * 0.075;

        beans.forEach((bean) => {
          const phase = bean.userData.phase + (reducedMotion ? 0 : time * 0.12);
          const radius = bean.userData.radius;
          bean.position.set(
            Math.cos(phase) * radius,
            Math.sin(phase * 1.9) * 0.16,
            Math.sin(phase) * 0.46
          );
          bean.rotation.z = phase;
        });

        steamLines.forEach((line, index) => {
          line.position.y = reducedMotion ? 0 : Math.sin(time * 1.15 + index) * 0.035;
          line.material.opacity = reducedMotion ? 0.23 : 0.2 + 0.12 * Math.sin(time + index);
        });
        renderer.render(scene, camera);
        if (!reducedMotion) window.requestAnimationFrame(renderFrame);
      };

      renderFrame();
      if (reducedMotion) observer.disconnect();
    } catch (error) {
      canvas.setAttribute("aria-label", "Decorative coffee scene unavailable in this browser");
      console.warn("Café Bernstein 3D scene could not be initialized.", error);
    }
  }

  function initReveal() {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || reducedMotion) {
      elements.forEach((element) => element.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
  }

  function initMenuFilters() {
    const tabs = document.querySelectorAll(".tab");
    const dishes = document.querySelectorAll(".dish");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((item) => {
          const active = item === tab;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        dishes.forEach((dish) => {
          dish.hidden = tab.dataset.filter !== "all" &&
            dish.dataset.category !== tab.dataset.filter;
        });
      });
      tab.setAttribute("aria-pressed", String(tab.classList.contains("active")));
    });
  }

  function initFavourites() {
    const panel = document.getElementById("favourites");
    const overlay = document.getElementById("overlay");
    const openButton = document.getElementById("favOpen");
    const closeButton = document.getElementById("favClose");
    const count = document.getElementById("favCount");
    const items = document.getElementById("favItems");
    const toast = document.getElementById("toast");
    const saved = [];

    const render = () => {
      count.textContent = String(saved.length);
      items.replaceChildren();
      if (!saved.length) {
        const empty = document.createElement("p");
        empty.textContent = "موارد دلخواهت را به این فهرست اضافه کن.";
        empty.style.cssText = "font-size:11px;color:#817365";
        items.append(empty);
        return;
      }
      saved.forEach((name, index) => {
        const row = document.createElement("div");
        row.className = "fav-item";
        const label = document.createElement("span");
        label.textContent = name;
        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "حذف";
        remove.setAttribute("aria-label", "حذف " + name);
        remove.addEventListener("click", () => {
          saved.splice(index, 1);
          render();
        });
        row.append(label, remove);
        items.append(row);
      });
    };

    const open = () => {
      panel.classList.add("open");
      panel.setAttribute("aria-hidden", "false");
      overlay.classList.add("show");
      closeButton.focus();
    };
    const close = () => {
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
      overlay.classList.remove("show");
      openButton.focus();
    };

    openButton.addEventListener("click", open);
    closeButton.addEventListener("click", close);
    overlay.addEventListener("click", close);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && panel.classList.contains("open")) close();
    });

    document.querySelectorAll(".fav-btn").forEach((button) => {
      button.addEventListener("click", () => {
        saved.push(button.dataset.name);
        render();
        toast.classList.add("show");
        window.setTimeout(() => toast.classList.remove("show"), 1400);
      });
    });
  }

  function initMobileNavigation() {
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("navLinks");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("mobile-open", !expanded);
      toggle.textContent = expanded ? "☰" : "×";
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("mobile-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      });
    });
  }

  initCoffeeScene();
  initReveal();
  initMenuFilters();
  initFavourites();
  initMobileNavigation();
})();