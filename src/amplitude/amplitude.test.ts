import { describe, expect, test } from 'vitest';
import { maskereFodselsnummer } from './amplitude';

describe('Test maskering av fnr før data sendes til amplitude', () => {
    test('Maskering av fnr i objekt av strings', () => {
        const umaskertObjekt = { fnr: '12345678910', name: 'test' };
        const maskertObjekt = maskereFodselsnummer(umaskertObjekt);
        expect(maskertObjekt.fnr).to.equal('***********');
    });
    test('Maskering av fnr i objekt av number', () => {
        const umaskertObjekt = { fnr: 12345678910, name: 'test' };
        const maskertObjekt = maskereFodselsnummer(umaskertObjekt);
        expect(maskertObjekt.fnr).to.equal('***********');
    });
    test('Maskering av fnr i objekt av div typer', () => {
        const umaskertObjekt = { verdier: [12345678910, '19876543210', 'annen verdi'], name: 'test', nr: 12344 };
        const maskertObjekt = maskereFodselsnummer(umaskertObjekt);
        expect(maskertObjekt.verdier[0]).to.equal('***********');
        expect(maskertObjekt.verdier[1]).to.equal('***********');
        expect(maskertObjekt.verdier[2]).to.equal('annen verdi');
    });
});
