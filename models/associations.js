'use strict';

// imbau tabel
const detail_admin_panti = require("./detail_admin_panti")
const galeri = require("./galeri")
const jenis_panti = require("./jenis_panti")
const panti = require("./panti")
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