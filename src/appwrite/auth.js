import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteId);

        this.account =new Account(this.client);
    }

    async createAccount({email,name,password}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name)
            
            if(userAccount){
                return this.login({email,password});

            }
            else{
                return userAccount;
            }
        }
        catch(err) {
            throw err;
        }  
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);      ///////////createEmailPasswordSession
        }
        catch(err){
            throw err;
        } 
    }

    async getCurrentUser(){
        try{
            const user =  await this.account.get();
            if(user) return user;
            else{
                console.log("error in auth.js, line no 47");
            }
        }
        catch(err){
            console.log("Appwrite serive :: getCurrentUser :: error", err);
            return null;
        }

        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(err){
            console.log(err)
        }
    }
}

const authService = new AuthService();

export default authService
