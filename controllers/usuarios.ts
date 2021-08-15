import { Request, Response } from 'express';
import Usuario from '../models/usuario';


//OBTENER TODOS LOS USERS
export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json({
        usuarios
    });
}

//OBTENER 1 USER
export const getUsuario = async (req: Request, res: Response) => {
    
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if(!usuario){
        return res.status(404).json({
            msg: `No existe el usuario con id ${id}`
        });

    }
    
    res.json({
        usuario
    });
}

//CREAR USER
export const postUsuario = async (req: Request, res: Response) => {
    
    const { body } = req;

    try {

        const existeEmail = await Usuario.findOne({
            where:{
                email: body.email
            }
        });
        if(existeEmail){
            return res.status(400).json({
                msg: `Ya existe un usuario con email: ${body.email}`
            });
        }

        const usuario = Usuario.build(body);
        await usuario.save();
        res.json(usuario);


    }catch(err){
        console.log(err);
        return res.status(500).json({
            msg: 'Hable con el admin'
        });
    }

}

//ACTUALIZAR USER
export const putUsuario = async (req: Request, res: Response) => {
    
    const { id } = req.params;
    const { body } = req;


    try {
        const usuarioById = await Usuario.findByPk(id);
        if(!usuarioById){
            return res.status(404).json({
                msg: `No existe un usuario con id: ${id}`
            });
        }
        if(body.email){
            const usuarioByEmail = await Usuario.findOne({
                where:{
                    email: body.email
                }
            });
            if(usuarioByEmail){
                return res.status(400).json({
                    msg: `Ya existe un usuario con email: ${body.email}`
                });
            }
        }
        
        await usuarioById.update(body);

        res.json(usuarioById);


    }catch(err){
        console.log(err);
        return res.status(500).json({
            msg: 'Hable con el admin'
        });
    }
}

//DELETE USER
export const deleteUsuario = async (req: Request, res: Response) => {
    
    const { id } = req.params;

    try {
        const usuarioById = await Usuario.findByPk(id);
        if(!usuarioById){
            return res.status(404).json({
                msg: `No existe un usuario con id: ${id}`
            });
        }

        //ELIMINACION FISICA
        //await usuarioById.destroy();

        //ELIMINACION LOGICA
        await usuarioById.update({ estado: false });
        res.json(usuarioById);

    }catch(err){
        console.log(err);
        return res.status(500).json({
            msg: 'Hable con el admin'
        });
    }
}