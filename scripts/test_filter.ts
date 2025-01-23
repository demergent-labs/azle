// Mock the data structures as they would appear for index.ts

const mockMethodMeta = {
    queries: [
        {
            name: 'simpleQuery',
            index: 0,
            hidden: undefined
        },
        {
            name: 'hiddenQuery',
            index: 1,
            hidden: true
        },
        {
            name: 'visibleQuery',
            index: 2,
            hidden: false
        }
    ],
    updates: []
};

// Mock of _azleCanisterMethodIdlParamTypes
const mockCanisterMethodIdlParamTypes = {
    simpleQuery: {
        argTypes: [],
        returnType: [{ type: 'text' }],
        annotations: ['query']
    },
    hiddenQuery: {
        argTypes: [],
        returnType: [{ type: 'text' }],
        annotations: ['query']
    },
    visibleQuery: {
        argTypes: [],
        returnType: [{ type: 'text' }],
        annotations: ['query']
    }
};

// The filtering logic we're debugging
const visibleMethodIdlParamTypes = Object.fromEntries(
    Object.entries(mockCanisterMethodIdlParamTypes).filter(([methodName]) => {
        const { queries = [], updates = [] } = mockMethodMeta;
        const allMethods = [...queries, ...updates];
        const method = allMethods.find((m) => m.name === methodName);
        console.log('Method:', method);
        console.log('Hidden:', method?.hidden);
        return !method?.hidden;
    })
);

console.log(
    '\nOriginal methods:',
    Object.keys(mockCanisterMethodIdlParamTypes)
);
console.log('Filtered methods:', Object.keys(visibleMethodIdlParamTypes));
