import mongoose, { Schema, Document } from 'mongoose';

interface IRecommendation extends Document {
  modelId: string;
  userInput: string;
  recommendationData: object;
}

const RecommendationSchema = new Schema<IRecommendation>({
  modelId: { type: String, required: true },
  userInput: { type: String, required: true },
  recommendationData: { type: Object, required: true },
}, { timestamps: true });

const Recommendation = mongoose.models.Recommendation || mongoose.model<IRecommendation>('Recommendation', RecommendationSchema);

export default Recommendation;
