const conf = {
    appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinymceAPI: String(import.meta.env.VITE_TINYMCE_API)
}

export default conf