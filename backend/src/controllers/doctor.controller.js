const doctormodel = require("../models/doctormodel");


class DoctorController {

    //------------------get individual doctor ---------------------//
    async getdoctor(req, resp) {
        const { id } = req.params;
        try {
            const docProfile = await doctormodel.findOne({ UserId: id });
            if(docProfile){
                return resp.status(200).send({
                    message:"doctor profile fetched",
                    success:true,
                    docProfile
                })
            }
            else{
                return resp.status(201).send({
                    message:"doctor not found",
                })
            }
        } catch (error) {
            console.log(error)
            return resp.status(400).send({
                message: "error in fetching user profile",
                success: false,
                error
            })
        }
    }
}

module.exports = new DoctorController();