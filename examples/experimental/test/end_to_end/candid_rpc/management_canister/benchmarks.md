# Benchmarks for management_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name               | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | executeCreateCanister     | 153_713_118  | 62_075_247 | $0.0000825396 | $82.53            |
| 1   | executeUpdateSettings     | 154_977_977  | 62_581_190 | $0.0000832123 | $83.21            |
| 2   | getCanisterStatus         | 143_058_672  | 57_813_468 | $0.0000768728 | $76.87            |
| 3   | executeInstallCode        | 168_387_306  | 67_944_922 | $0.0000903443 | $90.34            |
| 4   | executeUninstallCode      | 143_622_977  | 58_039_190 | $0.0000771730 | $77.17            |
| 5   | getCanisterStatus         | 143_030_674  | 57_802_269 | $0.0000768579 | $76.85            |
| 6   | executeUploadChunk        | 157_768_597  | 63_697_438 | $0.0000846966 | $84.69            |
| 7   | getStoredChunks           | 142_248_251  | 57_489_300 | $0.0000764418 | $76.44            |
| 8   | getStoredChunks           | 142_285_832  | 57_504_332 | $0.0000764618 | $76.46            |
| 9   | executeInstallChunkedCode | 160_352_654  | 64_731_061 | $0.0000860709 | $86.07            |
| 10  | executeUninstallCode      | 143_753_498  | 58_091_399 | $0.0000772424 | $77.24            |
| 11  | executeClearChunkStore    | 142_623_027  | 57_639_210 | $0.0000766411 | $76.64            |
| 12  | getStoredChunks           | 142_320_532  | 57_518_212 | $0.0000764802 | $76.48            |
| 13  | getCanisterStatus         | 143_237_156  | 57_884_862 | $0.0000769678 | $76.96            |
| 14  | executeDepositCycles      | 142_290_814  | 57_506_325 | $0.0000764644 | $76.46            |
| 15  | getCanisterStatus         | 143_270_170  | 57_898_068 | $0.0000769853 | $76.98            |
| 16  | executeUninstallCode      | 143_715_716  | 58_076_286 | $0.0000772223 | $77.22            |
| 17  | getCanisterStatus         | 143_207_609  | 57_873_043 | $0.0000769520 | $76.95            |
| 18  | executeStopCanister       | 142_273_754  | 57_499_501 | $0.0000764554 | $76.45            |
| 19  | getCanisterStatus         | 143_272_154  | 57_898_861 | $0.0000769864 | $76.98            |
| 20  | getCanisterStatus         | 143_244_418  | 57_887_767 | $0.0000769716 | $76.97            |
| 21  | executeStartCanister      | 142_436_659  | 57_564_663 | $0.0000765420 | $76.54            |
| 22  | getCanisterStatus         | 143_353_344  | 57_931_337 | $0.0000770296 | $77.02            |
| 23  | getCanisterStatus         | 143_164_536  | 57_855_814 | $0.0000769291 | $76.92            |
| 24  | getCanisterInfo           | 146_550_251  | 59_210_100 | $0.0000787299 | $78.72            |
| 25  | executeStopCanister       | 142_316_049  | 57_516_419 | $0.0000764779 | $76.47            |
| 26  | executeDeleteCanister     | 142_488_904  | 57_585_561 | $0.0000765698 | $76.56            |
| 27  | getRawRand                | 140_227_619  | 56_681_047 | $0.0000753671 | $75.36            |

## Baseline benchmarks Azle version: 0.25.0-alpha

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
