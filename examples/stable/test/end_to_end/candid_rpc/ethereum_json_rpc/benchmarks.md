# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 1_444_930_445 | 978_562_178 | $0.0013011648 | $1_301.16         | <font color="red">+321_999_886</font> |
| 1   | ethGetBalance       | 26_931_803    | 11_362_721  | $0.0000151087 | $15.10            | <font color="green">-1_002_961</font> |
| 2   | ethGetBalance       | 26_871_426    | 11_338_570  | $0.0000150766 | $15.07            | <font color="green">-1_020_811</font> |
| 3   | ethGetBalance       | 26_593_236    | 11_227_294  | $0.0000149286 | $14.92            | <font color="green">-1_298_344</font> |
| 4   | ethGetBlockByNumber | 25_350_422    | 10_730_168  | $0.0000142676 | $14.26            | <font color="green">-1_506_503</font> |
| 5   | ethGetBlockByNumber | 25_341_733    | 10_726_693  | $0.0000142630 | $14.26            | <font color="green">-1_481_746</font> |
| 6   | ethGetBlockByNumber | 25_336_678    | 10_724_671  | $0.0000142603 | $14.26            | <font color="green">-1_492_404</font> |

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
