import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    age: number;
}

export type UserCreate = Pick<User, 'username' | 'age'>;
export type UserUpdate = Pick<User, 'id'> & Partial<UserCreate>;

export async function getUsers(limit: number, offset: number): Promise<User[]> {
    return await User.find({
        take: limit,
        skip: offset
    });
}

export async function getUser(id: number): Promise<User | null> {
    return await User.findOne({
        where: {
            id
        }
    });
}

export async function countUsers(): Promise<number> {
    return await User.count();
}

export async function createUser(userCreate: UserCreate): Promise<User> {
    let user = new User();

    user.username = userCreate.username;
    user.age = userCreate.age;

    return await user.save();
}

export async function updateUser(userUpdate: UserUpdate): Promise<User> {
    await User.update(userUpdate.id, {
        username: userUpdate.username,
        age: userUpdate.age
    });

    const user = await getUser(userUpdate.id);

    if (user === null) {
        throw new Error(`updateUser: failed for id ${userUpdate.id}`);
    }

    return user;
}

export async function deleteUser(id: number): Promise<number> {
    const deleteResult = await User.delete(id);

    if (deleteResult.affected === 0) {
        throw new Error(`deleteUser: could not delete user with id ${id}`);
    }

    return id;
}
