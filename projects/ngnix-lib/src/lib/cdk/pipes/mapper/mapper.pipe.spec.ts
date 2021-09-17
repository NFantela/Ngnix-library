import { MapperPipe, MapperPipeType} from './mapper.pipe';

describe('Mapper pipe', () => {
    let pipe: MapperPipe;
    const data = 'test';
    const args = ['three', 'eleven'];
    const mapper: MapperPipeType<string, string> = (item, ...rest) =>
        item.toUpperCase() + rest.join(' ');

    beforeEach(() => {
        pipe = new MapperPipe();
    });

    it('Mapper works', () => {
        expect(pipe.transform(data, mapper)).toBe(data.toUpperCase());
    });

    it('Works with extra arguments', () => {
        expect(pipe.transform(data, mapper, ...args)).toEqual('TESTthree eleven');
    });
});
