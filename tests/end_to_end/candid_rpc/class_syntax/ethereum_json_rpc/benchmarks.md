# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 1_455_221_503 | 982_678_601 | $0.0013066383 | $1_306.63         | <font color="red">+332_290_944</font> |
| 1   | ethGetBalance       | 26_855_295    | 11_332_118  | $0.0000150680 | $15.06            | <font color="green">-1_079_469</font> |
| 2   | ethGetBalance       | 26_793_474    | 11_307_389  | $0.0000150351 | $15.03            | <font color="green">-1_098_763</font> |
| 3   | ethGetBalance       | 26_477_923    | 11_181_169  | $0.0000148673 | $14.86            | <font color="green">-1_413_657</font> |
| 4   | ethGetBlockByNumber | 25_301_669    | 10_710_667  | $0.0000142417 | $14.24            | <font color="green">-1_555_256</font> |
| 5   | ethGetBlockByNumber | 25_312_400    | 10_714_960  | $0.0000142474 | $14.24            | <font color="green">-1_511_079</font> |
| 6   | ethGetBlockByNumber | 25_334_240    | 10_723_696  | $0.0000142590 | $14.25            | <font color="green">-1_494_842</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

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

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
