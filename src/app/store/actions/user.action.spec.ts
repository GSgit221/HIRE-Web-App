import { User } from './../../models/user';
import * as fromUser from './user.action';

describe('User Actions', () => {
    describe(`LoadUser Actions`, () => {
        describe(`LoadUser`, () => {
            it(`should create an action`, () => {
                const action = new fromUser.LoadUser();

                expect({ ...action }).toEqual({
                    type: fromUser.LOAD_USER
                });
            });
        });
        describe(`LoadUserFail`, () => {
            it(`should create an action`, () => {
                const payload = { message: 'Load Error' };
                const action = new fromUser.LoadUserFail(payload);

                expect({ ...action }).toEqual({ type: fromUser.LOAD_USER_FAIL, payload });
            });
        });
        describe(`LoadUserSuccess`, () => {
            it(`should create an action`, () => {
                const payload: User = {
                    full_name: 'John Doe',
                    first_name: 'John',
                    last_name: 'Doe'
                };
                const action = new fromUser.LoadUserSuccess(payload);

                expect({ ...action }).toEqual({ type: fromUser.LOAD_USER_SUCCESS, payload });
            });
        });
    });
});
