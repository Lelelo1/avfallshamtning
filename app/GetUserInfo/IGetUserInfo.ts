class UserInfo {
    name: string = undefined;
    surname: string = undefined;
    mobileNumber: number = undefined;
    email: string = undefined;
    streetAddress: string = undefined;
    zipCode: number = undefined;
    city: number = undefined;
}

export default interface IGetUserInfo {
    getUserInfo(): UserInfo; // don't need to set device as a paramater
}
