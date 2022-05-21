import React from 'react';
import './PointCloudLoader.css';
import UploadPointCloudButton from './UploadPointCloudButton';
import ViewPCD from './viewPCD';

// Questions
// 1) What is a ref?

// Plan (following https://discourse.threejs.org/t/best-way-to-integrate-plain-three-js-inside-a-react-app/27049/2)
// 1) Add three.js class initialization + ref to the canvas in the componentDidMount function
// 2) Create file with all three js code, should initialize three stuff, create a canvas,
//    do stuff if a pointcloud is rendered
export default class PointCloudLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PointCloud: null,
        }
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        // Get canvas, pass to custom class
        const canvas = this.canvasRef.current;
        this.viewPCD = new ViewPCD(canvas);

        // Init any event listeners
        // window.addEventListener('mousemove', this.mouseMove);
        window.addEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.viewPCD.onWindowResize(window.innerWidth, window.innerHeight);
    }

    renderPointCloud = (pcdURL) => {
        console.log("rendering pcd");
        this.viewPCD.loadPointCloud(pcdURL);
    }

    render() {
        return (
            <>
                <UploadPointCloudButton render = {this.renderPointCloud}></UploadPointCloudButton>
                <canvas ref={this.canvasRef} />
            </>
        )
    }
}