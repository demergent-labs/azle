import '@dfinity/candid/lib/esm/idl'; // This must remain or the build fails
import { acceptMessage } from './accept_message';
import { argDataRaw } from './arg_data_raw';
import { argDataRawSize } from './arg_data_raw_size';
import { call } from './call';
import { call128 } from './call128';
import { callRaw } from './call_raw';
import { callRaw128 } from './call_raw_128';
import { caller } from './caller';
import { candidDecode } from './candid_decode';
import { candidEncode } from './candid_encode';
import { canisterBalance } from './canister_balance';
import { canisterBalance128 } from './canister_balance_128';
import { canisterVersion } from './canister_version';
import { clearTimer } from './clear_timer';
import { dataCertificate } from './data_certificate';
import { id } from './id';
import { instructionCounter } from './instruction_counter';
import { isController } from './is_controller';
import { methodName } from './method_name';
import { msgCyclesAccept } from './msg_cycles_accept';
import { msgCyclesAccept128 } from './msg_cycles_accept_128';
import { msgCyclesAvailable } from './msg_cycles_available';
import { msgCyclesAvailable128 } from './msg_cycles_available_128';
import { msgCyclesRefunded } from './msg_cycles_refunded';
import { msgCyclesRefunded128 } from './msg_cycles_refunded_128';
import { notify } from './notify';
import { notifyRaw } from './notify_raw';
import { performanceCounter } from './performance_counter';
import { print } from './print';
import { reject } from './reject';
import { rejectCode } from './reject_code';
import { rejectMessage } from './reject_message';
import { reply } from './reply';
import { replyRaw } from './reply_raw';
import { setCertifiedData } from './set_certified_data';
import { setTimer } from './set_timer';
import { setTimerInterval } from './set_timer_interval';
import { stable64Grow } from './stable_64_grow';
import { stable64Read } from './stable_64_read';
import { stable64Size } from './stable_64_size';
import { stable64Write } from './stable_64_write';
import { stableBytes } from './stable_bytes';
import { stableGrow } from './stable_grow';
import { stableRead } from './stable_read';
import { stableSize } from './stable_size';
import { stableWrite } from './stable_write';
import { time } from './time';
import { trap } from './trap';

export * from './types';

type Ic = {
    acceptMessage: typeof acceptMessage;
    argDataRaw: typeof argDataRaw;
    argDataRawSize: typeof argDataRawSize;
    call: typeof call;
    call128: typeof call128;
    callRaw: typeof callRaw;
    callRaw128: typeof callRaw128;
    caller: typeof caller;
    candidDecode: typeof candidDecode;
    candidEncode: typeof candidEncode;
    canisterBalance: typeof canisterBalance;
    canisterBalance128: typeof canisterBalance128;
    canisterVersion: typeof canisterVersion;
    clearTimer: typeof clearTimer;
    dataCertificate: typeof dataCertificate;
    id: typeof id;
    instructionCounter: typeof instructionCounter;
    isController: typeof isController;
    methodName: typeof methodName;
    msgCyclesAccept: typeof msgCyclesAccept;
    msgCyclesAccept128: typeof msgCyclesAccept;
    msgCyclesAvailable: typeof msgCyclesAvailable;
    msgCyclesAvailable128: typeof msgCyclesAvailable128;
    msgCyclesRefunded: typeof msgCyclesRefunded;
    msgCyclesRefunded128: typeof msgCyclesRefunded128;
    notify: typeof notify;
    notifyRaw: typeof notifyRaw;
    performanceCounter: typeof performanceCounter;
    print: typeof print;
    reject: typeof reject;
    rejectCode: typeof rejectCode;
    rejectMessage: typeof rejectMessage;
    reply: typeof reply;
    replyRaw: typeof replyRaw;
    setCertifiedData: typeof setCertifiedData;
    setTimer: typeof setTimer;
    setTimerInterval: typeof setTimerInterval;
    stableBytes: typeof stableBytes;
    stableGrow: typeof stableGrow;
    stableRead: typeof stableRead;
    stableSize: typeof stableSize;
    stableWrite: typeof stableWrite;
    stable64Grow: typeof stable64Grow;
    stable64Read: typeof stable64Read;
    stable64Size: typeof stable64Size;
    stable64Write: typeof stable64Write;
    time: typeof time;
    trap: typeof trap;
};

/** API entrypoint for interacting with the Internet Computer */
export const ic: Ic = globalThis._azleIc
    ? {
          ...globalThis._azleIc,
          argDataRaw,
          call,
          call128,
          callRaw,
          callRaw128,
          caller,
          candidDecode,
          candidEncode,
          canisterBalance,
          canisterBalance128,
          canisterVersion,
          clearTimer,
          dataCertificate,
          id,
          instructionCounter,
          isController,
          msgCyclesAccept,
          msgCyclesAccept128,
          msgCyclesAvailable,
          msgCyclesAvailable128,
          msgCyclesRefunded,
          msgCyclesRefunded128,
          notify,
          notifyRaw,
          performanceCounter,
          rejectCode,
          reply,
          replyRaw,
          setCertifiedData,
          setTimer,
          setTimerInterval,
          stableBytes,
          stableGrow,
          stableRead,
          stableSize,
          stableWrite,
          stable64Grow,
          stable64Read,
          stable64Size,
          stable64Write,
          time
      }
    : {
          acceptMessage: () => {},
          argDataRaw: () => {},
          argDataRawSize: () => {},
          callRaw: () => {},
          caller: () => {},
          candidDecode: () => {},
          candidEncode: () => {},
          canisterBalance: () => {},
          canisterBalance128: () => {},
          canisterVersion: () => {},
          clearTimer: () => {},
          id: () => {},
          instructionCounter: () => {},
          isController: () => {},
          methodName: () => {},
          msgCyclesAccept: () => {},
          msgCyclesAccept128: () => {},
          msgCyclesAvailable: () => {},
          msgCyclesAvailable128: () => {},
          msgCyclesRefunded: () => {},
          msgCyclesRefunded128: () => {},
          performanceCounter: () => {},
          print: () => {},
          reject: () => {},
          rejectCode: () => {},
          rejectMessage: () => {},
          reply: () => {},
          replyRaw: () => {},
          setCertifiedData: () => {},
          stableBytes: () => {},
          stableGrow: () => {},
          stableRead: () => {},
          stableSize: () => {},
          stableWrite: () => {},
          stable64Grow: () => {},
          stable64Read: () => {},
          stable64Size: () => {},
          stable64Write: () => {},
          time: () => {},
          trap: () => {}
      };
