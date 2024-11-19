import {decoding} from "./component/decoding.js";
import {useRecoilValue} from "recoil";
import {filterColorState, pouchesState} from "../../../stores/Store.jsx";
import DefaultPouch from "./component/DefaultPouch.jsx";
import {useMemo} from "react";

const Pouch = () => {
    const pouches = useRecoilValue(pouchesState);
    const filterColors = useRecoilValue(filterColorState);

    const isColorWithinTolerance = (color, filterColor, tolerance) => {
        const minR = Math.max(filterColor.rgb.r - tolerance, 0);
        const maxR = Math.min(filterColor.rgb.r + tolerance, 255);
        const minG = Math.max(filterColor.rgb.g - tolerance, 0);
        const maxG = Math.min(filterColor.rgb.g + tolerance, 255);
        const minB = Math.max(filterColor.rgb.b - tolerance, 0);
        const maxB = Math.min(filterColor.rgb.b + tolerance, 255);

        return (
            color.r >= minR && color.r <= maxR &&
            color.g >= minG && color.g <= maxG &&
            color.b >= minB && color.b <= maxB
        );
    };

    const filteredPouches = useMemo(() => {
        if (!pouches || !filterColors) return [];
        const isAnyFilterActive = ["a", "b", "c"].some((key) => filterColors[key].active);
        if (!isAnyFilterActive) return pouches.item;
        return pouches.item.filter((pouch) => {
            return ["a", "b", "c"].every((key) => {
                const filterColor = filterColors[key];
                return !filterColor.active || isColorWithinTolerance(pouch.color[key], filterColor, filterColor.tolerance);
            });
        });
    }, [pouches, filterColors]);

    const pouchCreate = ({ key, item_name, color }) => {
        const image_url = decoding({ item_name, color });
        const colors = ["a", "b", "c"].map((key) => {
            if (!color[key]) {
                return { label: key.toUpperCase() + "팟", rgb: "0, 0, 0" };
            }
            return {
                label: key.toUpperCase() + "팟",
                rgb: `${color[key].r}, ${color[key].g}, ${color[key].b}`,
            };
        });

        return (
            <div key={key} className={"pt-5 flex items-center justify-center w-[119px] flex-wrap text-[10px]"}>
                <img src={image_url} alt={item_name} width={80} height={80} />
                <p>{item_name}</p>
                <div className={"w-full mt-0.5"}></div>
                <div className={"flex justify-normal flex-wrap pl-3"}>
                    {colors.map(({ label, rgb }) => (
                        <div key={label} className={"flex items-center justify-center"}>
                            <p className={"w-4 text-center"}>{label}</p>
                            <div
                                className={"w-[10px] h-[10px] ml-1 mr-1 -translate-y-[2px]"}
                                style={{ backgroundColor: `rgb(${rgb})` }}
                            ></div>
                            <p>({rgb})</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className={"flex flex-wrap"}>
            {filteredPouches.length === 0 && ["a", "b", "c"].some((key) => filterColors[key].active) ? (
                <div className={"w-full h-[146px] flex justify-center items-center pt-5"}>필터에 해당하는 튼튼한 주머니가 없습니다.</div>
            ) : !filteredPouches.length ? (
                <DefaultPouch />
            ) : (
                filteredPouches.map((pouch, index) => pouchCreate({ ...pouch, key: `pouch-${index}` }))
            )}
        </div>
    );
};

export default Pouch;
