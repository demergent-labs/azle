# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 1_126_285_653 | 851_104_261 | $0.0011316878 | $1_131.68         | <font color="green">-318_644_792</font> |
| 1   | ethGetBalance       | 28_855_839    | 12_132_335  | $0.0000161320 | $16.13            | <font color="red">+1_924_036</font>     |
| 2   | ethGetBalance       | 28_788_817    | 12_105_526  | $0.0000160964 | $16.09            | <font color="red">+1_917_391</font>     |
| 3   | ethGetBalance       | 28_779_424    | 12_101_769  | $0.0000160914 | $16.09            | <font color="red">+2_186_188</font>     |
| 4   | ethGetBlockByNumber | 27_597_903    | 11_629_161  | $0.0000154629 | $15.46            | <font color="red">+2_247_481</font>     |
| 5   | ethGetBlockByNumber | 27_604_049    | 11_631_619  | $0.0000154662 | $15.46            | <font color="red">+2_262_316</font>     |
| 6   | ethGetBlockByNumber | 27_580_337    | 11_622_134  | $0.0000154536 | $15.45            | <font color="red">+2_243_659</font>     |

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
