import { ok, Test } from 'azle/test';
import {
    Recording,
    _SERVICE,
    User
} from './dfx_generated/audio_recorder/audio_recorder.did';
import { ActorSubclass } from '@dfinity/agent';

// TODO to be more thorough we could test all of the error cases as well

let global_user: User;
let global_recording: Recording;

export function get_tests(
    audio_recorder_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'create_user',
            test: async () => {
                const user = await audio_recorder_canister.createUser(
                    'lastmjs'
                );

                global_user = user;

                return {
                    Ok:
                        user.username === 'lastmjs' &&
                        user.recordingIds.length === 0
                };
            }
        },
        {
            name: 'create_recording',
            test: async () => {
                const result = await audio_recorder_canister.createRecording(
                    Uint8Array.from([0, 1, 2, 3, 4]),
                    'First recording',
                    global_user.id
                );

                if (!ok(result)) {
                    return {
                        Err: JSON.stringify(result.Err, null, 2)
                    };
                }

                const recording = result.Ok;

                global_recording = recording;

                return {
                    Ok:
                        recording.audio.length === 5 &&
                        recording.name === 'First recording' &&
                        recording.userId.toText() === global_user.id.toText()
                };
            }
        },
        {
            name: 'read_users',
            test: async () => {
                const result = await audio_recorder_canister.readUsers();
                const user = result[0];

                global_user = user;

                return {
                    Ok:
                        result.length === 1 &&
                        user.id.toText() === global_user.id.toText() &&
                        user.createdAt === global_user.createdAt &&
                        user.username === global_user.username
                };
            }
        },
        {
            name: 'read_recordings',
            test: async () => {
                const result = await audio_recorder_canister.readRecordings();
                const recording = result[0];

                return {
                    Ok:
                        result.length === 1 &&
                        recording.id.toText() ===
                            global_recording.id.toText() &&
                        recording.createdAt === global_recording.createdAt &&
                        recording.name === global_recording.name &&
                        recording.userId.toText() ===
                            global_recording.userId.toText()
                };
            }
        },
        {
            name: 'read_user_by_id',
            test: async () => {
                const result = await audio_recorder_canister.readUserById(
                    global_user.id
                );
                const user = result[0];

                if (user === undefined) {
                    return {
                        Err: 'User not found'
                    };
                }

                return {
                    Ok:
                        result.length === 1 &&
                        user.id.toText() === global_user.id.toText() &&
                        user.createdAt === global_user.createdAt &&
                        user.username === global_user.username &&
                        user.recordingIds.length === 1 &&
                        user.recordingIds[0].toText() ===
                            global_user.recordingIds[0].toText()
                };
            }
        },
        {
            name: 'read_recording_by_id',
            test: async () => {
                const result = await audio_recorder_canister.readRecordingById(
                    global_recording.id
                );
                const recording = result[0];

                if (recording === undefined) {
                    return {
                        Err: 'Recording not found'
                    };
                }

                return {
                    Ok:
                        result.length === 1 &&
                        recording.id.toText() ===
                            global_recording.id.toText() &&
                        recording.createdAt === global_recording.createdAt &&
                        recording.name === global_recording.name &&
                        recording.userId.toText() ===
                            global_recording.userId.toText()
                };
            }
        },
        {
            name: 'delete_recording',
            test: async () => {
                const delete_recording_result =
                    await audio_recorder_canister.deleteRecording(
                        global_recording.id
                    );

                if (!ok(delete_recording_result)) {
                    return {
                        Err: JSON.stringify(
                            delete_recording_result.Err,
                            null,
                            2
                        )
                    };
                }

                const read_recordings_result =
                    await audio_recorder_canister.readRecordings();
                const read_users_result =
                    await audio_recorder_canister.readUsers();

                return {
                    Ok:
                        read_recordings_result.length === 0 &&
                        read_users_result[0].recordingIds.length === 0
                };
            }
        },
        {
            name: 'delete_user',
            test: async () => {
                const create_recording_result =
                    await audio_recorder_canister.createRecording(
                        Uint8Array.from([]),
                        'second recording',
                        global_user.id
                    );

                if (!ok(create_recording_result)) {
                    return {
                        Err: JSON.stringify(create_recording_result, null, 2)
                    };
                }

                const read_users_before_result =
                    await audio_recorder_canister.readUsers();
                const read_recordings_before_result =
                    await audio_recorder_canister.readRecordings();

                const delete_user_result =
                    await audio_recorder_canister.deleteUser(global_user.id);

                if (!ok(delete_user_result)) {
                    return {
                        Err: JSON.stringify(delete_user_result, null, 2)
                    };
                }

                const read_users_after_result =
                    await audio_recorder_canister.readUsers();
                const read_recordings_after_result =
                    await audio_recorder_canister.readRecordings();

                return {
                    Ok:
                        read_users_before_result[0].recordingIds.length === 1 &&
                        read_recordings_before_result[0].userId.toText() ===
                            global_user.id.toText() &&
                        read_users_after_result.length === 0 &&
                        read_recordings_after_result.length === 0
                };
            }
        }
    ];
}
