import axios from "axios"
import { useState } from 'react'

axios.defaults.withCredentials = true;

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null)
            const response = await axios[method](url, body)
            
            if (onSuccess) {
                onSuccess(response.data);
            }
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
    const doRequestId = async (id) => {
        try {
            setErrors(null)
            const response = await axios[method](url+id, body)
            
            if (onSuccess) {
                onSuccess(response.data);
            }
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

    return { doRequest, errors, doRequestId };
}