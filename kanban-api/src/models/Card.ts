import mongoose, { Document, Schema } from 'mongoose';

export interface ICard extends Document {
    title: string;
    description?: string;
    listId: mongoose.Types.ObjectId;
    position: number; // Vital para mantener el orden al arrastrar y soltar
}

const CardSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
    position: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model<ICard>('Card', CardSchema);