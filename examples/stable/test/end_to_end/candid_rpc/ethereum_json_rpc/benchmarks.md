# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 1_105_533_227 | 842_803_290 | $0.0011206503 | $1_120.65         | <font color="green">-5_136_335</font> |
| 1   | ethGetBalance       | 28_585_242    | 12_024_096  | $0.0000159881 | $15.98            | <font color="green">-80_259</font>    |
| 2   | ethGetBalance       | 28_493_014    | 11_987_205  | $0.0000159390 | $15.93            | <font color="green">-83_009</font>    |
| 3   | ethGetBalance       | 28_531_107    | 12_002_442  | $0.0000159593 | $15.95            | <font color="green">-79_419</font>    |
| 4   | ethGetBlockByNumber | 27_310_024    | 11_514_009  | $0.0000153098 | $15.30            | <font color="green">-85_464</font>    |
| 5   | ethGetBlockByNumber | 27_286_306    | 11_504_522  | $0.0000152972 | $15.29            | <font color="green">-152_892</font>   |
| 6   | ethGetBlockByNumber | 27_300_304    | 11_510_121  | $0.0000153047 | $15.30            | <font color="green">-90_709</font>    |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                | 1_110_669_562 | 844_857_824 | $0.0011233821 | $1_123.38         |
| 1   | ethGetBalance       | 28_665_501    | 12_056_200  | $0.0000160308 | $16.03            |
| 2   | ethGetBalance       | 28_576_023    | 12_020_409  | $0.0000159832 | $15.98            |
| 3   | ethGetBalance       | 28_610_526    | 12_034_210  | $0.0000160015 | $16.00            |
| 4   | ethGetBlockByNumber | 27_395_488    | 11_548_195  | $0.0000153553 | $15.35            |
| 5   | ethGetBlockByNumber | 27_439_198    | 11_565_679  | $0.0000153785 | $15.37            |
| 6   | ethGetBlockByNumber | 27_391_013    | 11_546_405  | $0.0000153529 | $15.35            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
