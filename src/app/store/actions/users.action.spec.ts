import { User } from './../../core/models/user';
import * as fromUsers from './users.action';

describe('Users Actions', () => {
    describe(`LoadUsers Actions`, () => {
        describe(`LoadUsers`, () => {
            it(`should create an action`, () => {
                const action = new fromUsers.LoadUsers();

                expect({ ...action }).toEqual({
                    type: fromUsers.LOAD_ALL_USERS
                });
            });
        });
        describe(`LoadUsersFail`, () => {
            it(`should create an action`, () => {
                const payload = { message: 'Load Error' };
                const action = new fromUsers.LoadUsersFail(payload);

                expect({ ...action }).toEqual({ type: fromUsers.LOAD_ALL_USERS_FAIL, payload });
            });
        });
        describe(`LoadUsersSuccess`, () => {
            it(`should create an action`, () => {
                const payload: User[] = [
                    {
                        full_name: 'John Doe',
                        first_name: 'John',
                        last_name: 'Doe'
                    }
                ];
                const action = new fromUsers.LoadUsersSuccess(payload);

                expect({ ...action }).toEqual({ type: fromUsers.LOAD_ALL_USERS_SUCCESS, payload });
            });
        });
    });
});

describe('Create User Actions', () => {
    describe(`CreateUser`, () => {
        it(`should create an action`, () => {
            const payload: User = { full_name: 'John Doe', first_name: 'John', last_name: 'Doe' };
            const action = new fromUsers.CreateUser(payload);

            expect({ ...action }).toEqual({ type: fromUsers.CREATE_USER, payload });
        });
    });
    describe(`CreateUserFail`, () => {
        it(`should create an action`, () => {
            const payload = { message: 'Load Error' };
            const action = new fromUsers.CreateUserFail(payload);

            expect({ ...action }).toEqual({ type: fromUsers.CREATE_USER_FAIL, payload });
        });
    });
    describe(`CreateUserSuccess`, () => {
        it(`should create an action`, () => {
            const payload: User = { full_name: 'John Doe', first_name: 'John', last_name: 'Doe' };
            const action = new fromUsers.CreateUserSuccess(payload);

            expect({ ...action }).toEqual({ type: fromUsers.CREATE_USER_SUCCESS, payload });
        });
    });
});
