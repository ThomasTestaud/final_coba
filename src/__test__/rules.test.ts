import { isCombinationValid, transformStringsIntoNumbers } from '../modules/rules.ts';
import { it, expect, describe } from 'vitest';

describe('transformStringsIntoNumbers', () => {
    // Test with simple dices
    describe('Test with simple dices', () => {
        it('Test empty', () => {
            expect(transformStringsIntoNumbers([[],[]])).toBe([[], []]);
        });
        it('Test GREEN', () => {
            expect(transformStringsIntoNumbers([['GREEN'],[]])).toBe([[1], []]);
        });
        it('Test GREEN reverse', () => {
            expect(transformStringsIntoNumbers([[],['GREEN']])).toBe([[], [1]]);
        });
        it('Test GREY', () => {
            expect(transformStringsIntoNumbers([['GREY'],[]])).toBe([[2], []]);
        });
        it('Test GREY reverse', () => {
            expect(transformStringsIntoNumbers([[],['GREY']])).toBe([[], [2]]);
        });
        it('Test YELLOW', () => {
            expect(transformStringsIntoNumbers([['YELLOW'], []])).toBe([[-1], []]);
        });
        it('Test YELLOW reverse', () => {
            expect(transformStringsIntoNumbers([[], ['YELLOW']])).toBe([[], [-1]]);
        });
        it('Test combinations', () => {
            expect(transformStringsIntoNumbers([['YELLOW', 'GREY'], ['YELLOW']])).toBe([[-1, 0.5, 2], [-1]]);
            expect(transformStringsIntoNumbers([['YELLOW', 'GREY'], ['YELLOW', 'GREEN']])).toBe([[-1, 0.5, 2], [-1, 1]]);
            expect(transformStringsIntoNumbers([['YELLOW', 'GREY'], ['YELLOW', 'GREEN', 'GREY']])).toBe([[-1, 0.5, 2], [-1, 1, 2]]);
        });
    });

    // Test for ORANGE (le scribe)
    describe('Test for ORANGE', () => {
        describe('Test ORANGE odd', () => {
            it('Test ORANGE 1', () => {
                expect(transformStringsIntoNumbers([['ORANGE'],[]])).toBe([[1], []]);
            });
            it('Test ORANGE 1 reverse', () => {
                expect(transformStringsIntoNumbers([[],['ORANGE']])).toBe([[], [1]]);
            });
            it('Test ORANGE 3', () => {
                expect(transformStringsIntoNumbers([['ORANGE', 'GREY', 'GREY'],[]])).toBe([[1, 2, 2], []]);
            });
            it('Test ORANGE 3 reverse', () => {
                expect(transformStringsIntoNumbers([[],['ORANGE', 'GREY', 'GREY']])).toBe([[], [1, 2, 2]]);
            });
            it('Test ORANGE 5', () => {
                expect(transformStringsIntoNumbers([['ORANGE', 'GREY', 'GREY', 'GREEN', 'YELLOW'],[]])).toBe([[1, 2, 2, 1, -1], []]);
            });
            it('Test ORANGE 5 reverse', () => {
                expect(transformStringsIntoNumbers([[],['ORANGE', 'GREY', 'GREY', 'GREEN', 'YELLOW']])).toBe([[], [1, 2, 2, 1, -1]]);
            });
        });
        describe('Test ORANGE even', () => {
            it('Test ORANGE 2', () => {
                expect(transformStringsIntoNumbers([['ORANGE','GREY'],[]])).toBe([[2, 1], []]);
            });
            it('Test ORANGE 2 reverse', () => {
                expect(transformStringsIntoNumbers([[],['ORANGE']])).toBe([[], [2, 1]]);
            });
            it('Test ORANGE 4', () => {
                expect(transformStringsIntoNumbers([['ORANGE', 'GREY', 'GREY', 'GREEN'],[]])).toBe([[2, 2, 2, 1], []]);
            });
            it('Test ORANGE 4 reverse', () => {
                expect(transformStringsIntoNumbers([[],['ORANGE', 'GREY', 'GREY', 'GREEN']])).toBe([[], [2, 2, 2, 1]]);
            });
        });
    });

    // Test for CYAN (le chamane)
    describe('Test for CYAN', () => {
        it('Test CYAN alone', () => {
            expect(transformStringsIntoNumbers([['CYAN'], []])).toBe([[0], []]);
        });
        it('Test CYAN alone reverse', () => {
            expect(transformStringsIntoNumbers([[], ['CYAN']])).toBe([[], [0]]);
        });
        it('Test CYAN with one other', () => {
            expect(transformStringsIntoNumbers([['CYAN'], ['YELLOW']])).toBe([[1], [-1]]);
        });
        it('Test CYAN with one other reverse', () => {
            expect(transformStringsIntoNumbers([['YELLOW'], ['CYAN']])).toBe([[-1], [1]]);
        });
        it('Test CYAN with two others', () => {
            expect(transformStringsIntoNumbers([['CYAN'], ['YELLOW', 'ORANGE']])).toBe([[2], [-1, 0.5]]);
        });
        it('Test CYAN with two others reverse', () => {
            expect(transformStringsIntoNumbers([['YELLOW', 'ORANGE'], ['CYAN']])).toBe([[-1, 0.5], [2]]);
        });
        it('Test CYAN with three others', () => {
            expect(transformStringsIntoNumbers([['CYAN'], ['YELLOW', 'ORANGE', 'GREY']])).toBe([[3], [-1, 0.5, 2]]);
        });
        it('Test CYAN with three others reverse', () => {
            expect(transformStringsIntoNumbers([['YELLOW', 'ORANGE', 'GREY'], ['CYAN']])).toBe([[-1, 0.5, 2], [3]]);
        });
    });

    // Test for PINK (la reine)
    describe('Test for PINK', () => {
        describe('Test PINK alone', () => {
            it('Test PINK alone', () => {
                expect(transformStringsIntoNumbers([['PINK'], []])).toBe([[3], []]);
            });
            it('Test PINK alone reverse', () => {
                expect(transformStringsIntoNumbers([[], ['PINK']])).toBe([[], [3]]);
            });
        });

        describe('Test PINK with one other', () => {
            it('Test PINK with one other', () => {
                expect(transformStringsIntoNumbers([['PINK', 'ORANGE'], []])).toBe([[3, 0], []]);
            });
            it('Test PINK with one other reverse', () => {
                expect(transformStringsIntoNumbers([[], ['PINK', 'ORANGE']])).toBe([[], [3, 0]]);
            });
        });

        describe('Test PINK with two others', () => {
            it('Test PINK with two other of same value', () => {
                expect(transformStringsIntoNumbers([['PINK', 'ORANGE', 'ORANGE'], []])).toBe([[3, 0, 0], []]);
            });
            it('Test PINK with two other of same value reverse', () => {
                expect(transformStringsIntoNumbers([[], ['PINK', 'ORANGE', 'ORANGE']])).toBe([[], [3, 0, 0]]);
            });
            it('Test PINK with two other of different value', () => {
                expect(transformStringsIntoNumbers([['PINK', 'ORANGE', 'YELLOW'], []])).toBe([[3, 1, 0], []]);
            });
            it('Test PINK with two other of different value reverse', () => {
                expect(transformStringsIntoNumbers([[], ['PINK', 'ORANGE', 'YELLOW']])).toBe([[], [3, 1, 0]]);
            });
            it('Test PINK with three other of different value', () => {
                expect(transformStringsIntoNumbers([['PINK', 'ORANGE', 'YELLOW', 'GREY'], []])).toBe([[3, 1, 0, 2], []]);
            });
            it('Test PINK with three other of different value reverse', () => {
                expect(transformStringsIntoNumbers([[], ['PINK', 'ORANGE', 'YELLOW', 'GREY']])).toBe([[], [3, 1, 0, 2]]);
            });
            it('Test PINK with three other and two of same value', () => {
                expect(transformStringsIntoNumbers([['PINK', 'ORANGE', 'YELLOW', 'YELLOW', 'GREY'], []])).toBe([[3, 1, 0, 0, 2], []]);
            });
            it('Test PINK with three other and two of same value reverse', () => {
                expect(transformStringsIntoNumbers([[], ['PINK', 'ORANGE', 'YELLOW', 'YELLOW', 'GREY']])).toBe([[], [3, 1, 0, 0, 2]]);
            });
        });
    });


});

describe('isCombinationValid', () => {
    // Test true
    it('two same arrays of one', () => {
        expect(isCombinationValid([[1], [1]])).toBe(true);
    });
    it('two same arrays of negative', () => {
        expect(isCombinationValid([[-1], [-1]])).toBe(true);
    });
    it('two same arrays of two', () => {
        expect(isCombinationValid([[1, 2], [1, 2]])).toBe(true);
    });
    it('two different arrays of two', () => {
        expect(isCombinationValid([[2, 2], [1, 3]])).toBe(true);
    });
    it('two different arrays of different length', () => {
        expect(isCombinationValid([[5, 2], [1, 2, 4, 1, -1]])).toBe(true);
    });
    // Test false
    it('two different arrays of one', () => {
        expect(isCombinationValid([[1], [2]])).toBe(false);
    });
    it('two different arrays of two', () => {
        expect(isCombinationValid([[1, 5], [2, 1]])).toBe(false);
    });
    it('two different arrays of different length', () => {
        expect(isCombinationValid([[1, 2], [1, 2, 4]])).toBe(false);
    });
});