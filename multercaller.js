import React, { Component } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

class multercaller extends Component {

    constructor() {
        super()
        this.state = {
            selectedFile: null,
            selectedFileCompressed: null,
            responseString: ''
        }
    }

    onChangeHandler = event => {
        console.log(event.target.files[0])
        this.setState({
            responseString: null,
            selectedFile: event.target.files[0]
        });
    }

    onChangeHandlerCompressed = event => {
        console.log(event.target.files[0])
        this.setState({
            responseString: null,
            selectedFileCompressed: event.target.files[0]
        });
    }

    onClickHandler = () => {
        const data = new FormData()
        let start = new Date(Date.now()).getMilliseconds();
        data.append('image', this.state.selectedFile)
        axios.post("http://localhost:3001/normal", data)
            .then(res => {
                console.log(((new Date(Date.now()).getMilliseconds()))-start);

                console.log(res.statusText)
                this.setState({
                    response: true
                })
            })
            .catch(err => {
                this.setState({
                    responseString: null
                })
                console.log(err);
            })
    }


    onClickHandlerCompressed = async () => {
        const data = new FormData()
        ////////////////////////////////////////////
        //this.state.selectedFileCompressed;


            const imageFile = await this.state.selectedFileCompressed;
            console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
            console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

            var options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            }
            try {
                const compressedFile = await imageCompression(imageFile, options);
                data.append('image', compressedFile)
                let start = new Date(Date.now()).getMilliseconds();
                axios.post("http://localhost:3001/compressed", data)
                    .then(res => {
                        console.log( (new Date(Date.now()).getMilliseconds())- start);
                        console.log(res.statusText)
                        this.setState({
                            response: true
                        })
                    })
                    .catch(err => {
                        this.setState({
                            responseString: null
                        })
                        console.log(err);
                    })


//                console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
//console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                /////////////////////////

            } catch (error) {
                console.log(error);
            }
        /////////////////////////////////////////////
    }



    render() {
        return (
            <div>
                <center>
                    <input type="file" name="image" onChange={this.onChangeHandler} />
                    <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload without compression</button>
                    {this.state.responseString}

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <input type="file" name="image" onChange={this.onChangeHandlerCompressed} />
                    <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandlerCompressed}>Upload with compression</button>

                </center>
            </div>
        )
    }
}
export default multercaller;