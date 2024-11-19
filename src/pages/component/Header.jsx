import {useCallback, useEffect, useMemo, useState} from "react";

export const Header = () => {
    const CYCLE_DURATION = 36 * 60 * 1000;

    const getInitialCycleData = () => {
        const startTime = new Date();
        startTime.setHours(0, 0, 0, 0);
        const now = new Date();
        const elapsed = now.getTime() - startTime.getTime();
        const currentCycle = Math.floor(elapsed / CYCLE_DURATION) + 1;
        const nextCycleTime = (currentCycle * CYCLE_DURATION) + startTime.getTime();
        const timeLeft = nextCycleTime - now.getTime();

        return { cycleCount: currentCycle, timeLeft };
    };

    const [time, setTime] = useState(new Date());
    const [{ cycleCount, timeLeft }, setCycleData] = useState(getInitialCycleData);

    useEffect(() => {
        const interval = setInterval(() => {
            setCycleData(getInitialCycleData());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(prevTime => {
                return new Date(prevTime.getTime() + 1000);
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const formattedTime = useMemo(() => {
        const minutes = String(Math.floor(timeLeft / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((timeLeft % (1000 * 60)) / 1000)).padStart(2, '0');
        return {
            timeString: time.toLocaleTimeString().substring(0, time.toLocaleTimeString().length - 3),
            minutes,
            seconds
        };
    }, [timeLeft]);

    const handleTime = useCallback(() => {
        return (
            <>
                <p>{`[${formattedTime.timeString}] ㅣ 현재 ${cycleCount}주기 ㅣ 다음 주기까지 ${formattedTime.minutes}분 ${formattedTime.seconds}초`}</p>
            </>
        );
    }, [formattedTime, cycleCount]);

    return (
        <div className={"mt-[15px] w-full flex justify-center"}>
            <div className={"w-[360px] flex flex-wrap"}>
                <div className={"w-[88px] h-[88px] bg-[#82FFDB] rounded-[10px]"}></div>
                <div className={"pl-[7px] pt-[7px]"}>
                    <p style={{fontSize: `20px`, lineHeight: `22px`}}>밀레시안API</p>
                    <p className={"text-[#858585] mt-1.5 pl-0.5"} style={{fontSize: `11px`, lineHeight: `13px`}}>Email :
                        yoop80075@gmail.com<br/>UI design : socanu@naver.com<br/>Image URL Decoding by
                        @jumeonidik3038<br/>Data based on NEXON Open API</p>
                </div>
                <div className={"w-full h-[10px]"}></div>
                <div
                    className={"w-full text-[#404040] flex justify-center rounded-[5px] h-[21px] bg-[#FFDEE1] items-center pt-[2px]"}
                    style={{letterSpacing: `0.1em`}}>{handleTime()}</div>
            </div>
        </div>
    );
};
