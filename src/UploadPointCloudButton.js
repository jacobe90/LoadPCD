import React from "react";
import {storage} from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default class UploadPointCloudButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            isPCD: false,
            showUploadError: false,
            pcd_url: null,
        }
    }
    onFileChange = (e) => {
        let file = e.target.files[0];
        let endsWithPcd = (fname) => {
            let i = fname.search(".pcd");
            return i !== -1 && i === fname.length - 4;
        }
        this.setState({ selectedFile: file, isPCD: file === undefined? false: endsWithPcd(file.name)});
    }

    handleSubmit = (e) => {

        e.preventDefault();

        if (this.state.selectedFile === null) {return;}
        
        // If it is not a pcd file, we show an error message
        if (!this.state.isPCD) {
            this.setState({ showUploadError: true }); 
            return;
        }

        this.setState({ showUploadError: false });
        const fileRef = ref(storage, 'pcd/' + this.state.selectedFile.name + v4());
        uploadBytes(fileRef, this.state.selectedFile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                this.setState({pcd_url: url});
                let proxy = "https://firebasestorage.googleapis.com/v0/b/pointcloudloader.appspot.com/o";
                this.props.render(url.slice(proxy.length));
                // // temporary solution here, need to find a permanent way to make a cors request
                // // see https://www.youtube.com/watch?v=hxyp_LkKDdk probably
                
                // Temporary solution II - use proxying
                // See https://create-react-app.dev/docs/proxying-api-requests-in-development/
                // fetch("https://cors-anywhere.herokuapp.com/" + url).then(r => r.text()).then(t => {
                //     this.props.render(t);
                // });
            });
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>PCD File Upload</h1>
                    <input type="file" onChange={this.onFileChange}/>
                    <button type="submit">Upload</button>
                </form>
                {this.state.showUploadError ? <p className="notPCDError">You must upload a file of .pcd type</p> : null}
            </div>
        )
    }
}