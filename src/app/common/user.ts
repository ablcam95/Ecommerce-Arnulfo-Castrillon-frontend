import { UserType } from './user-type';
export class User {
    constructor(
        public id: number| undefined,
        public username: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public address: string,
        public cellphone: string,
        public password: string,
        public userType:string
    ) {}
}

// private Integer id;
//     private String username;
//     private String firstnameName;
//     private String lastnameName;
//     private String email;
//     private String address;
//     private String cellphone;
//     private String password;
//     private Boolean activo;
//     private UserType userType;
//     private LocalDateTime dateCreated;
//     private LocalDateTime dateUpdated;
