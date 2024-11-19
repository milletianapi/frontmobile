export const tradeStyles = {
    control: (provided) => ({
        ...provided,
        width: 139,
        height: 21,
        fontSize: 10,
        minHeight: '20px',
        minWidth: '10px',
        alignItems: 'center',
        padding: '0px',
        border: `1px solid #FFCCE6`,
        borderRadius: '5px',
    }),
    valueContainer: (provided) => ({
        ...provided,
        height: '21px',
        padding: '0px 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',  // 가로 중앙 정렬 설정
        color: '#2E2E2E',
    }),
    placeholder: (provided) => ({
        ...provided,
        margin: '0px',
        marginTop: '2px',
        padding: '0px',
        transform: 'translateY(-1px)',
        color: '#2E2E2E',
    }),
    singleValue: (provided) => ({
        ...provided,
        margin: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2E2E2E',
    }),
    input: (provided) => ({
        ...provided,
        margin: '0px',
        padding: '0px',
        color: '#2E2E2E',
        textAlign: 'center',       // 텍스트 중앙 정렬
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: '21px',
        width: '21px',
        padding: '0px',
        backgroundColor: `#D5B8E6`,
        transform: 'translate(1px, -1px)',
        borderRadius: '5px',
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        width: '0px',
        minWidth: '0px',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: '0px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        color: '#2E2E2E',
    }),
    menu: (provided) => ({
        ...provided,
        margin: `1px`,
        width: 139,
        border: `1px solid #FFCCE6`,
        borderRadius: `5px`,
    }),
    menuList: (provided) => ({
        ...provided,
        margin: `0px`,
        padding: '0px',
    }),
    option: (provided, state) => ({
        ...provided,
        height: 21,
        padding: '7px 8px',
        backgroundColor: state.isSelected ? '#BAA0E1' : state.isFocused ? `#BAA0E1` : 'white',
        color: `black`,
        cursor: 'pointer',
        borderRadius: `5px`,
    }),
};


export const channelStyles = {
    control: (provided) => ({
        ...provided,
        width: 89,
        height: 21,
        fontSize: 10,
        minHeight: '21px',
        minWidth: '10px',
        alignItems: 'center',
        padding: '0px',
        border: `1px solid #FFCCE6`,
        borderRadius: '5px',
    }),
    valueContainer: (provided) => ({
        ...provided,
        height: '21px',
        padding: '0px 8px',
        display: 'flex',
        alignItems: 'center',
        textColor: '#2E2E2E',
    }),
    placeholder: (provided) => ({
        ...provided,
        margin: '0px',
        padding: '0px',
        transform: 'translateY(-1px)',
        color: '#2E2E2E',
    }),
    singleValue: (provided) => ({
        ...provided,
        margin: '0px',
        padding: '0px',
        color: '#2E2E2E',
    }),
    input: (provided) => ({
        ...provided,
        margin: '0px',
        padding: '0px',
        color: '#2E2E2E'
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: '21px',
        width: '21px',
        padding: '0px',
        backgroundColor: `#D5B8E6`,
        transform: 'translate(1px, -1px)',
        borderRadius: '5px',
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        width: '0px',
        minWidth: '0px',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: '0px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        color: '#2E2E2E',
    }),
    menu: (provided) => ({
        ...provided,
        marginTop: `1px`,
        width: 89,
        border: `1px solid #FFCCE6`,
        borderRadius: `5px`,
    }),
    menuList: (provided) => ({
        ...provided,
        margin: `0px`,
        padding: '0px',
    }),
    option: (provided, state) => ({
        ...provided,
        height: 21,
        padding: '7px 8px',
        backgroundColor: state.isSelected ? '#BAA0E1' : state.isFocused ? `#BAA0E1` : 'white',
        color: `black`,
        cursor: 'pointer',
        borderRadius: `5px`,
    }),
};

export const serverOptions = [
    { value: 'lute', label: '류트' },
    { value: 'harp', label: '하프' },
    { value: 'mandolin', label: '만돌린' },
    { value: 'wolf', label: '울프' },
];

export const channelOptions = {
    lute: Array.from({ length: 42 }, (_, i) => ({ value: `channel_${i + 1}`, label: `${i + 1} 채널` })),
    harp: Array.from({ length: 24 }, (_, i) => ({ value: `channel_${i + 1}`, label: `${i + 1} 채널` })),
    mandolin: Array.from({ length: 15 }, (_, i) => ({ value: `channel_${i + 1}`, label: `${i + 1} 채널` })),
    wolf: Array.from({ length: 15 }, (_, i) => ({ value: `channel_${i + 1}`, label: `${i + 1} 채널` })),
};

export const tradeOptionsUladh = [
    { value: 'tirChonaill', label: '티르 코네일' },
    { value: 'dunbarton', label: '던바튼' },
    { value: 'bangor', label: '반호르' },
    { value: 'emainMacha', label: '이멘마하' },
    { value: 'taillteann', label: '탈틴' },
    { value: 'tara', label: '타라' },
    { value: 'portCobhr', label: '카브항구' },
];

export const tradeOptionsBelfast = [
    { value: 'belvast', label: '벨바스트' },
    { value: 'beachOfScathach', label: '스카하 해변' },
];
export const tradeOptionsIria = [
    { value: 'qillaBaseCamp', label: '켈라 베이스 캠프' },
    { value: 'filia', label: '필리아' },
    { value: 'vales', label: '발레스' },
    { value: 'cor', label: '코르' },
    {value: 'calidaExplorationCamp', label: '칼리다 탐사 캠프'},
    { value: 'oasis', label: '오아시스' },
    { value: 'caruForest', label: '카루 숲' },
    { value: 'pela', label: '페라 화산' },
];
export default {customStyles: tradeStyles, serverOptions, channelOptions, tradeOptions: tradeOptionsUladh}