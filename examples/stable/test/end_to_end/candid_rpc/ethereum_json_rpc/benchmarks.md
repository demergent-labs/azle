# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 1_454_756_152 | 982_492_460 | $0.0013063907 | $1_306.39         | <font color="red">+9_825_707</font> |
| 1   | ethGetBalance       | 26_840_520    | 11_326_208  | $0.0000150601 | $15.06            | <font color="green">-91_283</font>  |
| 2   | ethGetBalance       | 26_785_817    | 11_304_326  | $0.0000150310 | $15.03            | <font color="green">-85_609</font>  |
| 3   | ethGetBalance       | 26_546_450    | 11_208_580  | $0.0000149037 | $14.90            | <font color="green">-46_786</font>  |
| 4   | ethGetBlockByNumber | 25_359_105    | 10_733_642  | $0.0000142722 | $14.27            | <font color="red">+8_683</font>     |
| 5   | ethGetBlockByNumber | 25_314_131    | 10_715_652  | $0.0000142483 | $14.24            | <font color="green">-27_602</font>  |
| 6   | ethGetBlockByNumber | 25_323_862    | 10_719_544  | $0.0000142535 | $14.25            | <font color="green">-12_816</font>  |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                | 1_444_930_445 | 978_562_178 | $0.0013011648 | $1_301.16         |
| 1   | ethGetBalance       | 26_931_803    | 11_362_721  | $0.0000151087 | $15.10            |
| 2   | ethGetBalance       | 26_871_426    | 11_338_570  | $0.0000150766 | $15.07            |
| 3   | ethGetBalance       | 26_593_236    | 11_227_294  | $0.0000149286 | $14.92            |
| 4   | ethGetBlockByNumber | 25_350_422    | 10_730_168  | $0.0000142676 | $14.26            |
| 5   | ethGetBlockByNumber | 25_341_733    | 10_726_693  | $0.0000142630 | $14.26            |
| 6   | ethGetBlockByNumber | 25_336_678    | 10_724_671  | $0.0000142603 | $14.26            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
