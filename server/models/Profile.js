import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  village: { type: String, required: true },
  state: { type: String, required: true },
  crop: { type: String, required: true },
  acres: { type: Number, required: true },
  soilType: { type: String, required: true },
  challenges: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  sowingDate: { type: Date, default: () => new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
