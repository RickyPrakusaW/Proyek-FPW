import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

function PrintNota() {
  const [penjualan, setPenjualan] = useState([]);

  // Fungsi untuk mengambil data penjualan dari server
  useEffect(() => {
    const fetchPenjualan = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/getPenjualan");
        const result = await response.json();
        if (response.ok) {
          setPenjualan(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error fetching penjualan:", error);
      }
    };

    fetchPenjualan();
  }, []);

  const handlePrint = (nota) => {
    // Membuat instance jsPDF
    const doc = new jsPDF();

    // Header nota
    doc.setFontSize(16);
    doc.text("TOKO SEMOGA JADI JAYA", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("Menjual Tas dan Koper", 105, 27, { align: "center" });
    doc.text("Alamat: Dupak Grosir Surabaya Blok A2 No. 5", 105, 34, { align: "center" });
    doc.text("Telepon: 08510059521", 105, 41, { align: "center" });

    // Info Nota
    doc.setFontSize(10);
    doc.text(`Nama Customer: ${nota.Customer_id.Nama_lengkap}`, 20, 50);
    doc.text(`Metode Pembayaran: ${nota.metodePembayaran}`, 20, 57);
    doc.text(`Tanggal Pembelian: ${nota.tanggalPembelian}`, 20, 64);
    doc.text(`Total Barang: ${nota.totalBarang}`, 20, 71);
    doc.text(`Total Harga: Rp ${nota.totalHarga}`, 20, 78);

    // Header tabel
    const tableStartY = 85;
    doc.setFontSize(10);
    doc.text("No", 20, tableStartY);
    doc.text("Nama Barang", 40, tableStartY);
    doc.text("Harga", 120, tableStartY);
    doc.text("Jumlah", 150, tableStartY);
    doc.text("Total", 180, tableStartY);
    doc.line(20, tableStartY + 2, 190, tableStartY + 2);

    // Data tabel
    let yOffset = tableStartY + 10;
    let grandTotal = 0; // Untuk menghitung total keseluruhan

    if (nota.idCart && Array.isArray(nota.idCart)) {
      nota.idCart.forEach((item, index) => {
        const itemTotal = item.harga * item.totalProduct;
        grandTotal += itemTotal;

        doc.text(`${index + 1}`, 20, yOffset);
        doc.text(item.namaBarang, 40, yOffset);
        doc.text(`Rp ${item.harga}`, 120, yOffset);
        doc.text(`${item.totalProduct}`, 150, yOffset);
        doc.text(`Rp ${itemTotal}`, 180, yOffset);
        yOffset += 10;
      });
    }

    // Footer
    yOffset += 20;
    doc.text(`Grand Total: Rp ${grandTotal}`, 20, yOffset);

    yOffset += 20;
    doc.text("Tanda Terima,", 20, yOffset);
    doc.text("Hormat Kami,", 150, yOffset);

    // Menyimpan PDF dengan nama yang sesuai
    doc.save(`Nota_${nota._id}.pdf`);
  };

  return (
    <div>
      <h1>Data Penjualan</h1>
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Customer</th>
            <th>Pembayaran</th>
            <th>Detail</th>
            <th>Total Barang</th>
            <th>Total Harga</th>
            <th>Tanggal Pembelian</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {penjualan.map((nota, index) => (
            <tr key={nota.idPenjualan}>
              <td>{index + 1}</td>
              <td>{nota.Customer_id.Nama_lengkap}</td>
              <td>{nota.metodePembayaran}</td>
              <td>
                {nota.idCart &&
                  nota.idCart.map((item) => (
                    <div key={item.namaBarang}>
                      {item.namaBarang} - {item.totalProduct} pcs
                    </div>
                  ))}
              </td>
              <td>{nota.totalBarang}</td>
              <td>Rp {nota.totalHarga}</td>
              <td>{nota.tanggalPembelian}</td>
              <td>
                <button onClick={() => handlePrint(nota)}>Print Nota</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrintNota;
