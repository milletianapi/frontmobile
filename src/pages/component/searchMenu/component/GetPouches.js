import axios from "axios";

export const GetPouches = async (server, channel, trade, setPouches) => {
    setPouches(null);
    try {
        let res = await axios.get("https://m.milletianapi.com/read", {
            params: {
                server: server.value,
                channel: channel.value,
                trade: trade.value,
            }
        });
        console.log(res.data);
        if(res.data === 'error'){alert(`넥슨 API가 아직 업데이트 되지 않았습니다. 주기가 26~31분 남았을 때 다시 시도해주세요.`)} else
        if (res.data !== null && res.data !== undefined && res.data !== '') {
            setPouches(res.data);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};