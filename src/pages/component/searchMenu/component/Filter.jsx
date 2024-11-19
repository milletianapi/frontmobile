import {useRecoilState} from "recoil";
import {filterColorState} from "../../../../stores/Store.jsx";
import {useState} from "react";

export const Filter = () => {
    const initialState = localStorage.getItem('preferredColor') === null ? [] : JSON.parse(localStorage.getItem('preferredColor'));
    const [filterColors, setFilterColors] = useRecoilState(filterColorState);
    const [preferredColor, setPreferredColor] = useState(initialState);

    const hexToRgb = (hex) => {
        let bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255,
        };
    };

    const rgbToHex = ({ r, g, b }) => {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b)
            .toString(16)
            .slice(1)
            .toUpperCase()}`;
    };

    const handleToggleDetails = (key) => {
        setFilterColors((prevColors) => ({
            ...prevColors,
            [key]: {...prevColors[key], showDetails: !prevColors[key].showDetails},
        }));
    };

    const handleHexChange = (e, key) => {
        const hex = e.target.value;
        if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) {
            setFilterColors((prevColors) => ({
                ...prevColors,
                [key]: {...prevColors[key], hex, rgb: hexToRgb(hex)},
            }));
        }
    };

    const handleHexCode = (e, key) => {
        const hex = e;
        if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) {
            setFilterColors((prevColors) => ({
                ...prevColors,
                [key]: {...prevColors[key], hex, rgb: hexToRgb(hex)},
            }));
        }
    };


    const handleRgbChange = (e, key, color) => {
        const value =
            e.target.value === "" ? "" : Math.max(0, Math.min(255, Number(e.target.value)));
        setFilterColors((prevColors) => {
            const newRgb = { ...prevColors[key].rgb, [color]: value };
            return {
                ...prevColors,
                [key]: {
                    ...prevColors[key],
                    rgb: newRgb,
                    hex:
                        newRgb.r !== "" && newRgb.g !== "" && newRgb.b !== ""
                            ? rgbToHex(newRgb)
                            : prevColors[key].hex,
                },
            };
        });
    };

    const handleActivationChange = (e, key) => {
        setFilterColors((prevColors) => ({
            ...prevColors,
            [key]: {...prevColors[key], active: e.target.checked},
        }));
    };

    const handleToleranceChange = (e, key) => {
        const value =
            e.target.value === "" ? "" : Math.max(0, Math.min(255, Number(e.target.value)));
        setFilterColors((prevColors) => ({
            ...prevColors,
            [key]: {...prevColors[key], tolerance: value},
        }));
    };

    const handleSaveToLocalStorage = (key) => {
        const hex = filterColors[key].hex;
        if (!preferredColor.includes(hex)) {
            const pc = [...preferredColor, hex];
            setPreferredColor(pc);
            localStorage.setItem('preferredColor', JSON.stringify(pc));
        }
    };

    const handleRemoveFromLocalStorage = (key) => {
        const hex = key;
        if (preferredColor.includes(hex)) {
            const pc = preferredColor.filter(color => color !== hex);
            setPreferredColor(pc);
            localStorage.setItem('preferredColor', JSON.stringify(pc));
        }
    };


    return (
        <div className="rounded-1.25 border border-[#9f7394] mt-1.5 w-[360px] pt-[2px] pb-[7px] pl-[5px] rounded-tr-none">
            {Object.keys(filterColors).map((key, index) => {
                const colorState = filterColors[key];
                return (
                    <div key={index} className="mt-[10px]">
                        <div className={"flex h-[15px] items-center"}>
                            <p className={"text-xs w-[25px] text-center"}>{key.toUpperCase()}팟</p>
                            <p className={"mt-[3px] ml-[57px] w-10 text-center"}>오차 계산</p>
                            <div
                                className="ml-1 w-11 h-[15px] bg-white rounded-[3px] border border-[#999999] text-[8.5px] leading-none flex items-center justify-center pt-[2px]">
                                <p>RGB거리</p>
                            </div>
                            <div
                                className="ml-1 w-[65px] h-[15px] bg-white rounded-[3px] border border-[#999999] text-[8.5px] leading-none flex items-center justify-center pt-[2px]">
                                <p>오차 값 이하</p>
                            </div>
                            <p className={"mt-[3px] ml-[7px] w-[18px] text-center"}>오차</p>
                            <input
                                className="ml-[5px] w-[79px] h-[15px] bg-white rounded-[3px] border border-[#999999] text-right pr-[5px] pt-[2px]"
                                value={colorState.tolerance}
                                onChange={(e) => handleToleranceChange(e, key)}
                            />
                        </div>
                        <div className={"flex mt-[4px]"}>
                            <input
                                type="color"
                                className="color-input ml-[2px] w-[19px] h-4.75 p-0 border border-[#3c3c3c]"
                                style={{appearance: "none"}}
                                value={colorState.hex}
                                onChange={(e) => handleHexChange(e, key)}
                            />
                            <input
                                className="ml-[9px] w-[44px] h-4.75 rgb-box text-right pr-[5px] pt-[3px]"
                                value={colorState.rgb.r}
                                onChange={(e) => handleRgbChange(e, key, "r")}
                                placeholder="R"
                            />
                            <input
                                className="ml-1 w-[44px] h-4.75 rgb-box text-right pr-[5px] pt-[3px]"
                                value={colorState.rgb.g}
                                onChange={(e) => handleRgbChange(e, key, "g")}
                                placeholder="G"
                            />
                            <input
                                className="ml-1 w-[44px] h-4.75 rgb-box text-right pr-[5px] pt-[3px]"
                                value={colorState.rgb.b}
                                onChange={(e) => handleRgbChange(e, key, "b")}
                                placeholder="B"
                            />
                            <input
                                className="ml-[4px] w-[65px] h-4.75 rgb-box text-center pt-[3px]"
                                value={colorState.hex}
                                onChange={(e) => handleHexChange(e, key)}
                                maxLength={7}
                            />
                            <button
                                className={`ml-[5px] w-[52px] h-4.75 ${colorState.selectCollection ? "bg-[#4364DF]" : "bg-[#d5b8e6]"} rounded-0.75 mid flex items-center justify-center cursor-pointer active:bg-[#c571c6]`}
                                onClick={() => handleToggleDetails(key)}
                            >
                                지염
                            </button>
                            <label className={"ml-[5px] mt-1 flex"}>
                                활성화
                                <input
                                    className={"w-[15px] h-[15px] ml-[6px] -translate-y-[3px] border-[#999999]"}
                                    type="checkbox"
                                    name="exampleCheckbox"
                                    checked={colorState.active}
                                    onChange={(e) => handleActivationChange(e, key)}
                                />
                            </label>
                        </div>
                        {colorState.showDetails && (
                            <div
                                className="mt-1 -translate-x-1.5 absolute w-[333px] bg-white rounded-[5px] border border-[#9f7394] pt-1 pb-1 pl-[5px]">
                                <div className={"flex"}>
                                    <div
                                        className="color-input ml-[2px] w-[19px] h-4.75 p-0 border border-[#3c3c3c]"
                                        style={{backgroundColor: colorState.hex}}
                                    />
                                    <div
                                        className="ml-[9px] w-[44px] h-4.75 pr-[5px] rgb-box pt-1.5 text-right">
                                        {colorState.rgb.r}
                                    </div>
                                    <div
                                        className="ml-1 w-[44px] h-4.75 pr-[5px] rgb-box pt-1.5 text-right">
                                        {colorState.rgb.b}
                                    </div>
                                    <div
                                        className="ml-1 w-[44px] h-4.75 pr-[5px] rgb-box pt-1.5 text-right">
                                        {colorState.rgb.g}
                                    </div>
                                    <div
                                        className="ml-[4px] w-[65px] h-4.75 rgb-box text-center pt-1.5">
                                        {colorState.hex}
                                    </div>
                                    <button
                                        className={`ml-[5px] w-[52px] h-4.75 bg-[#d5b8e6] rounded-0.75 mid flex items-center justify-center cursor-pointer active:bg-[#c571c6]`}
                                        onClick={() => handleSaveToLocalStorage(key)}
                                    >
                                        저장하기
                                    </button>
                                </div>
                                {preferredColor.map((color, index) => {
                                        const colors = hexToRgb(color)
                                        return (
                                            <div className={"flex mt-[3px]"} key={index}>
                                                <div
                                                    className="color-input ml-[2px] w-[19px] h-4.75 p-0 border border-[#3c3c3c]"
                                                    style={{backgroundColor: color}}
                                                />
                                                <div
                                                    className="ml-[9px] w-[44px] h-4.75 pr-[5px] rgb-box pt-1.5 text-right">
                                                    {colors.r}
                                                </div>
                                                <div
                                                    className="ml-1 w-[44px] h-4.75 pr-[5px] rgb-box pt-1.5 text-right">
                                                    {colors.b}
                                                </div>
                                                <div
                                                    className="ml-1 w-[44px] h-4.75 pr-[5px] rgb-box pt-1.5 text-right">
                                                    {colors.g}
                                                </div>
                                                <div
                                                    className="ml-[4px] w-[65px] h-4.75 rgb-box pt-1.5 text-center">
                                                    {color}
                                                </div>
                                                <button
                                                    className={`ml-[5px] w-[52px] h-4.75 bg-[#d5b8e6] rounded-0.75 mid active:bg-[#c571c6]`}
                                                    onClick={() => handleHexCode(color, key)}
                                                >
                                                    불러오기
                                                </button>
                                                <button
                                                    className={`ml-[5px] w-[19px] h-4.75 bg-[#d5b8e6] rounded-0.75 mid active:bg-[#c571c6]`}
                                                    onClick={() => handleRemoveFromLocalStorage(color)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
