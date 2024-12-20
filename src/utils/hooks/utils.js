export const formatTitle = (title) => {
    // Pastikan title adalah string yang valid
    if (!title || typeof title !== 'string') {
      return ''; // Kembalikan string kosong jika title tidak valid
    }
  
    // Hapus semua karakter kecuali huruf, angka, dan spasi
    const cleanedTitle = title.replace(/[^a-zA-Z0-9\s]/g, '');
  
    // Pangkas judul agar panjangnya maksimal 40 karakter
    return cleanedTitle.length > 40 ? cleanedTitle.slice(0, 40) + '...' : cleanedTitle;
  };
  