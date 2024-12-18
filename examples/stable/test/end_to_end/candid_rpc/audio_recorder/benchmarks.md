# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.25.1

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | createUser      | 11_276_694   | 5_100_677  | $0.0000067822 | $6.78             | <font color="red">+164_652</font>   |
| 1   | createRecording | 31_374_190   | 13_139_676 | $0.0000174714 | $17.47            | <font color="red">+783_256</font>   |
| 2   | deleteRecording | 43_967_331   | 18_176_932 | $0.0000241693 | $24.16            | <font color="red">+1_108_713</font> |
| 3   | createRecording | 31_167_283   | 13_056_913 | $0.0000173614 | $17.36            | <font color="red">+747_725</font>   |
| 4   | deleteUser      | 29_987_469   | 12_584_987 | $0.0000167339 | $16.73            | <font color="red">+658_429</font>   |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 11_112_042   | 5_034_816  | $0.0000066946 | $6.69             |
| 1   | createRecording | 30_590_934   | 12_826_373 | $0.0000170548 | $17.05            |
| 2   | deleteRecording | 42_858_618   | 17_733_447 | $0.0000235796 | $23.57            |
| 3   | createRecording | 30_419_558   | 12_757_823 | $0.0000169637 | $16.96            |
| 4   | deleteUser      | 29_329_040   | 12_321_616 | $0.0000163837 | $16.38            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
