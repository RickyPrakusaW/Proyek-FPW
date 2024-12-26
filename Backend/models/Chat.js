// const mongoose = require('mongoose');

// const ChatSchema = new mongoose.Schema({
//   participants: [ // ID pengguna yang terlibat dalam chat
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       refPath: 'participantRoles', // Referensi dinamis ke model yang sesuai (Admin, KepalaGudang, atau Karyawan)
//       required: true,
//     },
//   ],
//   participantRoles: [ // Peran dari peserta chat (admin, kepala_gudang, atau karyawan)
//     {
//       type: String,
//       enum: ['Admin', 'KepalaGudang', 'Karyawan'],
//       required: true,
//     },
//   ],
//   lastMessage: { // Pesan terakhir di percakapan
//     type: String,
//     default: '',
//   },
//   updatedAt: { // Waktu terakhir diperbarui
//     type: Date,
//     default: Date.now,
//   },
// });

// const Chat = mongoose.model('Chat', ChatSchema);
// module.exports = Chat;
