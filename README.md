# BackendBeenanti

0. Pastikan telah menginstall nodejs dan mysql
1. Install dependensi (npm install)
2. Buat database (bisa di phpMyAdmin)dengan nama "beenanti"
3. Buat tabel di database dengan menjalankan migration dengan sintaks ==> npx sequelize-cli db:migrate --migrations-path "database/migrations"
4. Isi tabel yang telah dibuat dengan menggunakan seed dengan sintaks ==> npx sequelize-cli db:seed:all --seeders-path "database/seeders"
5. Jalankan server dengan mengetikkan sintaks ==> npm test, pastikan telah menginstall nodemon terlebih dahulu (kalau belum, install dengan sintaks ==> npm install -g nodemon)