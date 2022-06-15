import axios from 'axios'
import React, { useState } from 'react'
import '../../styles/Profile.css'

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

    const fileData = file ? <div className='explanationsProfile'>
        <h4>File Details:</h4>
        <p>File Name: {file.name}</p>
        <p>File Type: {file.type}</p>
    </div> : null


    return (
        <div>
            <form onSubmit={handleUpload}>
                <div className="form-group explanationsProfile">
                    <input type="file" id="exampleFormControlFile1" onChange={onFileChange} hidden/>
                    <label htmlFor="exampleFormControlFile1"  className="uploadPicture">Choose a profile picture</label>
                    {fileData}
                    <button type="submit" className="btn btn-primary" >Upload picture</button> 
                </div>
            </form>            
        </div>
    )
}

export default UploadProfilePic