# Benchmarks for rejections

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name                     | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ------------------------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getRejectCodeNoError            | 1_365_073    | 1_136_029 | $0.0000015105 | $1.51             | <font color="green">-505_754</font> |
| 1   | getRejectCodeDestinationInvalid | 1_287_427    | 1_104_970 | $0.0000014692 | $1.46             | <font color="green">-510_315</font> |
| 2   | getRejectCodeCanisterReject     | 2_232_300    | 1_482_920 | $0.0000019718 | $1.97             | <font color="green">-21_028</font>  |
| 3   | getRejectCodeCanisterError      | 1_293_546    | 1_107_418 | $0.0000014725 | $1.47             | <font color="green">-508_680</font> |
| 4   | getRejectMessage                | 2_971_720    | 1_778_688 | $0.0000023651 | $2.36             | <font color="green">-107_151</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name                        | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getRejectionCodeNoError            | 1_870_827    | 1_338_330 | $0.0000017795 | $1.77             |
| 1   | getRejectionCodeDestinationInvalid | 1_797_742    | 1_309_096 | $0.0000017407 | $1.74             |
| 2   | getRejectionCodeCanisterReject     | 2_253_328    | 1_491_331 | $0.0000019830 | $1.98             |
| 3   | getRejectionCodeCanisterError      | 1_802_226    | 1_310_890 | $0.0000017431 | $1.74             |
| 4   | getRejectionMessage                | 3_078_871    | 1_821_548 | $0.0000024221 | $2.42             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
