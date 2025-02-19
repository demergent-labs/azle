# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | createUser      | 12_189_870   | 5_465_948  | $0.0000072679 | $7.26             | <font color="green">-91_744</font>  |
| 1   | createRecording | 34_247_018   | 14_288_807 | $0.0000189994 | $18.99            | <font color="green">-297_914</font> |
| 2   | deleteRecording | 48_378_029   | 19_941_211 | $0.0000265152 | $26.51            | <font color="green">-478_554</font> |
| 3   | createRecording | 34_074_210   | 14_219_684 | $0.0000189075 | $18.90            | <font color="green">-275_843</font> |
| 4   | deleteUser      | 32_959_130   | 13_773_652 | $0.0000183144 | $18.31            | <font color="green">-320_353</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 12_281_614   | 5_502_645  | $0.0000073167 | $7.31             |
| 1   | createRecording | 34_544_932   | 14_407_972 | $0.0000191578 | $19.15            |
| 2   | deleteRecording | 48_856_583   | 20_132_633 | $0.0000267698 | $26.76            |
| 3   | createRecording | 34_350_053   | 14_330_021 | $0.0000190542 | $19.05            |
| 4   | deleteUser      | 33_279_483   | 13_901_793 | $0.0000184848 | $18.48            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
