# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 5_092_822_610 | 4_037_719_044 | $0.0053688339 | $5_368.83         | <font color="red">+1_753_773</font> |
| 1   | ethGetBalance       | 180_891_236   | 72_946_494    | $0.0000969948 | $96.99            | <font color="red">+1_162_605</font> |
| 2   | ethGetBalance       | 180_797_213   | 72_908_885    | $0.0000969448 | $96.94            | <font color="red">+856_238</font>   |
| 3   | ethGetBalance       | 180_766_003   | 72_896_401    | $0.0000969282 | $96.92            | <font color="red">+1_014_072</font> |
| 4   | ethGetBlockByNumber | 179_830_878   | 72_522_351    | $0.0000964308 | $96.43            | <font color="red">+1_210_501</font> |
| 5   | ethGetBlockByNumber | 179_688_833   | 72_465_533    | $0.0000963552 | $96.35            | <font color="red">+1_175_712</font> |
| 6   | ethGetBlockByNumber | 179_679_226   | 72_461_690    | $0.0000963501 | $96.35            | <font color="red">+989_871</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_091_068_837 | 4_037_017_534 | $0.0053679011 | $5_367.90         |
| 1   | ethGetBalance       | 179_728_631   | 72_481_452    | $0.0000963764 | $96.37            |
| 2   | ethGetBalance       | 179_940_975   | 72_566_390    | $0.0000964894 | $96.48            |
| 3   | ethGetBalance       | 179_751_931   | 72_490_772    | $0.0000963888 | $96.38            |
| 4   | ethGetBlockByNumber | 178_620_377   | 72_038_150    | $0.0000957870 | $95.78            |
| 5   | ethGetBlockByNumber | 178_513_121   | 71_995_248    | $0.0000957299 | $95.72            |
| 6   | ethGetBlockByNumber | 178_689_355   | 72_065_742    | $0.0000958237 | $95.82            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
