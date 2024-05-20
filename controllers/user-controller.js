
import Users from "../models/user_model.js"; 

const registerUser = async(req,res) =>{
    try{
        const user = await Users.create({...req.body});


        console.log(user);

        const token = user.createJwt();
        res.status(200).json({user:{name:user.name},token,msg:"User created"});
    }
    catch(error){
        console.error(error);
        res.status(401).json({error:error});
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email ||!password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" }); 
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect credentials" });
        }

        const token = user.createJwt();
        res.status(200).json({ user: { name: user.name }, token });
        console.log(token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred during login" }); 
    }
};



const getAllUsers = async(req,res) =>{
    try{
        const userList = await Users.find(); 
        res.status(200).json({success:true, data: userList}); 
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false, msg:"Failed to fetch user data"});
    }
};



const getUserById = async(req,res) =>{
    const {id} = req.params;
    try{
        const userToFind = await Users.findById(id); 
        if(!userToFind){
            res.status(400).json({success:false, msg:"No user found"});
        }
        res.status(200).json({success:true, data:userToFind});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false, msg:"Failed to fetch user data"});
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await Users.findByIdAndUpdate(id, {...req.body}, { new: true }); // Use Users model
        if (!updatedUser) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Failed to update user data" });
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await Users.findByIdAndDelete(id); // Use Users model
        if (!deletedUser) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        res.status(200).json({ success: true, msg: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Failed to delete user data" });
    }
};




export {registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser};
