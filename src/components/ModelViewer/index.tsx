import { h, FunctionComponent } from 'preact';
import { useRef, useEffect, useCallback } from 'preact/hooks';
import { useSignal } from '@preact/signals';
import * as THREE from 'three';

import { useApp } from '../../contexts/app';

const rotationSpeed = 0.025;

const ModelViewer: FunctionComponent = () => {
  const { color, zoom, rotationX, rotationY, setRotationX, setRotationY } =
    useApp();
  const ref = useRef<HTMLDivElement>(null);
  const scene = useSignal(new THREE.Scene());
  const camera = useSignal(new THREE.PerspectiveCamera(75, 1, 0.1, 1000));
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);

  // Function to handle window resize
  const handleResize = useCallback(() => {
    if (!ref.current || !renderer.current) return;

    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;

    renderer.current.setSize(width, height);
    camera.value.aspect = width / height;
    camera.value.updateProjectionMatrix();
  }, []);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    isDragging.current = true;
    previousMousePosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging.current) return;

    const deltaMove = {
      x: event.clientX - previousMousePosition.current.x,
      y: event.clientY - previousMousePosition.current.y,
    };

    setRotationY(rotationY.value + deltaMove.x * rotationSpeed);
    setRotationX(rotationX.value + deltaMove.y * rotationSpeed);

    previousMousePosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseOut = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    isDragging.current = true;
    previousMousePosition.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }, []);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!isDragging.current) return;

    const deltaMove = {
      x: event.touches[0].clientX - previousMousePosition.current.x,
      y: event.touches[0].clientY - previousMousePosition.current.y,
    };

    setRotationY(rotationY.value + deltaMove.x * rotationSpeed);
    setRotationX(rotationX.value + deltaMove.y * rotationSpeed);

    previousMousePosition.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

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
      renderer.current?.render(scene.value, camera.value);
    };
    animate();

    ref.current.addEventListener('mousedown', handleMouseDown);
    ref.current.addEventListener('mousemove', handleMouseMove);
    ref.current.addEventListener('mouseup', handleMouseUp);
    ref.current.addEventListener('mouseout', handleMouseOut);
    ref.current.addEventListener('touchstart', handleTouchStart);
    ref.current.addEventListener('touchmove', handleTouchMove);
    ref.current.addEventListener('touchend', handleTouchEnd);

    window.addEventListener('resize', handleResize);

    return () => {
      renderer.current?.dispose();
      ref.current?.removeEventListener('mousedown', handleMouseDown);
      ref.current?.removeEventListener('mousemove', handleMouseMove);
      ref.current?.removeEventListener('mouseup', handleMouseUp);
      ref.current?.removeEventListener('mouseout', handleMouseOut);
      ref.current?.removeEventListener('touchstart', handleTouchStart);
      ref.current?.removeEventListener('touchmove', handleTouchMove);
      ref.current?.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    scene.value.children.forEach((child) => {
      if ((child as THREE.Mesh).isMesh) {
        ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).color.set(
          color.value,
        );
      }
    });
  }, [color.value]);

  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.scale.set(zoom.value, zoom.value, zoom.value);
    }
  }, [zoom.value]);

  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = rotationX.value;
      cubeRef.current.rotation.y = rotationY.value;
    }
  }, [rotationX.value, rotationY.value]);

  return <div ref={ref} style={{ width: '100%', height: '400px' }} />;
};

export default ModelViewer;
