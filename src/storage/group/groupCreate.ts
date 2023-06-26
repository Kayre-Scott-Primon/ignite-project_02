import { AppError } from "@utils/AppError";
import { groupGetAll } from "./groupGetAll";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function groupCreate(newGroupName: string){

    try{
        const storedGroups = await groupGetAll()

        const groupAlreadyExists = storedGroups.includes(newGroupName)
        if(groupAlreadyExists){
            throw new AppError('Já existe um grupo cadastrado com esse nome')
        }

        const storage = JSON.stringify([... storedGroups, newGroupName])
        
        await AsyncStorage.setItem(GROUP_COLLECTION, storage)
    }catch(error){
        throw error;
    }

}