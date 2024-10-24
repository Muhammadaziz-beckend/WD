import axios from "axios"

const Get = async (url,token=null) => {

    try {

        const config = {
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        const res = await axios.get(url,token ? config : {
            headers: {},
        })
        return res
    } catch (e){
        return (e);
    }
}

export default Get