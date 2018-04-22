const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', function () {
        let res = isRealString(98);
        expect(res).toBe(false);
    });
    it('should reject string with only spaces', function () {
        let res = isRealString('      ');
        expect(res).toBe(false);
    });
    it('should allow string with non-space characters', function () {
        let res = isRealString('  Andrew  ');
        expect(res).toBe(true);
    });
});