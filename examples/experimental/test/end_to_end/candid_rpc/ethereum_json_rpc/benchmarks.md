# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 5_136_506_752 | 4_055_192_700 | $0.0053920681 | $5_392.06         | <font color="red">+37_516_071</font>  |
| 1   | ethGetBalance       | 181_948_236   | 73_369_294    | $0.0000975569 | $97.55            | <font color="red">+154_126_693</font> |
| 2   | ethGetBalance       | 181_989_567   | 73_385_826    | $0.0000975789 | $97.57            | <font color="red">+154_192_112</font> |
| 3   | ethGetBalance       | 182_078_105   | 73_421_242    | $0.0000976260 | $97.62            | <font color="red">+154_265_834</font> |
| 4   | ethGetBlockByNumber | 180_873_771   | 72_939_508    | $0.0000969855 | $96.98            | <font color="red">+154_042_318</font> |
| 5   | ethGetBlockByNumber | 180_891_603   | 72_946_641    | $0.0000969950 | $96.99            | <font color="red">+154_060_141</font> |
| 6   | ethGetBlockByNumber | 180_933_634   | 72_963_453    | $0.0000970173 | $97.01            | <font color="red">+154_093_791</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_098_990_681 | 4_040_186_272 | $0.0053721145 | $5_372.11         |
| 1   | ethGetBalance       | 27_821_543    | 11_718_617    | $0.0000155819 | $15.58            |
| 2   | ethGetBalance       | 27_797_455    | 11_708_982    | $0.0000155691 | $15.56            |
| 3   | ethGetBalance       | 27_812_271    | 11_714_908    | $0.0000155770 | $15.57            |
| 4   | ethGetBlockByNumber | 26_831_453    | 11_322_581    | $0.0000150553 | $15.05            |
| 5   | ethGetBlockByNumber | 26_831_462    | 11_322_584    | $0.0000150553 | $15.05            |
| 6   | ethGetBlockByNumber | 26_839_843    | 11_325_937    | $0.0000150598 | $15.05            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
