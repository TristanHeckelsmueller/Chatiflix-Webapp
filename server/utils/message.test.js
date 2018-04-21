const expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', function () {
        let from = 'Jen';
        let text = 'Some message';
        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        // expect(message.from).toMatchObject({from, text});
    });
});