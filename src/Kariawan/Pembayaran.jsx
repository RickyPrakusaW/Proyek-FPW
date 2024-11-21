import React from "react";

function Pembayaran() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
      {/* Popup */}
      <div className="bg-white rounded-lg shadow-lg w-1/3">
        <div className="p-6">
          {/* Header */}
          <h1 className="text-xl font-bold text-center">Pembayaran</h1>
          <hr className="my-4" />
          
          {/* Metode Pembayaran */}
          <div className="space-y-6">
            {/* Transfer */}
            <div className="flex items-center justify-between p-4 bg-blue-100 rounded-md">
              <div>
                <h2 className="text-lg font-bold text-blue-600">BCA Transfer</h2>
                <p className="text-sm text-gray-700">012345678912 - Michael</p>
              </div>
              <img
                src="https://via.placeholder.com/50"
                alt="BCA Logo"
                className="w-12 h-12"
              />
            </div>
            {/* Cash */}
            <div className="flex items-center justify-between p-4 bg-yellow-100 rounded-md">
              <div>
                <h2 className="text-lg font-bold text-yellow-600">Cash</h2>
                <p className="text-sm text-gray-700">Bayar secara tunai</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 flex items-center justify-center rounded-md text-white">
                💵
              </div>
            </div>
          </div>

          {/* Total Tagihan */}
          <div className="mt-6">
            <div className="flex justify-between px-4 py-2 text-lg font-bold bg-gray-100 rounded-md">
              <span>Total Tagihan:</span>
              <span>Rp. 0</span>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-between mt-6 space-x-4">
            <button className="w-1/2 px-4 py-2 text-white bg-pink-500 rounded-md hover:bg-pink-600">
              Kembali
            </button>
            <button className="w-1/2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
              Bayar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pembayaran;
