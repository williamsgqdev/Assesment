import { HttpStatusCode } from "../enums";

export function responseFormat<IData>(status: HttpStatusCode, message: string, data: IData | null = null){
        return {
            status,
            message,
            data
        }
}