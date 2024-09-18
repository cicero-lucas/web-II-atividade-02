const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const verCookie = require("../Helpers/Helpers");

const cadastraUsuario = async (req,res)=>{
    try{
        const {nome,perfil="",email,senha,confirmsenha}=req.body;
    
        if(!nome){
            return res.status(422).json({msg:'o nome é obrigatório!'});
        }else if(!email){
            return res.status(422).json({msg:'o email é obrigatório!'});
        
        }else if(!senha){
            return res.status(422).json({msg:'a senha é obrigatório!'})
        
        }else if(!confirmsenha){
            return res.status(422).json({msg:'a confirmação de senha é obrigatório!'})
        
        }else if(senha !== confirmsenha){
            return res.status(422).json({msg:'confirme a senha corretamete!', opc:2});
        }
        const userExiste = await User.findOne({email:email})

        if(userExiste){
            return res.status(422).json({msg:'usuário já cadastrado', opc:3});
        }

        const salt = await bcrypt.genSalt(12);
        const passorwodHash = await bcrypt.hash (senha,salt)

        // criarUsario

        const user = new User({
            name:nome,
            perfil:(perfil)?perfil:nome,
            email,
            senha:passorwodHash,
        })

        try{
            await user.save();
            return res.status(200).json({msg:"Login realizado com sucesso!", opc:1})
        }catch{
            return res.status(500).json({ msg:"erro ao cadastra-se na plataforma", opc:2})
        }
    }catch{
        console.log("erro ao cadastrar usuário!");
    }

   
}

const paginaLogin = async (req,res)=>{
    try {
        const {email,senha}=req.body;

        if(!email){
            return res.status(422).json({msg:"email é obrigatório!"});
        }else if(!senha){
            return res.status(422).json({msg:"senha é obrigatório!"});
        }

        const user = await User.findOne({email:email})
        if(!user){
            return res.status(404).json({msg:'usuário não cadastrado, faça o cadastro!',opc:3});
        }

        const checksenha = await bcrypt.compare(senha,user.senha)

        if(!checksenha){
            return res.status(422).json({msg:"senha inválida !", opc:2});
        }

        try {
            const secret = process.env.SECRET
            const token = jwt.sign({
                iduser:user._id
            },secret,)
            res.status(200).json(
                {token, opc:1,msg:"bem vindo!"}
            );

        } catch {
            console.log('erro no login')
        }
        
    } catch {
        console.log("erro ao fazer login")
    }
}

module.exports={
    cadastraUsuario,paginaLogin
}