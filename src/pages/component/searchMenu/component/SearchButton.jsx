import {useResetRecoilState} from 'recoil';
import {filterColorState} from "../../../../stores/Store.jsx";

export const SearchButton = ({handleSearch, isSearchEnabled, handleReset, handleChannelNavigation}) => {
    const resetFilterColorState = useResetRecoilState(filterColorState);

    return (
        <div className={"mt-[7px] ml-[5px]"}>
            <button
                className="w-[104px] h-[19px] bg-[#baa0e1] rounded-[5px] justify-center items-center flex active:bg-[#c571c6] pt-0.5"
                onClick={handleSearch}
                disabled={!isSearchEnabled}
            >
                검색하기
            </button>
            <button
                className="mt-1.5 w-[104px] h-[19px] bg-[#baa0e1] rounded-[5px] justify-center items-center flex active:bg-[#c571c6] pt-0.5"
                onClick={() => {
                    handleReset();
                    resetFilterColorState();
                }}
            >
                조건초기화
            </button>
            <div className={"mt-1.5 flex"}>
                <button
                    className="w-[50px] h-[19px] bg-[#baa0e1] rounded-[5px] justify-center items-center flex active:bg-[#c571c6]"
                    onClick={() => handleChannelNavigation('previous')}
                >◀
                </button>
                <button
                    className="ml-1 w-[50px] h-[19px] bg-[#baa0e1] rounded-[5px] justify-center items-center flex active:bg-[#c571c6]"
                    onClick={() => handleChannelNavigation('next')}
                >▶
                </button>
            </div>
        </div>
    );
};