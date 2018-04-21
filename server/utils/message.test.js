const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', function () {
        let from = 'Jen';
        let text = 'Some message';
        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        // expect(message.from).toMatchObject({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', function () {
        let from = 'Deb';
        let latitude = 15;
        let longitude = 19;
        let url = 'https://www.google.com/maps?q=15,19'
        let message = generateLocationMessage(from, latitude, longitude);

        expect(typeof message.createdAt).toBe('number');
        // expect(message.from).toMatchObject({from, url});
    });
});