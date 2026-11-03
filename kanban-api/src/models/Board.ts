import mongoose, { Document, Schema } from 'mongoose';

export interface IBoard extends Document {
    title: string;
}

const BoardSchema: Schema = new Schema({
    title: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IBoard>('Board', BoardSchema);