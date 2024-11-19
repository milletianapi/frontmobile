import { useRecoilState } from "recoil";
import { filterColorState } from "../../../../stores/Store.jsx";

export const FilterColorView = () => {
    const [filterColors, setFilterColors] = useRecoilState(filterColorState);

    const resetColorIfInactive = (colorState) => {
        return colorState.active ? colorState : { ...colorState, hex: "", rgb: { r: `R`, g: `G`, b: `B` } };
    };

    return (
        <div className={"mabi mt-[7px] w-[251px] h-11 pt-[7px] pl-2 flex gap-[7px]"}>
            {Object.keys(filterColors).map((key, index) => {
                const colorState = resetColorIfInactive(filterColors[key]);
                return (
                    <div key={index} className={"flex"}>
                        <div className="w-[30px] h-[30px] border border-[#3c3c3c] flex justify-center"
                             style={{ backgroundColor: colorState.hex || `#F0F0F0` }}>
                            <p className="mt-[9px] w-2.5 h-[14px] text-center text-[#3c3c3c] text-[13px] pt-0.5 text-shadow-white">
                                {key.toUpperCase()}
                            </p>
                        </div>
                        <div className={"ml-[3px]"}>
                            <div className="w-[41px] h-3.5 rounded-0.75 border border-[#858585] mid text-[6px]"
                                style={{backgroundColor: colorState.hex ? "white" : `#F0F0F0`}}
                            >
                                <p>{colorState.hex || `#000000`}</p>
                            </div>
                            <div
                                className="mt-0.5 w-[41px] h-3.5 rounded-0.75 border border-[#858585] mid text-[6px]"
                                style={{backgroundColor: colorState.hex ? "white" : `#F0F0F0`}}
                            >
                                <p>{`${colorState.rgb.r || `R`}, ${colorState.rgb.g || `G`}, ${colorState.rgb.b || `B`}`}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
