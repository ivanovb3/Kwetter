import axios from "axios"
import { useState } from 'react'

axios.defaults.withCredentials = true;

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        console.log(errors)
        try {
            setErrors(null)
            const response = await axios[method](url, body)
            // , {
            //     headers: { 'Content-Type': 'application/json' },
            //     withCredentials: true
            // }
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

    return { doRequest, errors };
}