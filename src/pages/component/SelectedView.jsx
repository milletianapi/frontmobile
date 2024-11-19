import {useRecoilValue} from "recoil";
import {selectedChannelState, selectedServerState, selectedTradeState} from "../../stores/Store.jsx";

export const SelectedView = () => {
    const server = useRecoilValue(selectedServerState);
    const channel = useRecoilValue(selectedChannelState);
    const trade = useRecoilValue(selectedTradeState);

    return (
        <div className={"flex mt-1.5"}>
            <div
                className="w-[71px] h-[19px] bg-[#ffcce6] rounded-[5px] justify-center items-center flex pt-0.5">{server.label}</div>
            <div
                className="ml-[5px] w-[97px] h-[19px] bg-[#ffcce6] rounded-[5px] justify-center items-center flex pt-0.5">{trade.label}</div>
            <div
                className="ml-1.5 w-[72px] h-[19px] bg-[#ffcce6] rounded-[5px] justify-center items-center flex pt-0.5">{channel.label}</div>
        </div>
    )
}