import { addAccount, accounts, removeAccount } from './accounts.reducer';

describe('#accounts reducer', ()=>
{
    describe("#addAccount", ()=>
    {
        it('adds an account', ()=>
        {
            expect(addAccount([], {account: 'a'})).toContain('a');
        });
        it('adds an account', ()=>
        {
            expect(addAccount([], {account: {id: 1, name: 'cow'}})).toContainEqual({id: 1, name: 'cow'});
        });
    });
    describe("#accounts", ()=>
    {
        it('deals with whack events', ()=>
        {
            expect(accounts([], 'moo')).toHaveLength(0);
        });
        it('adds an account with that action', ()=>
        {
            expect(accounts([], {type: 'ADD_ACCOUNT', account: 'a'})).toHaveLength(1);
        });
    });
    describe("#removeAccount", ()=>
    {
        it('removes account you find', ()=>
        {
            expect(removeAccount([
                {id: 1, name: 'cow'},
                {id: 2, name: 'moo'}
            ], {account: {id: 1, name: 'cow'}})).toHaveLength(1);
        });
        it('changes nothing if no account', ()=>
        {
            expect(removeAccount([
                {id: 1, name: 'cow'},
                {id: 2, name: 'moo'}
            ], {account: {id: 3, name: 'wat'}})).toHaveLength(2);
        });
    });
});