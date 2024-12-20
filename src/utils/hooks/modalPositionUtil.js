export const calculateModalPosition = (scrollContainerRef, category) => {
    const categoryRect = scrollContainerRef.current.getBoundingClientRect();

    // Menghitung posisi tengah kategori
    const categoryCenter = categoryRect.left + categoryRect.width / 2;

    // Menentukan nilai `top` berdasarkan kategori
    let topOffset = 0;
    if (category === "popular") {
        topOffset = 500;  // Untuk kategori popular
    } else if (category === "trending") {
        topOffset = 500;    // Untuk kategori trending
    } else if (category === "top_rated") {
        topOffset = 900;  // Untuk kategori top_rated, kita tambahkan top offset 1000
    }

    // Menyesuaikan posisi modal untuk muncul di tengah kategori
    const modalPosition = {
        top: categoryCenter + topOffset,  // Sesuaikan posisi modal
        left: categoryCenter - 0,         // Mengatur modal agar selalu di tengah kategori
    };

    // Pastikan modal tidak keluar dari layar
    const maxLeft = window.innerWidth - 400; // 400 adalah lebar modal
    if (modalPosition.left < 0) {
        modalPosition.left = 0;
    } else if (modalPosition.left > maxLeft) {
        modalPosition.left = maxLeft;
    }

    return modalPosition;
};
