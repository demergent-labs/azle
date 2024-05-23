import { ActorSubclass } from '@dfinity/agent';
import { Test, testEquality } from 'azle/test';

import { _SERVICE } from './dfx_generated/audio_recorder/audio_recorder.did';

// TODO to be more thorough we could test all of the error cases as well

type Context = {
    user: any;
    recording: any;
};

export function get_tests(
    audio_recorder_canister: ActorSubclass<_SERVICE>
): Test<Context>[] {
    return [
        {
            name: 'create_user',
            test: async (context) => {
                const user =
                    await audio_recorder_canister.createUser('lastmjs');

                const expectedUsername = 'lastmjs';
                const expectedRecordingCount = 0;

                return testEquality<Context>(
                    [user.username, user.recordingIds.length],
                    [expectedUsername, expectedRecordingCount],
                    { context: { ...context, user } }
                );
            }
        },
        {
            name: 'create_recording',
            test: async (context) => {
                const result = await audio_recorder_canister.createRecording(
                    Uint8Array.from([0, 1, 2, 3, 4]),
                    'First recording',
                    context.user.id
                );

                if ('Err' in result) {
                    return {
                        Err: JSON.stringify(result.Err, null, 2)
                    };
                }

                const recording = result.Ok;

                return testEquality(
                    [
                        recording.audio.length,
                        recording.name,
                        recording.userId.toText()
                    ],
                    [5, 'First recording', context.user.id.toText()]
                );
            }
        },
        {
            name: 'read_users',
            test: async (context) => {
                const result = await audio_recorder_canister.readUsers();

                return testEquality(result, [context.user]);
            }
        },
        {
            name: 'read_recordings',
            test: async (context) => {
                const result = await audio_recorder_canister.readRecordings();

                return testEquality(result, [context.recording]);
            }
        },
        {
            name: 'read_user_by_id',
            test: async (context) => {
                const result = await audio_recorder_canister.readUserById(
                    context.user.id
                );

                return testEquality(result, [context.user]);
            }
        },
        {
            name: 'read_recording_by_id',
            test: async (context) => {
                const result = await audio_recorder_canister.readRecordingById(
                    context.recording.id
                );

                return testEquality(result, [context.recording]);
            }
        },
        {
            name: 'delete_recording',
            test: async (context) => {
                const delete_recording_result =
                    await audio_recorder_canister.deleteRecording(
                        context.recording.id
                    );

                if ('Err' in delete_recording_result) {
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

                return testEquality(
                    [
                        read_recordings_result.length,
                        read_users_result[0].recordingIds.length
                    ],
                    [0, 0]
                );
            }
        },
        {
            name: 'delete_user',
            test: async (context) => {
                const create_recording_result =
                    await audio_recorder_canister.createRecording(
                        Uint8Array.from([]),
                        'second recording',
                        context.user.id
                    );

                if ('Err' in create_recording_result) {
                    return {
                        Err: JSON.stringify(create_recording_result, null, 2)
                    };
                }

                const read_users_before_result =
                    await audio_recorder_canister.readUsers();
                const read_recordings_before_result =
                    await audio_recorder_canister.readRecordings();

                const delete_user_result =
                    await audio_recorder_canister.deleteUser(context.user.id);

                if ('Err' in delete_user_result) {
                    return {
                        Err: JSON.stringify(delete_user_result, null, 2)
                    };
                }

                const read_users_after_result =
                    await audio_recorder_canister.readUsers();
                const read_recordings_after_result =
                    await audio_recorder_canister.readRecordings();

                return testEquality(
                    [
                        read_users_before_result[0].recordingIds.length,
                        read_recordings_before_result[0].userId.toText(),
                        read_users_after_result.length,
                        read_recordings_after_result.length
                    ],
                    [1, context.user.id.toText(), 0, 0]
                );
            }
        }
    ];
}
