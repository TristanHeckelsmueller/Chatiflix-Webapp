
const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },{
            id: '2',
            name: 'Jen',
            room: 'React Course'
        },{
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }];

    });

    it('should add new user', function () {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Andrew',
            room: 'test room'
        };
        let resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', function () {
        let userId = '1';
        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
    it('should not remove user', function () {
        let userId = '99';
        let user = users.removeUser(userId);

        expect(user).toBeFalsy(userId);
        expect(users.users.length).toBe(3);
    });
    it('should find user', function () {
        let userId = '2';
        let user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });
    it('should not find user', function () {
        let userId = '99';
        let user = users.getUser(userId);
        expect(user.id).toBeFalsy();
    });

    it('should return names for Node Course', function () {
        let userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Julie']);
    });
    it('should return names for React Course', function () {
        let userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jen']);
    });
});

