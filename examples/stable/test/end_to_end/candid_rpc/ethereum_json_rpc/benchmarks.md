⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for ethereum_json_rpc

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 1_110_063_642 | 844_615_456 | $0.0011230598 | $1_123.05         | <font color="red">+3_990_230</font> |
| 1   | ethGetBalance       | 28_627_315    | 12_040_926  | $0.0000160105 | $16.01            | <font color="red">+56_701</font>    |
| 2   | ethGetBalance       | 28_558_632    | 12_013_452  | $0.0000159739 | $15.97            | <font color="red">+58_394</font>    |
| 3   | ethGetBalance       | 28_556_937    | 12_012_774  | $0.0000159730 | $15.97            | <font color="red">+44_039</font>    |
| 4   | ethGetBlockByNumber | 27_349_820    | 11_529_928  | $0.0000153310 | $15.33            | <font color="red">+45_856</font>    |
| 5   | ethGetBlockByNumber | 27_382_581    | 11_543_032  | $0.0000153484 | $15.34            | <font color="red">+88_407</font>    |
| 6   | ethGetBlockByNumber | 27_340_333    | 11_526_133  | $0.0000153260 | $15.32            | <font color="red">+45_370</font>    |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init                | 1_106_073_412 | 843_019_364 | $0.0011209376 | $1_120.93         |
| 1   | ethGetBalance       | 28_570_614    | 12_018_245  | $0.0000159803 | $15.98            |
| 2   | ethGetBalance       | 28_500_238    | 11_990_095  | $0.0000159429 | $15.94            |
| 3   | ethGetBalance       | 28_512_898    | 11_995_159  | $0.0000159496 | $15.94            |
| 4   | ethGetBlockByNumber | 27_303_964    | 11_511_585  | $0.0000153066 | $15.30            |
| 5   | ethGetBlockByNumber | 27_294_174    | 11_507_669  | $0.0000153014 | $15.30            |
| 6   | ethGetBlockByNumber | 27_294_963    | 11_507_985  | $0.0000153018 | $15.30            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
