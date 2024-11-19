import Select from "react-select";
import {tradeOptionsBelfast, tradeOptionsIria, tradeOptionsUladh, tradeStyles} from "./SelectReactOption.js";

export const TradeSelect = ({selectedTradeOption, handleTradeChange}) =>
    <div className="mabi ml-[5px] w-[153px] pt-[7px] flex justify-center flex-wrap">
        <div>
            <p style={{fontWeight: 400, fontSize: `10px`, lineHeight: `11px`}}>교역소</p>
            <div className="w-full h-[4px]"></div>
            <div className="flex justify-center flex-wrap">
                <Select
                    value={selectedTradeOption?.type === 'uladh' ? selectedTradeOption.option : null}
                    onChange={(option) => handleTradeChange(option, 'uladh')}
                    options={tradeOptionsUladh}
                    isSearchable
                    placeholder=" 울라 대륙"
                    styles={tradeStyles}
                />
            </div>
            <div className="flex justify-center flex-wrap">
                <Select
                    value={selectedTradeOption?.type === 'belfast' ? selectedTradeOption.option : null}
                    onChange={(option) => handleTradeChange(option, 'belfast')}
                    options={tradeOptionsBelfast}
                    isSearchable
                    placeholder=" 벨바스트"
                    styles={tradeStyles}
                    className="mt-[5px]"
                />
            </div>
            <div className="flex justify-center flex-wrap">
                <Select
                    value={selectedTradeOption?.type === 'iria' ? selectedTradeOption.option : null}
                    onChange={(option) => handleTradeChange(option, 'iria')}
                    options={tradeOptionsIria}
                    isSearchable
                    placeholder=" 이리아 대륙"
                    styles={tradeStyles}
                    className="mt-[5px]"
                />
            </div>
        </div>
    </div>;