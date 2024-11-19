import {Header} from "./component/Header.jsx";
import {SearchMenu} from "./component/searchMenu/SearchMenu.jsx";
import Pouch from "./component/Pouches/Pouch.jsx";

export const MainPage = () => {
    return (
        <div className={"w-full flex justify-center"}>
            <div className={"w-[390px]"}>
                <Header/>
                <SearchMenu/>
                <div className={"w-full flex justify-center"}>
                    <div className="mabi mt-[7px] w-[360px] pb-5 mb-4">
                        <Pouch/>
                    </div>
                </div>
            </div>
        </div>
    )
}