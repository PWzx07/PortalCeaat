import { getUser } from "../service/user.service.js";

class UserController {
    // READ - GET
    async getUserController(req,res){
        const usuario = await getUser();

        res.status(200).json({mensagem: "Todos os usuarios", usuario});
    }
};

export default new UserController();