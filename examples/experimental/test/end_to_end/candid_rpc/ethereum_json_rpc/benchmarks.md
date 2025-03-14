⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | init                | 5_098_990_681 | 4_040_186_272 | $0.0053721145 | $5_372.11         | <font color="red">+5_682_868</font>     |
| 1   | ethGetBalance       | 27_821_543    | 11_718_617    | $0.0000155819 | $15.58            | <font color="green">-153_042_524</font> |
| 2   | ethGetBalance       | 27_797_455    | 11_708_982    | $0.0000155691 | $15.56            | <font color="green">-153_008_342</font> |
| 3   | ethGetBalance       | 27_812_271    | 11_714_908    | $0.0000155770 | $15.57            | <font color="green">-152_927_538</font> |
| 4   | ethGetBlockByNumber | 26_831_453    | 11_322_581    | $0.0000150553 | $15.05            | <font color="green">-152_947_819</font> |
| 5   | ethGetBlockByNumber | 26_831_462    | 11_322_584    | $0.0000150553 | $15.05            | <font color="green">-152_877_896</font> |
| 6   | ethGetBlockByNumber | 26_839_843    | 11_325_937    | $0.0000150598 | $15.05            | <font color="green">-152_875_881</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_093_307_813 | 4_037_913_125 | $0.0053690919 | $5_369.09         |
| 1   | ethGetBalance       | 180_864_067   | 72_935_626    | $0.0000969803 | $96.98            |
| 2   | ethGetBalance       | 180_805_797   | 72_912_318    | $0.0000969493 | $96.94            |
| 3   | ethGetBalance       | 180_739_809   | 72_885_923    | $0.0000969142 | $96.91            |
| 4   | ethGetBlockByNumber | 179_779_272   | 72_501_708    | $0.0000964033 | $96.40            |
| 5   | ethGetBlockByNumber | 179_709_358   | 72_473_743    | $0.0000963662 | $96.36            |
| 6   | ethGetBlockByNumber | 179_715_724   | 72_476_289    | $0.0000963695 | $96.36            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
