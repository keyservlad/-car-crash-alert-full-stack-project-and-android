
export interface InputCreateUser {
    // root type
    inputCreateUser: {
        name: string
        email: string
        password: string
        emergency_contact?: string
        phone: string
    };
}