import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

import {
    _SERVICE,
    Recording,
    User
    // @ts-ignore this path may not exist when these tests are imported into other test projects
} from './dfx_generated/audio_recorder/audio_recorder.did';

// TODO to be more thorough we could test all of the error cases as well

let globalUser: User;
let globalRecording: Recording;

export function getTests(audioRecorderCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('creates a user in stable memory', async () => {
            const user = await audioRecorderCanister.createUser('lastmjs');

            globalUser = user;

            expect(user).toEqual(
                expect.objectContaining({
                    username: 'lastmjs',
                    recordingIds: []
                })
            );
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('createdAt');
            expect(typeof user.createdAt).toBe('bigint');
        });

        it('creates a recording in stable memory', async () => {
            const recording = await audioRecorderCanister.createRecording(
                Uint8Array.from([0, 1, 2, 3, 4]),
                'First recording',
                globalUser.id
            );

            globalRecording = recording;
            globalUser.recordingIds = [recording.id];

            expect(recording).toEqual(
                expect.objectContaining({
                    userId: globalUser.id,
                    audio: Uint8Array.from([0, 1, 2, 3, 4]),
                    name: 'First recording'
                })
            );
            expect(recording).toHaveProperty('id');
            expect(recording).toHaveProperty('createdAt');
            expect(typeof recording.createdAt).toBe('bigint');
        });

        it('reads users from stable memory', async () => {
            const result = await audioRecorderCanister.readUsers();

            expect(result).toEqual([globalUser]);
        });

        it('reads recordings from stable memory', async () => {
            const result = await audioRecorderCanister.readRecordings();

            expect(result).toEqual([globalRecording]);
        });

        it('reads user by id from stable memory', async () => {
            const result = await audioRecorderCanister.readUserById(
                globalUser.id
            );

            expect(result).toEqual([globalUser]);
        });

        it('reads recording by id from stable memory', async () => {
            const result = await audioRecorderCanister.readRecordingById(
                globalRecording.id
            );

            expect(result).toEqual([globalRecording]);
        });

        it('deletes recording from stable memory', async () => {
            const deleteRecordingResult =
                await audioRecorderCanister.deleteRecording(globalRecording.id);

            expect(deleteRecordingResult).toEqual(globalRecording);

            const readRecordingsResult =
                await audioRecorderCanister.readRecordings();
            const readUsersResult = await audioRecorderCanister.readUsers();

            globalUser.recordingIds = [];

            expect(readRecordingsResult).toHaveLength(0);
            expect(readUsersResult).toEqual([globalUser]);
        });

        it('deletes user from stable memory', async () => {
            const createRecordingResult =
                await audioRecorderCanister.createRecording(
                    Uint8Array.from([]),
                    'second recording',
                    globalUser.id
                );

            expect(createRecordingResult).toEqual(
                expect.objectContaining({
                    userId: globalUser.id,
                    audio: Uint8Array.from([]),
                    name: 'second recording'
                })
            );

            globalUser.recordingIds = [createRecordingResult.id];

            const readUsersBeforeResult =
                await audioRecorderCanister.readUsers();
            const readRecordingsBeforeResult =
                await audioRecorderCanister.readRecordings();

            expect(readUsersBeforeResult).toEqual([globalUser]);
            expect(readRecordingsBeforeResult).toEqual([createRecordingResult]);

            const deleteUserResult = await audioRecorderCanister.deleteUser(
                globalUser.id
            );

            expect(deleteUserResult).toEqual(globalUser);

            const readUsersAfterResult =
                await audioRecorderCanister.readUsers();
            const readRecordingsAfterResult =
                await audioRecorderCanister.readRecordings();

            expect(readUsersAfterResult).toHaveLength(0);
            expect(readRecordingsAfterResult).toHaveLength(0);
        });
    };
}
