import { IDL } from './index';
import { Parent, processMap } from './utils';

// Without this default constructor we get errors when initializing variants and
// records. While the decorators are able to add constructors they are not
// communicating that change to the type checker. If we can get it to do that
// then we can get rid of this class
export abstract class Variant {
    static create<T extends Constructor>(
        this: T,
        props: RequireExactlyOne<InstanceType<T>>
    ): InstanceType<T> {
        return new this(props) as InstanceType<T>;
    }
    constructor(args: any) {
        if (Object.entries(args).length !== 1) {
            throw 'Wrong number of properties. Variant should only have one';
        }

        const variant = Object.keys(args)[0];

        // @ts-ignore
        if (!this.constructor._azleCandidMap[variant]) {
            throw `${variant} is not a valid option for this variant`;
        }

        // @ts-ignore
        this[variant] = args[variant];
    }

    static getIDL(parents: Parent[]) {
        const idl = IDL.Rec();
        const processedMap = processMap(this._azleCandidMap, [
            ...parents,
            {
                idl: idl,
                name: this.name
            }
        ]);
        idl.fill(IDL.Variant(processedMap));
        return idl;
    }
}

type Constructor<T = {}> = new (...args: any[]) => T;

export type RequireExactlyOne<
    ObjectType,
    KeysType extends keyof ObjectType = keyof ObjectType
> = {
    [Key in KeysType]: Required<Pick<ObjectType, Key>> &
        Partial<Record<Exclude<KeysType, Key>, never>>;
}[KeysType] &
    Omit<ObjectType, KeysType>;
