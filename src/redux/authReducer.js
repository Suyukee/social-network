import { authAPI } from '../api/api';

const SET_USER_DATA = 'SET-USER-DATA';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';

let initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	isFetching: false, // Доделать
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payload,
			};
		case TOGGLE_IS_FETCHING:
			return { ...state, isFetching: action.isFetching };
		default:
			return state;
	}
};

export const setAuthUserData = (userId, email, login, isAuth) => ({
	type: SET_USER_DATA,
	payload: { userId, email, login, isAuth },
});
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getAuthUserData = () => (dispatch) => {
	return authAPI.me().then((data) => {
		if (data.resultCode === 0) {
			let { id, email, login } = data.data;
			dispatch(setAuthUserData(id, email, login, true));
		}
	});
};
export const login = (email, password, rememberMe, setStatus) => (dispatch) => {
	authAPI.login(email, password, rememberMe).then((data) => {
		if (data.resultCode === 0) {
			dispatch(getAuthUserData());
		} else {
			setStatus(data.messages);
		}
	});
};
export const logout = () => (dispatch) => {
	authAPI.logout().then((data) => {
		if (data.resultCode === 0) {
			dispatch(setAuthUserData(null, null, null, false));
		}
	});
};

export default authReducer;
