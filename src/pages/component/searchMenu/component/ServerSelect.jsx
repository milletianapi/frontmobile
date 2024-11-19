import {serverOptions} from "./SelectReactOption.js";

// eslint-disable-next-line react/prop-types
export const ServerSelect = ({activeButton, handleServerChange}) => <div>
    <div
        className="mabi w-[93px] h-[103px] text-[10px] flex justify-center items-center">
        <div className="flex flex-wrap gap-1 justify-center">
            {serverOptions.map((server) => (
                <button
                    key={server.value}
                    className={`pt-[2px] border-solid w-[78px] h-[19px] rounded-[5px] ${activeButton === server.value ? 'bg-[#D7B2DD]' : 'bg-[#FFCCE6]'} text-[#2E2E2E]`}
                    style={{fontWeight: 400, fontSize: `10px`, lineHeight: `11px`}}
                    onClick={() => handleServerChange(server.value)}
                >
                    {server.label}
                </button>

            ))}
        </div>
    </div>
</div>;