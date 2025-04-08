# Benchmarks for recursion

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | testRecServiceCall | 18_412_123   | 7_954_849 | $0.0000105773 | $10.57            | <font color="green">-5_949</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name        | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | testRecServiceCall | 18_418_072   | 7_957_228 | $0.0000105805 | $10.58            |

# Benchmarks for recursive_canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init        | 4_865_596_840 | 3_546_828_736 | $0.0047161118 | $4_716.11         | <font color="red">+39_222_150</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 4_826_374_690 | 3_531_139_876 | $0.0046952508 | $4_695.25         |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
