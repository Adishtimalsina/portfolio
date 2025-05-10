import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import * as THREE from 'three';
import { isPlatformBrowser } from '@angular/common';
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

@Component({
  selector: 'app-three-d',
  templateUrl: './three-d.component.html',
  styleUrls: ['./three-d.component.css']
})
export class ThreeDComponent implements AfterViewInit {
  @ViewChild('rendererContainer', { static: true }) containerRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const container = this.containerRef.nativeElement;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // const geometry = new THREE.SphereGeometry();
    // const plane = new THREE.PlaneGeometry(5,5);
    // const planeMaterial = new THREE.MeshStandardMaterial({color:'gray', side:THREE.DoubleSide})
    // const material = new THREE.MeshStandardMaterial({ color: 'pink' });
    // const cube = new THREE.Mesh(geometry, material);
    // const base = new THREE.Mesh(plane, planeMaterial)
    // base.rotation.x = -Math.PI/2;
    // base.position.y = -1;
    // scene.add(cube, base);


    const light = new THREE.AmbientLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);

    const orbitController = new OrbitControls(camera, renderer.domElement);

    camera.position.z = 9;

    const animate = function () {
      requestAnimationFrame(animate);
      orbitController.update();
      renderer.render(scene, camera);
    };

    // const load3D =function() {
    //   const loader = new GLTFLoader();
    //    loader.load('./assets/3D-assets/futuristic_room/scene.gltf', (gltf)=>{
    //      scene.add(gltf.scene)
    //    }, undefined, (error)=>{
    //      console.log("error loading gltf", error)
    //    })
    // }
    window.addEventListener('resize', ()=>{
      const width = window.innerWidth;
      let factor = 1;

      if(width < 768 ){
        factor = 0.6;
      }else if(width < 1024){
        factor = 0.8
      }

      camera.aspect = window.innerWidth/ window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    })

    // load3D();
    animate();

  }
}
