# Benchmarks for whoami

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade | 1_002_682_998 | 801_663_199 | $0.0010659475 | $1_065.94         | <font color="red">+4_464_378</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ----------- | ------------- | ----------------- |
| 0   | postUpgrade | 998_218_620  | 399_877_448 | $0.0005317050 | $531.70           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
