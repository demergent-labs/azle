# Benchmarks for wallet_backend

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name       | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBalance        | 80_969_629   | 32_977_851 | $0.0000438497 | $43.84            |
| 1   | getBalance        | 80_962_392   | 32_974_956 | $0.0000438458 | $43.84            |
| 2   | getDepositAddress | 104_792_776  | 42_507_110 | $0.0000565204 | $56.52            |
| 3   | getDepositAddress | 104_661_243  | 42_454_497 | $0.0000564505 | $56.45            |
| 4   | updateBalance     | 104_637_857  | 42_445_142 | $0.0000564380 | $56.43            |
| 5   | updateBalance     | 104_740_921  | 42_486_368 | $0.0000564928 | $56.49            |
| 6   | getBalance        | 80_987_386   | 32_984_954 | $0.0000438591 | $43.85            |
| 7   | getBalance        | 81_022_705   | 32_999_082 | $0.0000438779 | $43.87            |
| 8   | transfer          | 89_390_408   | 36_346_163 | $0.0000483284 | $48.32            |
| 9   | getBalance        | 81_039_369   | 33_005_747 | $0.0000438868 | $43.88            |
| 10  | getBalance        | 81_046_998   | 33_008_799 | $0.0000438908 | $43.89            |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
