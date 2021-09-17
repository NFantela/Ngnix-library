import {Pipe, PipeTransform} from '@angular/core';

export type MapperPipeType<T, G> = (item: T, ...args: unknown[]) => G;

@Pipe({name: 'mapper'})
export class MapperPipe implements PipeTransform {
    /**
     * Maps object to an arbitrary result through a mapper function
     *
     * @param value an item to transform
     * @param mapper a mapping function
     * @param args arbitrary number of additional arguments
     */
    transform<T, G>(value: T, mapper: MapperPipeType<T, G>, ...args: unknown[]): G {
        return mapper(value, ...args);
    }
}
