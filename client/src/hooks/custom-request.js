import axios from "axios"
import { useState } from 'react'

axios.defaults.withCredentials = true;

export default () => {
    const [errors, setErrors] = useState(null);

    const doCustomPostRequest = async (urlParam, bodyParam) => {
        try {
            setErrors(null)
            const response = await axios.post(urlParam, bodyParam)

            return response.data
        }
        catch (err) {
            setErrors(
                <div className="alert alert-danger">
                    <ul className='my-0'>
                        {err.response.data.errors.map(err =>
                            <li key={err.message}>{err.message}</li>)}
                    </ul>
                </div>
            );
        }
    }
    const doCustomGetRequest = async (urlParam) => {
        try {
            setErrors(null)
            const response = await axios.get(urlParam)

            return response.data
        }
        catch (err) {
            setErrors(
                <div className="alert alert-danger">
                    <ul className='my-0'>
                        {err.response.data.errors.map(err =>
                            <li key={err.message}>{err.message}</li>)}
                    </ul>
                </div>
            );
        }
    }

    return { doCustomGetRequest, doCustomPostRequest, errors };
}