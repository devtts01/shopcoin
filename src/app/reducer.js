import { SET, TOGGLE } from './actions';
import { localStoreUtils } from '../utils';

const userStore = localStoreUtils.getStore();

const initialState = {
    set: {
        currentUser: userStore,
        accountMenu: null,
        statusCurrent: '',
        statusUpdate: '',
        bankValue: '',
        tokenResetPwd: '',
        sort: 'asc',
        message: {
            del: '',
            upd: '',
            cre: '',
            error: '',
        },
        form: {
            username: '',
            email: '',
            password: '',
            otpCode: '',
        },
        pagination: {
            page: 1,
            show: 10, //10,20,30,50
        },
        totalDeposit: '',
        totalWithdraw: '',
        totalBalance: '',
        totalCommission: '',
        dataUserBalance: [],
        data: {
            dataDeposits: [],
            dataWithdraw: [],
            dataUser: [],
        },
        searchValues: {
            dateFrom: '',
            dateTo: '',
            userBalance: '',
            deposits: '',
            withdraw: '',
            user: '',
            coin: '',
            bank: '',
            buyHistory: '',
            sellHistory: '',
        },
        edit: {
            id: '',
            data: null,
            itemData: null,
        },
    },
    toggle: {
        modalDepositsEdit: false,
        modalWithdrawEdit: false,
        modalDelete: false,
        modalStatus: false,
        modalWithdraw: false,
        alertModal: false,
        selectStatus: false,
        selectBank: false,
    },
};

const setData = (payload) => {
    return {
        type: SET,
        payload,
    };
};
const toggleModal = (payload) => {
    return {
        type: TOGGLE,
        payload,
    };
};

const reducer = (state, action) => {
    switch (action.type) {
        case SET:
            return {
                ...state,
                set: {
                    ...state.set,
                    ...action.payload,
                },
            };
        case TOGGLE:
            return {
                ...state,
                toggle: {
                    ...state.toggle,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};
export { initialState, setData, toggleModal };
export default reducer;
