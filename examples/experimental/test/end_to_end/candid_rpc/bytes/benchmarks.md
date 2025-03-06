# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                          |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------- |
| 0   | getBytes    | 1_980_060    | 1_382_024  | $0.0000018376 | $1.83             | <font color="red">+4_641</font> |
| 1   | getBytes    | 2_653_853    | 1_651_541  | $0.0000021960 | $2.19             | <font color="red">+4_060</font> |
| 2   | getBytes    | 9_737_690    | 4_485_076  | $0.0000059637 | $5.96             | <font color="red">+5_353</font> |
| 3   | getBytes    | 79_937_953   | 32_565_181 | $0.0000433009 | $43.30            | <font color="red">+5_462</font> |
| 4   | getBytes    | 157_933_048  | 63_763_219 | $0.0000847840 | $84.78            | <font color="red">+5_982</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBytes    | 1_975_419    | 1_380_167  | $0.0000018352 | $1.83             |
| 1   | getBytes    | 2_649_793    | 1_649_917  | $0.0000021938 | $2.19             |
| 2   | getBytes    | 9_732_337    | 4_482_934  | $0.0000059608 | $5.96             |
| 3   | getBytes    | 79_932_491   | 32_562_996 | $0.0000432980 | $43.29            |
| 4   | getBytes    | 157_927_066  | 63_760_826 | $0.0000847809 | $84.78            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
