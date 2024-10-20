import axios from "axios"



const Delete = async (url,token) => {

    try {

        const config = {
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        let res = await axios.delete(url,config)
        console.log(res);
        
        return res
    }catch (e) {
        console.log(e);
        
    }

}

export default Delete