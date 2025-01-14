# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | createUser      | 12_281_614   | 5_502_645  | $0.0000073167 | $7.31             | <font color="red">+1_169_572</font> |
| 1   | createRecording | 34_544_932   | 14_407_972 | $0.0000191578 | $19.15            | <font color="red">+3_953_998</font> |
| 2   | deleteRecording | 48_856_583   | 20_132_633 | $0.0000267698 | $26.76            | <font color="red">+5_997_965</font> |
| 3   | createRecording | 34_350_053   | 14_330_021 | $0.0000190542 | $19.05            | <font color="red">+3_930_495</font> |
| 4   | deleteUser      | 33_279_483   | 13_901_793 | $0.0000184848 | $18.48            | <font color="red">+3_950_443</font> |

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
