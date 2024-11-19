import Select from "react-select";
import {channelOptions, channelStyles} from "./SelectReactOption.js";

// eslint-disable-next-line react/prop-types
export const ChannelSelect = ({selectedChannel, handleChannelChange, selectedServer}) =>
    <div className="mabi w-[104px] h-[53px] pt-[7px] pb-1 pl-2 pr-2 flex justify-center text-[10px] ">
        <div>
            <p>채널</p>
            <div className="w-full h-[4px]"></div>
            <div className="flex justify-center">
                <Select
                    value={selectedChannel}
                    onChange={handleChannelChange}
                    options={selectedServer ? channelOptions[selectedServer.value] : []}
                    isSearchable
                    placeholder="채널"
                    isDisabled={!selectedServer}
                    styles={channelStyles}
                    className=" z-10"
                />
            </div>
        </div>
    </div>;