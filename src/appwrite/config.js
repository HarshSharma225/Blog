import { Client, Storage, Databases, ID, Query } from "appwrite";
// PROBLEM: Permission and Role are used in uploadFile but not imported. Add import if needed.
// import { Permission, Role } from "appwrite";
import conf from "../conf/conf";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        // console.log(featuredImage)
        try {
            const documentt =  await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

            // PROBLEM: Returns 'document' instead of 'documentt'. This will cause a ReferenceError.
            if(documentt) return documentt;
            else{
                console.log("error in config.js, line no 22")
            }
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error ", error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status,userId}){
        try{
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }
        catch(error){
            console.log("Appwrite Service :: updatePost :: error ", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )

            return true;
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error ", error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                // conf.bucketId,
                slug
            )
        }
        catch(error){
            console.log("Appwrite Service :: getPost :: error ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        return await this.databases.listDocuments(
            conf.databaseId,
            conf.collectionId,
            queries
        )
    } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
    }

    // file upload service

    async uploadFile(file){
        // PROBLEM: Hardcoded bucket ID instead of using conf.appwriteBucketId or conf.bucketId. This reduces flexibility and may break if the bucket ID changes.
        // Also, Permission and Role are not imported, so this will throw an error unless imported.
        // return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file, [Permission.read(Role.any())])
        try {
            return await this.bucket.createFile(
                // conf.appwriteBucketId,
                conf.bucketId, // PROBLEM: Hardcoded bucket ID
                ID.unique(),
                file,
                // [Permission.read(Role.any())] // PROBLEM: Permission and Role not imported
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.bucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        // PROBLEM: Inconsistent/confusing use of conf.bucketId and conf.appwriteBucketId throughout the file. Standardize usage.
        // const response = await this.bucket.getFile(
        //     conf.bucketId,
        //     fileId,
        // )
        // // console.log(fileId)
        // // console.log(response.$id)
        // // return response;

        // console.log(fileId)
        
        const temp = this.bucket.getFileView(
            conf.bucketId,
            fileId,
        )
        // console.log(temp)
        return temp;
    }

}

const service = new Service();
export default service;