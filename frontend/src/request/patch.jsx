import axios from "axios";

const Patch = async (url, data, token = null) => {
    try {
        const config = {
            headers: {
                Authorization: `Token ${token}`,
            },
        };

        const res = await axios.patch(url, data, token ? config : {
            headers: {},
        });
        console.log(res);
        return res;
    } catch (error) {
        console.error("Ошибка при отправке данных", error);
    }
};

export default Patch;