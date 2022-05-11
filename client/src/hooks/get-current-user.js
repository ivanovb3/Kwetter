import axios from "axios"

export default () => {
    const getUser = async () => {
        let user = null
        try {
            await axios.get("/api/users/currentuser", {withCredentials: true})
                .then((res) => {
                    user = res.data
                    // console.log(user)                    
                    })
        }
        catch (err) {
            console.log('Backend seems to not working!')
        }
        return user;
    }

    const getCurrentUserProfile = async () => {
        let user = null
        try {
            await axios.get("/api/users/currentuser", {withCredentials: true})
                .then(async (res) => {
                    // console.log(res.data.currentUser.id)
                    user = await axios.get(`/api/profiles/${res.data.currentUser.id}`)
                    // console.log(user)                    
                    })
        }
        catch (err) {
            console.log('Backend seems to not working!')
        }
        return user;
    }
    const getCurrentUserRole = async () => {
        let role = null
        try {
            await axios.get("/api/organizations", {withCredentials: true}).then(res => role = res.data);
        }
        catch (err) {
            console.log('Backend seems to not working!')
        }
        return role;
    }



    return {getUser, getCurrentUserProfile, getCurrentUserRole}
}
