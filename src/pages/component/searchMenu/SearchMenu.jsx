import {channelOptions, serverOptions,} from "./component/SelectReactOption.js";
import {useRecoilState} from "recoil";
import {
    filterColorState,
    pouchesState,
    selectedChannelState,
    selectedServerState,
    selectedTradeState
} from "../../../stores/Store.jsx";
import {useCallback, useEffect, useState} from "react";
import {GetPouches} from "./component/GetPouches.js";
import {ServerSelect} from "./component/ServerSelect.jsx";
import {TradeSelect} from "./component/TradeSelect.jsx";
import {ChannelSelect} from "./component/ChannelSelect.jsx";
import {SearchButton} from "./component/SearchButton.jsx";
import {SelectedView} from "../SelectedView.jsx";
import {Filter} from "./component/Filter.jsx";
import {FilterColorView} from "./component/FilterColorView.jsx";

export const SearchMenu = () => {
    const [selectedServer, setSelectedServer] = useRecoilState(selectedServerState);
    const [selectedChannel, setSelectedChannel] = useRecoilState(selectedChannelState);
    const [activeButton, setActiveButton] = useState('lute');
    const [selectedTradeOption, setSelectedTradeOption] = useState({ type: "uladh", option: { value: "tirChonaill", label: "티르 코네일" } });
    const [selectedTrade, setSelectedTrade] = useRecoilState(selectedTradeState);
    const [pouches, setPouches] = useRecoilState(pouchesState);
    const [highlighted, setHighlighted] = useState(null);
    const [filter, setFilter] = useState(true);
    const [filterColor, setFilterColor] = useRecoilState(filterColorState);

    const toggleFilter = () => {
        setFilter(!filter);
    };

    useEffect(() => {
        if (selectedServer) {
            setHighlighted("server");
            const timer = setTimeout(() => setHighlighted(null), 500);
            return () => clearTimeout(timer);
        }
    }, [selectedServer]);

    useEffect(() => {
        if (selectedChannel) {
            setHighlighted("channel");
            const timer = setTimeout(() => setHighlighted(null), 500);
            return () => clearTimeout(timer);
        }
    }, [selectedChannel]);

    useEffect(() => {
        if (selectedTrade) {
            setHighlighted("trade");
            const timer = setTimeout(() => setHighlighted(null), 500);
            return () => clearTimeout(timer);
        }
    }, [selectedTrade]);

    const handleServerChange = useCallback((value) => {
        const option = serverOptions.find((server) => server.value === value);
        setSelectedServer(option);
        setSelectedChannel({ value: 'channel_1', label: '1 채널' });
        setActiveButton(value);
    }, [setSelectedServer, setSelectedChannel]);

    const handleChannelChange = useCallback((option) => {
        setSelectedChannel(option);
    }, [setSelectedChannel]);

    const handleChannelNavigation = useCallback(async (direction) => {
        if (!selectedServer || !selectedChannel) return;
        const value = selectedChannel.value.split("_");
        const label = selectedChannel.label.split(" ");
        const totalChannels = channelOptions[selectedServer.value].length;
        value[1] = direction === 'next' ? (parseInt(value[1], 10) % totalChannels) + 1 : (parseInt(value[1], 10) - 2 + totalChannels) % totalChannels + 1;
        const valueStr = value[0] + "_" + value[1];
        const labelStr = value[1] + " " + label[1];
        const channel = { value: valueStr, label: labelStr };
        setSelectedChannel(channel);
        await GetPouches(selectedServer, channel, selectedTrade, setPouches);
    }, [selectedChannel, selectedServer, selectedTrade, setSelectedChannel, setPouches]);

    const handleTradeChange = useCallback((option, tradeType) => {
        setSelectedTradeOption({ type: tradeType, option });
        setSelectedTrade(option);
    }, [setSelectedTradeOption, setSelectedTrade]);

    const handleSearch = useCallback(async () => {
        if (!selectedServer || !selectedChannel || !selectedTrade) return;
        await GetPouches(selectedServer, selectedChannel, selectedTrade, setPouches);
    }, [selectedServer, selectedChannel, selectedTrade, setPouches]);

    const handleReset = useCallback(() => {
        setSelectedServer(serverOptions.find(option => option.value === 'lute'));
        setSelectedChannel({ value: 'channel_1', label: '1 채널' });
        setSelectedTrade({ value: "tirChonaill", label: "티르 코네일" });
        setSelectedTradeOption({ type: "uladh", option: { value: "tirChonaill", label: "티르 코네일" } });
        setActiveButton('lute');
    }, [setSelectedServer, setSelectedChannel, setSelectedTrade, setSelectedTradeOption]);

    const handleToleranceChange = useCallback((change) => {
        setFilterColor(prevState => {
            const updateTolerance = (tolerance) => Math.min(255, Math.max(0, tolerance + change));
            return {
                a: {
                    ...prevState.a,
                    tolerance: updateTolerance(prevState.a.tolerance)
                },
                b: {
                    ...prevState.b,
                    tolerance: updateTolerance(prevState.b.tolerance)
                },
                c: {
                    ...prevState.c,
                    tolerance: updateTolerance(prevState.c.tolerance)
                }
            };
        });
    }, [setFilterColor]);

    const isSearchEnabled = selectedServer && selectedChannel && selectedTrade;

    return (
        <div className={"mt-[10px] flex justify-center flex-wrap"}>
            <div className={"w-[360px] flex"}>
                <ServerSelect activeButton={activeButton} handleServerChange={handleServerChange} />
                <TradeSelect selectedTradeOption={selectedTradeOption} handleTradeChange={handleTradeChange} />
                <div className={"pl-[5px]"}>
                    <ChannelSelect handleChannelChange={handleChannelChange} selectedChannel={selectedChannel} selectedServer={selectedServer} />
                    {filter ? (
                        <div className={"mabi w-[104px] h-[45px] mt-[5px] flex justify-center items-center"}>
                            <button
                                className={"w-[89px] h-[21px] bg-[#BAA0E1] rounded-1.25 active:bg-[#C571C7]"}
                                onClick={toggleFilter}
                            >
                                지염 필터 열기
                            </button>
                        </div>
                    ) : (
                        <div
                            className={"pt-[8px] pl-[7px] border-[#9f7394] rounded-t-1.25 absolute border-t-[1px] border-l-[1px] bg-white border-r-[1px] w-[104px] h-[51px] mt-[5px]"}
                        >
                            <button
                                className="w-[89px] h-[19px] bg-[#baa0e1] rounded-1.25 mid active:bg-[#c571c6]"
                                onClick={toggleFilter}
                            >
                                지염 필터 닫기
                            </button>
                            <div className={"flex gap-[5px] mt-1"}>
                                <button
                                    className="w-[42px] h-[19px] rounded-1.25 border border-[#ffcce6] mid active:bg-[#ffcce6]"
                                    onClick={() => handleToleranceChange(-5)}
                                >
                                    오차 -5
                                </button>
                                <button
                                    className="w-[42px] h-[19px] rounded-1.25 border border-[#ffcce6] mid active:bg-[#ffcce6]"
                                    onClick={() => handleToleranceChange(5)}
                                >
                                    오차 +5
                                </button>
                            </div>
                            <div className={"-left-0 absolute bg-white w-full h-0.5"}></div>
                        </div>
                    )}
                </div>
            </div>
            {!filter && <Filter/>}
            <div className={"w-[360px] flex flex-wrap"}>
                <div>
                    <FilterColorView/>
                    <SelectedView/>
                </div>
                <SearchButton
                    handleSearch={handleSearch}
                    isSearchEnabled={isSearchEnabled}
                    handleChannelNavigation={handleChannelNavigation}
                    handleReset={handleReset}
                />
            </div>
        </div>
    );
};
