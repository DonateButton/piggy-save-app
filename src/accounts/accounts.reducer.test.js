import { addAccount, accounts, removeAccount } from './accounts.reducer';

describe('#accounts reducer', ()=>
{
    describe("#addAccount", ()=>
    {
        it('adds an account', ()=>
        {
            const state = addAccount({accounts: []}, {account: 'a'});
            const accounts = state.accounts;
            expect(accounts).toContain('a');
        });
        it('adds an account', ()=>
        {
            const state = addAccount({accounts: []}, {account: {id: 1, name: 'cow'}});
            const accounts = state.accounts;
            expect(accounts).toContainEqual({id: 1, name: 'cow'});
        });
    });
    describe("#accounts", ()=>
    {
        it('deals with whack events', ()=>
        {
            const state = accounts({accounts: []}, 'moo');
            const accountsList = state.accounts;
            expect(accountsList).toHaveLength(0);
        });
        it('adds an account with that action', ()=>
        {
            const state = accounts({accounts: []}, {type: 'ADD_ACCOUNT', account: 'a'});
            const accountsList = state.accounts;
            expect(accountsList).toHaveLength(1);
        });
    });
    describe("#removeAccount", ()=>
    {
        it('removes account you find', ()=>
        {
            const state = removeAccount({accounts: [
                {id: 1, name: 'cow'},
                {id: 2, name: 'moo'}
            ]}, {account: {id: 1, name: 'cow'}});
            const accounts = state.accounts;
            expect(accounts).toHaveLength(1);
        });
        it('changes nothing if no account', ()=>
        {
            const state = removeAccount({accounts: [
                {id: 1, name: 'cow'},
                {id: 2, name: 'moo'}
            ]}, {account: {id: 3, name: 'wat'}});
            const accounts = state.accounts;
            expect(accounts).toHaveLength(2);
        });
    });
});