'use strict';

// imbau tabel
const detail_admin_panti = require("./detail_admin_panti")
const donasi = require("./donasi")
const galeri = require("./galeri")
const jenis_kebutuhan = require("./jenis_kebutuhan")
const jenis_panti = require("./jenis_panti")
const karya = require("./karya")
const kebutuhan_panti = require("./kebutuhan_panti")
const kunjungan_und = require("./kunjungan_und")
const panti = require("./panti")
const relawan = require("./relawan")
const riwayat_verifikasi_panti = require("./riwayat_verifikasi_panti")
const satuan = require("./satuan")
const status = require("./status")
const token_user = require("./token_user")
const user = require("./user")

// relasi antar tabel
jenis_panti.hasMany(panti, {foreignKey: 'id_jenis'})
panti.belongsTo(jenis_panti, {foreignKey: 'id_jenis'})

status.hasMany(panti, {foreignKey: 'status_id'})
panti.belongsTo(status, {foreignKey: 'status_id'})

status.hasMany(user, {foreignKey: 'status_id'})
user.belongsTo(status, {foreignKey: 'status_id'})

user.belongsToMany(panti, {through : detail_admin_panti, foreignKey: 'email'})
panti.belongsToMany(user, {through : detail_admin_panti, foreignKey: 'id_panti'})

status.hasMany(riwayat_verifikasi_panti, {foreignKey: 'status_id'})
riwayat_verifikasi_panti.belongsTo(status, {foreignKey: 'status_id'})

user.hasOne(relawan, {foreignKey: 'email_relawan'})
relawan.belongsTo(user, {foreignKey: 'email_relawan'})

panti.hasMany(relawan, {foreignKey: 'id_panti'})
relawan.belongsTo(panti, {foreignKey: 'id_panti'})

user.hasMany(kunjungan_und, {foreignKey: 'email'})
kunjungan_und.belongsTo(user, {foreignKey: 'email'})

panti.hasMany(kunjungan_und, {foreignKey: 'id_panti'})
kunjungan_und.belongsTo(panti, {foreignKey: 'id_panti'})

user.hasMany(donasi, {foreignKey: 'email_donatur'})
donasi.belongsTo(user, {foreignKey: 'email_donatur'})

panti.hasMany(donasi, {foreignKey: 'id_panti'})
donasi.belongsTo(panti, {foreignKey: 'id_panti'})

panti.hasMany(karya, {foreignKey: 'id_panti'})
karya.belongsTo(panti, {foreignKey: 'id_panti'})

panti.hasMany(kebutuhan_panti, {foreignKey: 'id_panti'})
kebutuhan_panti.belongsTo(panti, {foreignKey: 'id_panti'})

satuan.hasMany(kebutuhan_panti, {foreignKey: 'id_satuan'})
kebutuhan_panti.belongsTo(satuan, {foreignKey: 'id_satuan'})

jenis_kebutuhan.hasMany(kebutuhan_panti, {foreignKey: 'id_jenis_kebutuhan'})
kebutuhan_panti.belongsTo(jenis_kebutuhan, {foreignKey: 'id_jenis_kebutuhan'})

satuan.hasMany(donasi, {foreignKey: 'id_satuan'})
donasi.belongsTo(satuan, {foreignKey: 'id_satuan'})

jenis_kebutuhan.hasMany(donasi, {foreignKey: 'id_jenis_kebutuhan'})
donasi.belongsTo(jenis_kebutuhan, {foreignKey: 'id_jenis_kebutuhan'})

user.hasMany(token_user, {foreignKey: 'email_user'})
token_user.belongsTo(user, {foreignKey: 'email_user'})

panti.hasMany(galeri, {foreignKey: 'id_panti'})
galeri.belongsTo(panti, {foreignKey: 'id_panti'})
