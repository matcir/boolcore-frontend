import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Smoke({ height = 300, textSize = 100, textY }) {
	const containerRef = useRef(null);

	useEffect(() => {
		let camera, scene, renderer, clock;
		let smokeParticles = [];
		let delta;

		clock = new THREE.Clock();

		const width = containerRef.current.offsetWidth || 700;

		renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(width, height);
		containerRef.current.appendChild(renderer.domElement);

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
		camera.position.z = 1000;
		scene.add(camera);

		// SCRITTA BOOLCORE personalizzata
		const pixelRatio = Math.max(window.devicePixelRatio, 2);
		const canvas = document.createElement('canvas');
		canvas.width = textSize * 5 * pixelRatio;
		canvas.height = textSize * 1.5 * pixelRatio;
		const ctx = canvas.getContext('2d');
		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		ctx.font = `bold ${textSize}px Verdana, Arial, sans-serif`; ctx.fillStyle = '#eaff00';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.strokeStyle = '#000';
		ctx.lineWidth = 8;
		ctx.strokeText('BoolCore', canvas.width / (2 * pixelRatio), canvas.height / (2 * pixelRatio));
		ctx.fillText('BoolCore', canvas.width / (2 * pixelRatio), canvas.height / (2 * pixelRatio));

		const textTexture = new THREE.CanvasTexture(canvas);
		const textGeo = new THREE.PlaneGeometry(textSize * 4, textSize * 1.2);
		const textMaterial = new THREE.MeshLambertMaterial({
			map: textTexture,
			transparent: true,
			opacity: 0.5,
			blending: THREE.AdditiveBlending
		});
		const text = new THREE.Mesh(textGeo, textMaterial);
		text.position.z = 750;
		text.position.y = typeof textY === "number" ? textY : (height / 2 - textSize / 2);
		scene.add(text);

		const light = new THREE.DirectionalLight(0xffffff, 0.5);
		light.position.set(-1, 0, 1);
		scene.add(light);

		const smokeTexture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');
		const smokeMaterial = new THREE.MeshLambertMaterial({ color: 0x00dddd, map: smokeTexture, transparent: true });
		const smokeGeo = new THREE.PlaneGeometry(300, 300);

		for (let p = 0; p < 150; p++) {
			const particle = new THREE.Mesh(smokeGeo, smokeMaterial);
			particle.position.set(Math.random() * width - width / 2, Math.random() * height - height / 2, Math.random() * 1000 - 100);
			particle.rotation.z = Math.random() * 360;
			scene.add(particle);
			smokeParticles.push(particle);
		}

		function animate() {
			delta = clock.getDelta();
			requestAnimationFrame(animate);
			evolveSmoke();
			renderer.render(scene, camera);
		}

		function evolveSmoke() {
			let sp = smokeParticles.length;
			while (sp--) {
				smokeParticles[sp].rotation.z += (delta * 0.5);
			}
		}

		animate();

		return () => {
			// Rimuovi tutti i canvas figli dal container
			if (containerRef.current) {
				while (containerRef.current.firstChild) {
					containerRef.current.removeChild(containerRef.current.firstChild);
				}
			}
			// Rimuovi TUTTI i canvas dal DOM (anche quelli "appesi")
			document.querySelectorAll('canvas').forEach(c => c.remove());
		};
	}, [height, textSize, textY]);

	return (
		<div
			ref={containerRef}
			style={{
				width: "100%",
				height: `${height}px`,
				position: "relative",
				top: 0,
				left: 0,
				pointerEvents: "none",
			}}
		/>
	);
}