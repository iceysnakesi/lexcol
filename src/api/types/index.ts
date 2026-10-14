interface User {
    readonly id: string;
    name: string;
    //avatarUrl?: string;
}

interface Admin extends User {
    role: 'admin';
}