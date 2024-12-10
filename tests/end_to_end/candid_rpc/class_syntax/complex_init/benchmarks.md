# Benchmarks for complex_init

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init        | 1_346_177_479 | 939_060_991 | $0.0012486412 | $1_248.64         | <font color="red">+325_577_256</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init        | 1_020_600_223 | 808_830_089 | $0.0010754771 | $1_075.47         |

# Benchmarks for rec_init

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls | Change                                |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init        | 1_346_045_062 | 939_008_024 | $0.0012485708 | $1_248.57         | <font color="red">+325_483_970</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | init        | 1_020_561_092 | 808_814_436 | $0.0010754563 | $1_075.45         |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
