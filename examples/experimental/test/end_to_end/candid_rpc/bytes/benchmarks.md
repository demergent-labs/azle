# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------- |
| 0   | getBytes    | 1_973_270    | 1_379_308  | $0.0000018340 | $1.83             | <font color="green">-2_149</font> |
| 1   | getBytes    | 2_650_575    | 1_650_230  | $0.0000021943 | $2.19             | <font color="red">+782</font>     |
| 2   | getBytes    | 9_731_925    | 4_482_770  | $0.0000059606 | $5.96             | <font color="green">-412</font>   |
| 3   | getBytes    | 79_932_079   | 32_562_831 | $0.0000432978 | $43.29            | <font color="green">-412</font>   |
| 4   | getBytes    | 157_926_654  | 63_760_661 | $0.0000847806 | $84.78            | <font color="green">-412</font>   |

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
