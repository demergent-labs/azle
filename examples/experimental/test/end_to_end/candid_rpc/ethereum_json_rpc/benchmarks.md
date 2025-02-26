# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 5_091_068_837 | 4_037_017_534 | $0.0053679011 | $5_367.90         | <font color="green">-3_149_471</font> |
| 1   | ethGetBalance       | 179_728_631   | 72_481_452    | $0.0000963764 | $96.37            | <font color="green">-1_912_997</font> |
| 2   | ethGetBalance       | 179_940_975   | 72_566_390    | $0.0000964894 | $96.48            | <font color="green">-1_682_695</font> |
| 3   | ethGetBalance       | 179_751_931   | 72_490_772    | $0.0000963888 | $96.38            | <font color="green">-1_670_036</font> |
| 4   | ethGetBlockByNumber | 178_620_377   | 72_038_150    | $0.0000957870 | $95.78            | <font color="green">-1_865_191</font> |
| 5   | ethGetBlockByNumber | 178_513_121   | 71_995_248    | $0.0000957299 | $95.72            | <font color="green">-1_999_023</font> |
| 6   | ethGetBlockByNumber | 178_689_355   | 72_065_742    | $0.0000958237 | $95.82            | <font color="green">-1_730_733</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_094_218_308 | 4_038_277_323 | $0.0053695762 | $5_369.57         |
| 1   | ethGetBalance       | 181_641_628   | 73_246_651    | $0.0000973939 | $97.39            |
| 2   | ethGetBalance       | 181_623_670   | 73_239_468    | $0.0000973843 | $97.38            |
| 3   | ethGetBalance       | 181_421_967   | 73_158_786    | $0.0000972770 | $97.27            |
| 4   | ethGetBlockByNumber | 180_485_568   | 72_784_227    | $0.0000967790 | $96.77            |
| 5   | ethGetBlockByNumber | 180_512_144   | 72_794_857    | $0.0000967931 | $96.79            |
| 6   | ethGetBlockByNumber | 180_420_088   | 72_758_035    | $0.0000967442 | $96.74            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
