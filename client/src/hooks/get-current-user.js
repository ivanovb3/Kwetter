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

   

    return {getUser}
}
