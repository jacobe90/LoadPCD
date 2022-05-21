import * as THREE from 'three';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class ViewPCD {
    constructor(canvasRef) {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvasRef,
            antialias: false,
        });

        const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        this.scene.add( light );

        this.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.01, 100 );
		this.camera.position.set( 5, 2, 8 );
        //this.camera.near
        console.log("Camera Near Clip Plane Distance: " + this.camera.near)
		this.controls = new OrbitControls( this.camera, this.renderer.domElement );
		this.controls.target.set( 0, 0.5, 0 );
		this.controls.update();
		this.controls.enablePan = false;
		this.controls.enableDamping = true;

        this.update();
    }

    loadPointCloud(url) {
        const loader = new PCDLoader();
        const scene = this.scene;
        const camera = this.camera;
        const controls = this.controls;
        // load a resource
        loader.load(
            // resource URL
            url,
            // called when the resource is loaded
            function ( mesh ) {
                // set camera position to be the centroid of the pointcloud
                mesh.geometry.computeBoundingBox();
                let centroid = new THREE.Vector3();
                mesh.geometry.boundingBox.getCenter(centroid);
                centroid.applyMatrix4(mesh.matrixWorld);
                controls.target.set(centroid.x, centroid.y, centroid.z);
                mesh.frustumCulled = false;
                scene.add( mesh );

            },
            // called when loading is in progresses
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

            },
            // called when loading has errors
            function ( error ) {

                console.error(error);

            }
        );
    }

    onWindowResize(vpW, vpH) {
        this.renderer.setSize(vpW, vpH);
    }

    update() {
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        requestAnimationFrame(this.update.bind(this));
    }
}