import { useState } from 'react';

export const ColorFilter = () => {
    const createColorState = () => ({ hex: "#000000", rgb: { r: "", g: "", b: "" }, selectCollection: false, selectColorList: JSON.parse(localStorage.getItem(`selectColor`) || "[]"), active: false });
    const [colors, setColors] = useState({ a: createColorState(), b: createColorState(), c: createColorState() });

    const hexToRgb = (hex) => {
        let bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    };

    const rgbToHex = ({ r, g, b }) => {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    };

    const handleHexChange = (e, key) => {
        const hex = e.target.value;
        if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) {
            setColors((prevColors) => ({
                ...prevColors,
                [key]: { ...prevColors[key], hex, rgb: hexToRgb(hex) }
            }));
        }
    };

    const handleRgbChange = (e, key, color) => {
        const value = e.target.value === "" ? "" : Math.max(0, Math.min(255, Number(e.target.value)));
        setColors((prevColors) => {
            const newRgb = { ...prevColors[key].rgb, [color]: value };
            return {
                ...prevColors,
                [key]: {
                    ...prevColors[key],
                    rgb: newRgb,
                    hex: newRgb.r !== "" && newRgb.g !== "" && newRgb.b !== "" ? rgbToHex(newRgb) : prevColors[key].hex
                }
            };
        });
    };

    const handleCollectionToggle = (key) => {
        setColors((prevColors) => {
            const selectColor = JSON.parse(localStorage.getItem(`selectColor`)) || [];
            return {
                ...prevColors,
                [key]: { ...prevColors[key], selectCollection: !prevColors[key].selectCollection, selectColorList: selectColor }
            };
        });
    };

    const handleActivationChange = (e, key) => {
        setColors((prevColors) => ({
            ...prevColors,
            [key]: { ...prevColors[key], active: e.target.checked }
        }));
    };

    const colorSave = (key) => {
        setColors((prevColors) => {
            const selectColor = JSON.parse(localStorage.getItem(`selectColor`)) || [];
            if (!selectColor.includes(prevColors[key].hex)) {
                selectColor.push(prevColors[key].hex);
            }
            localStorage.setItem(`selectColor`, JSON.stringify(selectColor));
            return {
                ...prevColors,
                [key]: { ...prevColors[key], selectColorList: selectColor }
            };
        });
    };

    const colorDelete = (key, item) => {
        setColors((prevColors) => {
            let selectColor = JSON.parse(localStorage.getItem(`selectColor`)) || [];
            selectColor = selectColor.filter((color) => color !== item);
            localStorage.setItem(`selectColor`, JSON.stringify(selectColor));
            return {
                ...prevColors,
                [key]: { ...prevColors[key], selectColorList: selectColor }
            };
        });
    };

    const renderColorComponent = (colorState, key, label) => (
        <div className={"relative justify-center sm:block mb-1"} style={{ opacity: colorState.active ? 1 : 0.5 }}>
            <div className={"flex gap-1 items-center"}>
                <p className={"w-7"}>{label}</p>
                <input type="color" value={colorState.hex} onChange={(e) => handleHexChange(e, key)} className={"border w-6"} disabled={!colorState.active} />
                <input type="number" min="0" max="255" value={colorState.rgb.r} onChange={(e) => handleRgbChange(e, key, 'r')} placeholder="R" className={"w-10 sm:w-12 border rounded text-center sm:text-left"} disabled={!colorState.active} />
                <input type="number" min="0" max="255" value={colorState.rgb.g} onChange={(e) => handleRgbChange(e, key, 'g')} placeholder="G" className={"w-10 sm:w-12 border rounded text-center sm:text-left"} disabled={!colorState.active} />
                <input type="number" min="0" max="255" value={colorState.rgb.b} onChange={(e) => handleRgbChange(e, key, 'b')} placeholder="B" className={"w-10 sm:w-12 border rounded text-center sm:text-left"} disabled={!colorState.active} />
                <input value={colorState.hex} onChange={(e) => handleHexChange(e, key)} maxLength={7} className={"w-20 border rounded text-center"} disabled={!colorState.active} />
                <label><input type="checkbox" name="exampleCheckbox" checked={colorState.active} onChange={(e) => handleActivationChange(e, key)} /> 활성화</label>
                <button className={`text-white ${colorState.selectCollection ? `bg-[#4364DF]` : `bg-[#6384FF]`} items-center pl-1 pr-1 rounded ml-1 active:bg-[#4364DF]`} onClick={() => handleCollectionToggle(key)} disabled={!colorState.active}>지염</button>
            </div>
            {colorState.selectCollection && <div className={`absolute w-full mt-1 min-h-32 bg-white rounded border pt-2 pr-2 pb-2 pl-5 z-10`}>
                <div className={"flex items-center gap-1"}>
                    <div className={"w-2 h-6"} />
                    <div className="w-6 h-6 border" style={{ backgroundColor: colorState.hex }} />
                    <div className={"w-10 h-6 sm:w-12 border rounded text-center text-black sm:text-left "}>{colorState.rgb.r}</div>
                    <div className={"w-10 h-6 sm:w-12 border rounded text-center text-black sm:text-left "}>{colorState.rgb.g}</div>
                    <div className={"w-10 h-6 sm:w-12 border rounded text-center text-black sm:text-left "}>{colorState.rgb.b}</div>
                    <div className={"w-20 h-6 sm:w-12 border rounded text-center text-black sm:text-left "}>{colorState.hex}</div>
                    <button className={`border rounded pl-1 pr-1 bg-[#6384FF] text-white active:bg-[#4364DF]`} onClick={() => colorSave(key)}>저장하기</button>
                </div>
                {colorState.selectColorList.map((item, index) => {
                    let bigint = parseInt(item.slice(1), 16);
                    let r = (bigint >> 16) & 255;
                    let g = (bigint >> 8) & 255;
                    let b = bigint & 255;
                    return (
                        <div className={"flex items-center gap-1 mt-1"} key={index}>
                            <div className={"w-2 h-6"} />
                            <div className="w-6 h-6 border" style={{ backgroundColor: item }} />
                            <div className={"w-10 h-6 sm:w-12 border rounded text-center text-black sm:text-left "}>{r}</div>
                            <div className={"w-10 h-6 sm:w-12 border rounded text-center text-black sm:text-left "}>{g}</div>
                            <div className={"w-10 h-6 sm:w-12 border rounded text-center text-black sm:text-left "}>{b}</div>
                            <div className={"w-20 h-6 sm:w-12 border rounded text-center text-black sm:text-left "}>{item}</div>
                            <button className={"border rounded pl-1 pr-1 bg-[#6384FF] active:bg-[#4364DF] text-white"} onClick={() => handleHexChange({ target: { value: item } }, key)}>불러오기</button>
                            <button className={"border rounded pl-1 pr-1 bg-[#6384FF] active:bg-[#4364DF] text-white items-center"} onClick={() => colorDelete(key, item)}>X</button>
                        </div>
                    );
                })}
            </div>}
        </div>
    );

    return (
        <div className="pt-5 gap-1 flex flex-wrap justify-center sm:block sm:pl-5">
            {renderColorComponent(colors.a, 'a', 'A팟')}
            {renderColorComponent(colors.b, 'b', 'B팟')}
            {renderColorComponent(colors.c, 'c', 'C팟')}
        </div>
    );
};
