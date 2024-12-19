# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 1_454_756_152 | 982_492_460 | $0.0013063907 | $1_306.39         | <font color="red">+331_825_593</font> |
| 1   | ethGetBalance       | 26_840_539    | 11_326_215  | $0.0000150601 | $15.06            | <font color="green">-1_094_225</font> |
| 2   | ethGetBalance       | 26_785_741    | 11_304_296  | $0.0000150310 | $15.03            | <font color="green">-1_106_496</font> |
| 3   | ethGetBalance       | 26_546_351    | 11_208_540  | $0.0000149037 | $14.90            | <font color="green">-1_345_229</font> |
| 4   | ethGetBlockByNumber | 25_359_174    | 10_733_669  | $0.0000142722 | $14.27            | <font color="green">-1_497_751</font> |
| 5   | ethGetBlockByNumber | 25_314_016    | 10_715_606  | $0.0000142482 | $14.24            | <font color="green">-1_509_463</font> |
| 6   | ethGetBlockByNumber | 25_323_862    | 10_719_544  | $0.0000142535 | $14.25            | <font color="green">-1_505_220</font> |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                | 1_122_930_559 | 849_762_223 | $0.0011299033 | $1_129.90         |
| 1   | ethGetBalance       | 27_934_764    | 11_763_905  | $0.0000156421 | $15.64            |
| 2   | ethGetBalance       | 27_892_237    | 11_746_894  | $0.0000156195 | $15.61            |
| 3   | ethGetBalance       | 27_891_580    | 11_746_632  | $0.0000156191 | $15.61            |
| 4   | ethGetBlockByNumber | 26_856_925    | 11_332_770  | $0.0000150688 | $15.06            |
| 5   | ethGetBlockByNumber | 26_823_479    | 11_319_391  | $0.0000150511 | $15.05            |
| 6   | ethGetBlockByNumber | 26_829_082    | 11_321_632  | $0.0000150540 | $15.05            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
