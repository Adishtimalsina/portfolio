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
import {HemisphereLight} from "three";

@Component({
  selector: 'app-three-d',
  templateUrl: './three-d.component.html',
  styleUrls: ['./three-d.component.css']
})
export class ThreeDComponent implements AfterViewInit {
  @ViewChild('rendererContainer', { static: true }) containerRef!: ElementRef;
  protected objectWidth: number | undefined;
  protected objectHeight: number | undefined;
  private rendererContainer = this.containerRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object

  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    let objectModel: THREE.Object3D;
    let reactObject: THREE.Object3D | null = null;
    let dockerObject: THREE.Object3D | null = null;
    let awsObject: THREE.Object3D | null = null;
    let pythonObject: THREE.Object3D | null = null;
    let devObject: THREE.Object3D | null = null;
    let mixer:THREE.AnimationMixer;
    let clock = new THREE.Clock();
    let raycaster = new THREE.Raycaster();
    let  mouse = new THREE.Vector2();
    const container = this.containerRef.nativeElement;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );


    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, .9);
    light.position.set(1, 1, 1);
    scene.add(light);

    const orbitController = new OrbitControls(camera, renderer.domElement);
    orbitController.enableDamping = true;
    orbitController.dampingFactor = 0.05;
    orbitController.enableZoom = false;

    camera.position.set(2, 5, -12);

    //resize container
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        this.objectWidth = cr.width;
        this.objectHeight = cr.height;
        console.log("objectWidth", this.objectWidth, "objectHeight", this.objectHeight);
      }
    })


    const load3D =function() {
      const loader = new GLTFLoader();

       loader.load('./models/room2.glb', (gltf)=>{
         objectModel = gltf.scene;
         objectModel?.scale.set(1, 1, 1);

         //center the object model
         const box = new THREE.Box3().setFromObject(objectModel);
         const center = new THREE.Vector3();
         box.getCenter(center);
         objectModel?.position.sub(center).normalize();
        // objectModel?.position.set(-5.5,-6.5,-7);
         objectModel.rotation.y = Math.PI / 2.2;

         // const hemiLight = new THREE.AmbientLight(0xffffff, 1);
         // hemiLight.position.set(3, -3, -3);
         //  scene.add(hemiLight);

         const dirLight = new THREE.DirectionalLight(0xffffff, 1);
         dirLight.position.set(3, -3, -3);
         scene.add(dirLight);

         //add helper
         // const hemiHelper = new THREE.HemisphereLightHelper(hemiLigh, 1, 'red');
         // scene.add(hemiHelper);

         // Initial responsive scale and position
         updateObjectForScreen(window.innerWidth);

         scene.add(objectModel);
       }, undefined, (error)=>{
         console.log("error loading gltf", error)
       })
    }

    //load react 3d
    const loadReact3D = () => {
      const loader = new GLTFLoader();
        loader.load('./models/react_logo.glb', (gltf) => {
         reactObject = gltf.scene;

        // Apply transform (customize as needed)
        reactObject.scale.set(.20, .20, .2);

        reactObject.position.set(7, 5, 0); // Different position than first model
        //  reactObject.rotation.y = Math.PI/2;

        // Add to scene
        scene.add(reactObject);
      }, undefined, (error) => {
        console.error('Error loading second GLB model:', error);
      });
    };

    const loadDocker3D = () => {
      const loader = new GLTFLoader();
      loader.load('./models/docker.glb', (gltf) => {
        dockerObject = gltf.scene;

        // Apply transform (customize as needed)
        dockerObject.scale.set(.25, .25, .2);

        dockerObject.position.set(7, 6, 0); // Different position than first model
        //  reactObject.rotation.y = Math.PI/2;

        // Add to scene
        scene.add(dockerObject);
      }, undefined, (error) => {
        console.error('Error loading second GLB model:', error);
      });
    };

    const loadAWS3D = () => {
      const loader = new GLTFLoader();
      loader.load('./models/aws.glb', (gltf) => {
        awsObject = gltf.scene;

        // Apply transform (customize as needed)
        awsObject.scale.set(.10, .10, .2);
        awsObject.position.set(-7, 4.5, -3);

       // awsObject.position.set(-7, 4.5, -3); // Different position than first model
        awsObject.rotation.y = Math.PI;

        // Add to scene
        scene.add(awsObject);
      }, undefined, (error) => {
        console.error('Error loading second GLB model:', error);
      });
    };

    const loadPython3D = () => {
      const loader = new GLTFLoader();
      loader.load('./models/python.glb', (gltf) => {
        pythonObject = gltf.scene;

        // Apply transform (customize as needed)
        pythonObject.scale.set(.20, .20, .2);

         pythonObject.position.set(-9.5, 5, -3); // Different position than first model
        pythonObject.rotation.y = Math.PI;

        // Add to scene
        scene.add(pythonObject);
      }, undefined, (error) => {
        console.error('Error loading second GLB model:', error);
      });
    };


    const loadDev3D = () => {
      const loader = new GLTFLoader();
      loader.load('./models/rubiks.glb', (gltf) => {
        devObject = gltf.scene;

        // Apply transform (customize as needed)
        devObject.scale.set(.12, .12, .12);

        devObject.position.set(0, -1.1, -3.5); // Different position than first model
       // devObject.rotation.y = Math.PI;

        // Add to scene
        scene.add(devObject);
        if(gltf.animations && gltf.animations.length > 0){
          mixer = new THREE.AnimationMixer(devObject);
          gltf.animations.forEach((i) => {mixer.clipAction(i).play()});
        }
      }, undefined, (error) => {
        console.error('Error loading second GLB model:', error);
      });
    };



    const animate = function () {
      requestAnimationFrame(animate);
      let reactClock = performance.now() * 0.0005;
      if(reactObject){
        reactObject.rotation.x +=0.001;
        reactObject.position.z = Math.sin(reactClock)
      }

      let dockerClock = performance.now() * 0.0005;
      if(dockerObject){
        dockerObject.rotation.y +=0.001;
        dockerObject.position.y = Math.sin(dockerClock);
      }

      let awsClock = performance.now() * 0.0004;
      if(awsObject){
        awsObject.rotation.y -=0.001;
        awsObject.position.y = Math.sin(awsClock);
      }

      let pythonClock = performance.now() * 0.0005;
      if(pythonObject){
        pythonObject.rotation.y +=0.001;
        pythonObject.position.z = Math.sin(pythonClock);
      }

      let devClock = performance.now() * 0.0005;
      if(devObject){
        devObject.rotation.z +=0.001;
        devObject.position.x = Math.sin(devClock);
      }

      let delta = clock.getDelta();
      if(mixer){
        mixer.update(delta);
      }

      orbitController.update();
      renderer.render(scene, camera);
    };

    const onClick = (event: MouseEvent) => {
      const bounds = renderer.domElement.getBoundingClientRect();

      mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(objectModel, true);

      if (intersects.length > 0) {
       // this.animationStarted = true;
        orbitController.enableZoom = true;
      }else{
        orbitController.enableZoom = false;
      }
    };


    const updateObjectForScreen = (width: number) => {
      if (!objectModel) return;

      let scale = 1;
      let position = new THREE.Vector3(-1.5, -0.5, -1);

      if(width < 576 ){
        camera.position.set(2, 4, -12);
        objectModel.scale.set(0.6,0.6,0.6)
        objectModel.position.set(-1,-0.4,-0.5);
         reactObject?.scale.set(.15, .15, .15);
         reactObject?.position.set(4, 3, 0);
         dockerObject?.scale.set(.15, .15, .15);
         dockerObject?.position.set(4, 5, -1);
         awsObject?.scale.set(.07, .07, .07);
         awsObject?.position.set(-3, 3, -3);
         pythonObject?.scale.set(.1, .1, .1);
         pythonObject?.position.set(-5, 3, -3);
         devObject?.scale.set(.07, .07, .07);
         devObject?.position.set(0, -.8, -3);
      }

      if(width >= 576 && width <768){
        camera.position.set(2, 4, -10.5);
        objectModel.scale.set(0.7,0.7,0.7)
        objectModel.position.set(-1,-0.4,-0.5);
        reactObject?.scale.set(.20, .20, .20);
        reactObject?.position.set(4.5, 3, 0);
        dockerObject?.scale.set(.20, .20, .20);
        dockerObject?.position.set(5, 5, -1);
        awsObject?.scale.set(.09, .09, .09);
        awsObject?.position.set(-4, 3, -3);
        pythonObject?.scale.set(.15, .15, .15);
        pythonObject?.position.set(-5.5, 3, -3);
        devObject?.scale.set(.09, .09, .09);
        devObject?.position.set(0, -.8, -3);
      }

      if(width >= 768 && width < 1024){
        objectModel.scale.set(0.8,0.8,0.8)
        objectModel.position.set(-1,-0.4,-0.5);
        reactObject?.scale.set(.20, .20, .20);
        reactObject?.position.set(6, 4, 0);
        dockerObject?.scale.set(.20, .20, .20);
        dockerObject?.position.set(6, 5, -1);
        awsObject?.scale.set(.09, .09, .09);
        awsObject?.position.set(-5, 3, -3);
        pythonObject?.scale.set(.16, .16, .16);
        pythonObject?.position.set(-7, 3.5, -3);
      }

      if(width >= 1024 && width < 1279){
        objectModel.scale.set(0.9,0.9,0.9)
        objectModel.position.set(-1,-0.4,-0.5);
      }

      if(width >= 1279){
        objectModel.scale.set( 1,1,1)
        objectModel.position.set(-1,-0.4,-0.5);
      }

     // objectModel.scale.set(scale, scale, scale);

      //objectModel.position.set(position.x, position.y, position.z);
    };

    window.addEventListener('resize', () => {
      const width = screen.width;
      const height = screen.height;

      // Update camera and renderer
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Update 3D model scale/position
      updateObjectForScreen(width);
    });

    load3D();
    loadReact3D();
    loadDocker3D();
    loadAWS3D();
    loadPython3D();
    loadDev3D();
    animate();
    observer.observe(this.containerRef.nativeElement);
    renderer.domElement.addEventListener('click', onClick, false);
  }
}
