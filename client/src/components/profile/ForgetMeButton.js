import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useRequest from '../../hooks/use-request'

const ForgetMe = (props) => {
    let navigate = useNavigate()

    const [id, setId] = useState('')
    const { doRequest } = useRequest({
        url: '/api/users/forgetme',
        method: 'post',
        body: {
            id: id
        },
        onSuccess: () => {navigate('../../../')}
    })

    const onSubmit = async (e) => {
        e.preventDefault()

        await doRequest()

    }

    useEffect(() => {
        if (props.id) {
            setId(props.id);
        }
    }, [props.id]);

    return (
        <button type="button" className="btn btn-sm btn-danger pull-right float-right" style={{marginLeft: 'auto', marginRight: 3, marginTop: '5%'}} 
            value={id} onClick={onSubmit}><i className="fa fa-close-round"></i>Deactivate account</button>
    )
}

export default ForgetMe