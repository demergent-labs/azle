// TODO wrap these types up into the azle package and let the user import them
type Query<T> = T;
type Update<T> = T;
type i32 = number;

function echo(message: string): Query<string> {
    return message;
}