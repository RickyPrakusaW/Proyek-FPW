// const MessageSchema = new mongoose.Schema({
//     chatId: { // Referensi ke ID chat
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Chat',
//       required: true,
//     },
//     sender: { // Pengirim pesan
//       type: mongoose.Schema.Types.ObjectId,
//       refPath: 'senderRole', // Referensi dinamis ke model pengirim (Admin, KepalaGudang, atau Karyawan)
//       required: true,
//     },
//     senderRole: { // Peran pengirim pesan
//       type: String,
//       enum: ['Admin', 'KepalaGudang', 'Karyawan'],
//       required: true,
//     },
//     message: { // Isi pesan
//       type: String,
//       required: true,
//     },
//     isRead: { // Status pesan apakah sudah dibaca
//       type: Boolean,
//       default: false,
//     },
//     createdAt: { // Waktu pesan dibuat
//       type: Date,
//       default: Date.now,
//     },
//   });
  
//   const Message = mongoose.model('Message', MessageSchema);
//   module.exports = Message;
  