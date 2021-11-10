(Sistemnya milik 1 resto pribadi)
RESTO DITA

1. Halaman admin(administrator)
   Restock produk, melihat saldo

2. Halaman Kurir
   Kurir dibedakan berdasarkan wilayah, verifikator

3. Halaman user

- halaman utama kyk pengenalan resto itu
- halaman registrasi (nama,alamat,no.telp)
- Proses pemesanan, user milih menu yg diinginkan
  (Sesuai kategori makanan, minuman, dan disert)

4. Masukkan keranjang menu

5. Chekout

- Tetapkan lokasi pengiriman
- Pembayaran menggunakan e-wallet, user harus mengisi saldo e-wallet untuk pembayaran

3. Ongkir

- Berdasarkan wilayah kecamatan kota Bangkalan

4. Tentang kami, berisi kontak dan tautan media sosial lainnya di resto itu

SWIMLANE

1. User
2. Admin
3. Kurir
4. Sistem Resto DITA (SIRESTA)

SKENARIO

1. User membuka web SIRESTA
2. SIRESTA menampilkan halaman utama, halaman registrasi, proses pemesanan
3. User memasukkan nama, alamat,no. hp
4. Data center verifikasi nama alamat no.h
   Decision : jika benar/ya, SIRESTA akan menampilkan kategori pilihan
   jika tidak, maka user harus melakukan registrasi terlebih dahulu
5. User memilih kategori pilihan
   Decision : jika ya, SIRESTA akan menampilkan keranjang pemesanan
   jika tidak, maka harus memilih terlebih dahulu
6. User menetapkan lokasi pengiriman
7. User melakukan pembayaran malalui e-wallet
8. Kurir melakukan proses pengiriman
9. Kurir memverifikasi jika pesanan sudah sampai
10. Admin membuka website
11. Admin merestock produk dan melihat saldo user
