import { StableBTreeMap } from 'azle';

let withoutTypeParams = new StableBTreeMap(0, 10, 100);
let withIncorrectTypeParams = new StableBTreeMap<string>(0, 10, 100);
let withoutArgs = new StableBTreeMap<string, string>();
let withIncorrectArgs = new StableBTreeMap<string, string>('withIncorrectArgs');
const args = ['stableMap', 100, 1000];
let withSpreadArgs = new StableBTreeMap<string, string>(...args);
let withNonNumberLiteralMemoryId = new StableBTreeMap<string, string>(
    'stableMap4',
    10,
    100
);
let withOutOfRangeMemoryId = new StableBTreeMap<string, string>(300, 10, 100);
let withFloatMemoryId = new StableBTreeMap<string, string>(100.5, 10, 100);
let withLargeSecondParam = new StableBTreeMap<string, string>(
    0,
    4_294_967_296,
    100
);
let withLargeThirdParam = new StableBTreeMap<string, string>(
    0,
    100,
    4_294_967_296
);
