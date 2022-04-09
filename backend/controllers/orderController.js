import { OrderModel } from "../models/OrderModel.js";
import { OrderDetailModel} from "../models/OrderDetailModel.js";
export const orderController = {
    add: async (req, res)=>{
        try {
            const newOrder = new OrderModel(req.body);
            const saveOrder = await newOrder.save();
            res.status(200).json(saveOrder);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAll: async (req, res) =>{
        try {
            const orders = await OrderModel.find();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    update: async (req, res) =>{
        try {
            const order = await OrderModel.findById(req.params.id);
            await order.updateOne({ $set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    delete: async (req, res) =>{
        try {
            await OrderModel.findByIdAndDelete(req.params.id);
            await OrderDetailModel.deleteMany({order:req.params.id});
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getA: async (req, res) => {
        try {
            const order = await OrderModel.findById(req.params.id);
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getByStatus: async (req, res) =>{
        try {
            const orders = await OrderModel.find({status:req.params.id});
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}