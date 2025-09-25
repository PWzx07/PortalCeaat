import { getUser, filterUser, createUser, updateUser, deleteUser, loginUser } from "../service/user.service.js";

class UserController {
    // READ - GET
    async getUserController(req,res){
        const usuario = await getUser();

        res.status(200).json({mensagem: "Todos os usuarios", usuario});
    }

    // FILTER - GET:ID
    async filterUserController(req, res){
        const { id } = req.params;
        const usuario = await filterUser(id);

        if (!usuario || usuario.length === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }
        res.status(200).json({mensagem: "Usuario correspondente", usuario});
    }

    // CREATE - POST
    async createUserController(req, res){
        const {
            nome,
            email,
            senha,
            tipo,
        } = req.body;

        if(
            !nome||
            !email||
            !senha||
            !tipo
        ){
            res.status(400).json({mensagem: "AS informações inseridas são inválidas"});
        }
        try{
            const newUsuario = await createUser({
                nome,
                email,
                senha,
                tipo
            });

            res.status(201).json({mensagem:"Usuario criado", newUsuario});
        }catch(error){
            console.error("Erro ao criar usuario:", error);
            res.status(500).json({mensagem:"Erro ao criar usuario"});
        }
    }

    // UPDATE - PUT
    async updateUserController(req, res){
        const { id } = req.params;

        const {
            nome,
            email,
            senha,
            tipo,
        } = req.body;

        if(
            !id||
            !nome||
            !email||
            !senha||
            !tipo
        ){
            res.status(400).json({mensagem: "As informações inseridas são inválidas"});
        }
        try{
            const upUsuario = await updateUser(id,{
                nome,
                email,
                senha,
                tipo
            });

            if(!upUsuario)return res.status(404).json({
            message:"Usuario não encontrado"
            });

            res.status(200).json({mensagem:"Usuario atualizado", upUsuario});
        }catch(error){
            console.error("Erro ao atualiza usuario:", error);
            res.status(500).json({mensagem:"Erro ao atualiza usuario"});
        }
    }

    // DELETE
    async deleteUserController(req, res){
        const { id } = req.params;

         const delUsuario =  await deleteUser(id);

        if(!delUsuario) return res.status(404).json({
            message:"Usuario não encontrado"
        });

        res.status(204).json({
            message:"Usuario deletado!",
            UsuarioDeletado: delUsuario
        });
    }

      // LOGIN
  async loginUserController(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ mensagem: "Email e senha são obrigatórios" });
    }

    try {
      const result = await loginUser(email, senha);
      if (!result) {
        return res.status(401).json({ mensagem: "Credenciais inválidas" });
      }

      res.status(200).json({
        mensagem: "Login realizado com sucesso",
        token: result.token,
        usuario: { id: result.user.id, email: result.user.email, nome: result.user.nome }
      });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ mensagem: "Erro no login" });
    }
  }
};

export default new UserController();