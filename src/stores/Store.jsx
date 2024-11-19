import {atom} from 'recoil';
import {serverOptions} from "../pages/component/searchMenu/component/SelectReactOption.js";


export const selectedServerState = atom({
    key: 'selectedServerState',
    default: serverOptions.find(option => option.value === 'lute'), // 기본 서버는 선택되지 않음
});

export const selectedChannelState = atom({
    key: 'selectedChannelState',
    default: { value: 'channel_1', label: '1 채널' }, // 기본 채널은 선택되지 않음
});

export const selectedTradeState = atom({
    key: 'selectedTradeState',
    default: { value: 'tirChonaill', label: '티르 코네일' }, // 기본 교역소는 선택되지 않음
});

export const pouchesState = atom({
    key: 'pouchesState',
    default: null,
});

const createColorState = () => ({
    hex: "#000000",
    rgb: { r: "0", g: "0", b: "0" },
    selectCollection: false,
    selectColorList: JSON.parse(localStorage.getItem(`selectColor`) || "[]"),
    active: false,
    tolerance: 0,
    showDetails: false,
});

export const filterColorState = atom({
    key: 'filterColorState',
    default: { a: createColorState(), b: createColorState(), c: createColorState() },
});

