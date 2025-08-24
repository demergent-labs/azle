# Benchmarks for rejections

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getRejectCodeNoError            | 1_265_925    | 6_265_925 | $0.0000085843 | $8.58             | <font color="green">-66_715</font>  |
| 1   | getRejectCodeDestinationInvalid | 1_190_329    | 6_190_329 | $0.0000084808 | $8.48             | <font color="green">-64_613</font>  |
| 2   | getRejectCodeCanisterReject     | 2_061_024    | 7_061_024 | $0.0000096736 | $9.67             | <font color="green">-130_459</font> |
| 3   | getRejectCodeCanisterError      | 1_192_788    | 6_192_788 | $0.0000084841 | $8.48             | <font color="green">-63_396</font>  |
| 4   | getRejectMessage                | 2_804_570    | 7_804_570 | $0.0000106923 | $10.69            | <font color="green">-125_219</font> |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectCodeNoError            | 1_332_640    | 6_332_640 | $0.0000086757 | $8.67             |
| 1   | getRejectCodeDestinationInvalid | 1_254_942    | 6_254_942 | $0.0000085693 | $8.56             |
| 2   | getRejectCodeCanisterReject     | 2_191_483    | 7_191_483 | $0.0000098523 | $9.85             |
| 3   | getRejectCodeCanisterError      | 1_256_184    | 6_256_184 | $0.0000085710 | $8.57             |
| 4   | getRejectMessage                | 2_929_789    | 7_929_789 | $0.0000108638 | $10.86            |

# Benchmarks for some_canister

## Current benchmarks Azle version: 0.33.0

No benchmarks reported

## Baseline benchmarks Azle version: 0.32.0

No benchmarks reported

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
