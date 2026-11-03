import mongoose, { Document, Schema } from 'mongoose';

export interface IList extends Document {
    title: string;
    boardId: mongoose.Types.ObjectId;
    position: number; // Para ordenar las columnas de izquierda a derecha
}

const ListSchema: Schema = new Schema({
    title: { type: String, required: true },
    boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
    position: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model<IList>('List', ListSchema);