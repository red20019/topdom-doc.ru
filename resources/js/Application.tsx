import React, { useState } from "react";

export interface IUser {
    name: string;
    age: number;
}
const App = () => {
    const [users, setUsers] = useState<IUser[]>([
        {
            name: "Bijaya",
            age: 25,
        },
        {
            name: "Ram",
            age: 25,
        },
    ]);

    return (
        <>
            <h1 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Users list</h1>
            <ul className="max-w-md space-y-1 text-gray-500 list-disc dark:text-gray-400">
                {users.map((user: IUser) => {
                    return (
                        <li key={user.name}>
                            {user.name} is {user.age} years old
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default App;