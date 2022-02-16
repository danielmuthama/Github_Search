export abstract class BaseResponse{
    html_url!: string; //user link
    created_at: string | undefined;
    updated_at: string | undefined;
    name: string | undefined; //repo name
    language: string | undefined;
    description!: string;
    git_url!: string; //repo link
    homepage!: string;
    login!: string;
    avatar_url!: string;
}


export default class User extends BaseResponse{
    
    repositories!: Repository[];

}
export class Repository extends BaseResponse{

}


// export class Owner {
//     login: string; //username   owner.login
//     avatar_url: string;
// }