import React, { useState } from 'react'
import ProgressBar from '../Common/ProgressBar'
import axios from 'axios'

function ImageUpload({headers, updatePic}) {
    const [ selectedFile, setFile ] = useState(null)
    const [ progress, setProgress ] = useState(0)
    
    const submit = (e) =>{
        e.preventDefault();                
        const formData = new FormData()
        formData.append("img", selectedFile)

        const config = {
            headers,
            header: { 'content-type': 'multipart/form-data',
            onUploadProgress : progEvent => {
                let percent = Math.floor((progEvent.loaded * 100) / progEvent.total)
                if (percent < 100) setProgress(percent)
                if(percent === 100) setProgress(99) 
            } 
        }
        }

        axios.post("/user/upload", formData, config)
        .then(res => {
            setProgress(0)
            updatePic(res.data.img)
        })
        .catch(err => {
            console.log(err)
            setProgress(0)
        })
    }

    return (
        <form className="form-group">
            <div className="input-group mb-1">
                <label htmlFor="file" className="custom-file-label">
                    { selectedFile ? `${selectedFile.name}` : "Choose File" }  
                </label>
                <input 
                    type="file" 
                    name="img" 
                    accept="image/*" 
                    className="custom-file-input border-blue"
                    onChange={ e => setFile(e.target.files[0]) } 
                />
            </div>
            <button className="btn btn-primary btn-block" onClick={submit}>Submit</button>

            { progress > 0 && <ProgressBar progress={progress} />}

        </form>
    )
}

export default ImageUpload