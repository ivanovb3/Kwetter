import axios from 'axios'
import React, { useState } from 'react'

const UploadProfilePic = () => {

    const [file, setFile] = useState(null)

    const onFileChange = (e) =>{
        e.preventDefault()
        setFile(e.target.files[0])
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file)

        await axios.post("/api/profiles/picture", formData)

    }

    const fileData = file ? <div>
        <h4>File Details:</h4>
        <p>File Name: {file.name}</p>
        <p>File Type: {file.type}</p>
    </div> : null


    return (
        <div>
            <form onSubmit={handleUpload}>
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Choose a profile picture</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={onFileChange} />
                    <button type="submit" className="btn btn-primary" >Upload</button> 
                </div>
            </form>
            {fileData}
        </div>
    )
}

export default UploadProfilePic