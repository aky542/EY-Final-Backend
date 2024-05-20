import Blogs from "../models/blog_model.js"



const getAllblogs = async(req,res) =>{
    try{
        const blogList = await Blogs.find();

        if(!blogList){
            res.status(400).json({success:false,message:"Not found"});
        }
        else{
        res.status(200).json({success:true,data:blogList});
        console.log(blogList);
        }

    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false, msg:"Failed to fetch data"}); 
    }
}

const getBlog = async(req,res) => {
    try {
        const blog = await Blogs.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        res.json({success:true,data:blog});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

const createBlog = async(req,res) => {
    try{

        if (!req.body.title ||!req.body.content) {
            return res.status(400).json({ success: false, message: "Title and content are required" });
        }

        const newBlog = await Blogs.create({...req.body,createdBy: req.body.createdBy});
        res.status(201).json(newBlog);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create blog post" });
    }
};

const eidtBlog = async(req,res) => {
    try {
        const updatedBlog = await Blogs.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBlog) return res.status(404).json({ success: false, message: 'Blog not found' });
        res.json({success:true,data:updatedBlog});
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


const deleteBlog = async(req,res) => {
    try {
        const deletedBlog = await Blogs.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ success: false, message: 'Blog not found' });
        res.json({success:true,data:deletedBlog});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export {getAllblogs,getBlog,createBlog,eidtBlog,deleteBlog};
