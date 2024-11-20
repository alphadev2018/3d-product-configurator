import { h, FunctionComponent } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import { useSignal } from '@preact/signals';
import * as THREE from 'three';

import { useApp } from '../../contexts/app';

const ModelViewer: FunctionComponent = () => {
  const { color } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const scene = useSignal(new THREE.Scene());
  const camera = useSignal(new THREE.PerspectiveCamera(75, 1, 0.1, 1000));
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;

    renderer.current = new THREE.WebGLRenderer({ antialias: true });
    renderer.current.setSize(width, height);
    ref.current.appendChild(renderer.current.domElement);

    camera.value.aspect = width / height;
    camera.value.updateProjectionMatrix();
    camera.value.position.z = 5; // Fixed camera position

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: color.value });
    const cube = new THREE.Mesh(geometry, material);
    cubeRef.current = cube;

    scene.value.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.current!.render(scene.value, camera.value);
    };
    animate();

    return () => {
      renderer.current?.dispose();
    };
  }, []);

  return <div ref={ref} style={{ width: '100%', height: '400px' }} />;
};

export default ModelViewer;
