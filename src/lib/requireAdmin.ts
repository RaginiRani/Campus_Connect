import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ROLES } from "@/constants/roles";
import { getServerSession } from "next-auth";

export async function requireAdmin(){
    const session = await getServerSession(authOptions);

    if(!session || session.user.role !== ROLES.ADMIN){
        throw new Error("Unauthorized");
    }
    return session;
}