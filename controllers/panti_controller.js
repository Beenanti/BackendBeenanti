require("../models/associations");
const modelPanti = require("../models/panti");
const modelStatus = require("../models/status");
const modelUser = require("../models/user");
const modelJenisPanti = require("../models/jenis_panti");
const modelRiwayatVerifikasiPanti = require("../models/riwayat_verifikasi_panti")
const { Sequelize, where, Op } = require('sequelize');
const geolib = require('geolib');

// ------------------------------------------------------
const getList = async (req, res) => {
    try {

      const data_panti = await modelPanti.findAll({
        include: [ modelJenisPanti, modelStatus],
        order: [
          ['createdAt', 'ASC']
        ],
      })

      const data = data_panti.map((panti) => {
        return {
          id_panti : panti.id_panti, 
          nama_panti: panti.nama_panti, 
          alamat: panti.alamat,
          koordinat: panti.geom.coordinates,
          jumlah_anak: panti.jumlah_anak,
          jumlah_pengurus: panti.jumlah_pengurus,
          nama_pimpinan: panti.nama_pimpinan,
          nohp: panti.nohp,
          email: panti.email,
          sosmed: panti.sosmed,
          jenis: panti.jenis_panti.nama_jenis,
          status: panti.status.nama_status,
          createdAt : panti.createdAt,
          updatedAt : panti.updatedAt
        }
      })

      res.status(200).json({error: false, count:data_panti.length, data});
      
    } catch (err) {
      res.status(500).json({ error:true, message: err });
      console.error(err)
    }
};

const detail = async (req, res) => {
  try {
    const id = req.params.id_panti
    if (id == null||id == undefined) {
      return res.status(401).json({ error: true, message: 'Pilih panti terlebih dahulu' });
    }

    const data_panti = await modelPanti.findByPk(id, {
      include: [{model: modelJenisPanti}, {model: modelStatus}]
    })

    if (data_panti) {
      return res.status(200).json({error: false, data: {
        id_panti : data_panti.id_panti, 
        nama_panti: data_panti.nama_panti, 
        alamat: data_panti.alamat,
        koordinat: data_panti.geom.coordinates,
        jumlah_anak: data_panti.jumlah_anak,
        jumlah_pengurus: data_panti.jumlah_pengurus,
        nama_pimpinan: data_panti.nama_pimpinan,
        nohp: data_panti.nohp,
        email: data_panti.email,
        sosmed: data_panti.sosmed,
        jenis: data_panti.jenis_panti.nama_jenis,
        status: data_panti.status.nama_status,
        createdAt : data_panti.createdAt,
        updatedAt : data_panti.updatedAt
      }})
    } else {
      res.status(404).json({error:true, message:"panti tidak ada"})
    }

  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err)
  }
}

const tambah = async (req, res) => {
  try {
    const {id_panti, nama_panti, alamat, latitude, longitude, jumlah_anak, jumlah_pengurus, nama_pimpinan, nohp, email, sosmed, jenis } = req.body;

    const baru = await modelPanti.create({
      id_panti, nama_panti, alamat,
      geom: { type: 'Point', coordinates: [latitude, longitude] },
      jumlah_anak: parseInt(jumlah_anak) , jumlah_pengurus : parseInt(jumlah_pengurus),
      nama_pimpinan, nohp, email, sosmed, id_jenis: jenis, status_id: '1'
    })

    const riwayat = await modelRiwayatVerifikasiPanti.create({id_panti, status_id: '1', aksi: 'tambah', data: req.body})

    return res.status(201).json({ error: false, message: 'Berhasil tambah data panti!' });

  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err)
  }
}

const edit = async (req, res) => {
  try {
    const id = req.params.id_panti;
    if (id == null||id == undefined) {
      return res.status(401).json({ error: true, message: 'id pantinya kosong' });
    }

    const {id_panti, nama_panti, alamat, latitude, longitude, jumlah_anak, jumlah_pengurus, nama_pimpinan, nohp, email, sosmed, jenis, status } = req.body;

    const data_baru = {}
    if (id_panti) { data_baru.id_panti = id_panti; }
    if (nama_panti) { data_baru.nama_panti = nama_panti; }
    if (alamat) { data_baru.alamat = alamat; }
    if (latitude) { data_baru.latitude = latitude; }
    if (longitude) { data_baru.longitude = longitude; }
    if (jumlah_anak) { data_baru.jumlah_anak = parseInt(jumlah_anak); }
    if (jumlah_pengurus) { data_baru.jumlah_pengurus = parseInt(jumlah_pengurus); }
    if (nama_pimpinan) { data_baru.nama_pimpinan = nama_pimpinan; }
    if (nohp) { data_baru.nohp = nohp; }
    if (email) { data_baru.email = email; }
    if (sosmed) { data_baru.sosmed = sosmed; }
    if (jenis) { data_baru.id_jenis = jenis; }
    if (status) { data_baru.status_id = status; }

    const apdet = await modelPanti.update(data_baru, {where: {id_panti:id}});

    let status_panti;
    if (!status) {
      if (id_panti) {
        const panti_apdet = await modelPanti.findByPk(id_panti)
        status_panti = panti_apdet.status_id
      } else {
        const panti_apdet = await modelPanti.findByPk(id)
        status_panti = panti_apdet.status_id
      }
    } else {
      status_panti = status
    }

    let aidi_panti;
    if (!id_panti) {
      aidi_panti = id
    } else {
      aidi_panti = id_panti
    }

    // console.log(status_panti + '<- status  <<< <> >>>  id panti->' + aidi_panti)
    const riwayat = await modelRiwayatVerifikasiPanti.create({id_panti: aidi_panti, status_id: status_panti, aksi: 'edit', data: data_baru})
    
    return res.status(200).json({error: false, message: 'berhasil update data', data_baru});
    
  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err)
  }
}

const cari = async (req, res) => {
  try {
    const { nama_panti, latitude, longitude } = req.query;

    // Mencari panti asuhan berdasarkan nama
    const panti = await modelPanti.findAll({
      where: {nama_panti: {[Op.like]: `%${nama_panti}%`}}
    })
    
    // const data = geolib.orderByDistance(
    //   { latitude, longitude},
    //   panti.map(data_panti => ({
    //     latitude: data_panti.geom.coordinates[0],
    //     longitude: data_panti.geom.coordinates[1],
    //     nama_panti: data_panti.nama_panti,
    //     id_panti: data_panti.id_panti,
    //     // distance: data_panti.distance
    //   }))
    // )
    
    // Mengukur jarak antara koordinat user dengan koordinat panti
    panti.forEach(data_panti => {
      data_panti.jarak = geolib.getDistance(
        {latitude, longitude},
        {latitude: data_panti.geom.coordinates[0], longitude: data_panti.geom.coordinates[1] }
      )
    })

    // Mengurutkan hasil pencarian berdasarkan jarak terdekat
    panti.sort((a, b) => a.jarak - b.jarak)

    const data = panti.map(dataa => ({
      id_panti: dataa.id_panti,
      nama_panti: dataa.nama_panti,
      alamat: dataa.alamat,
      koordinat : dataa.geom.coordinates
    }))

    res.status(200).json({error: false, count:panti.length, data});

  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err);
  }
}

const lihatDataDikelola = async (req, res) => {
  try {

    const data_panti = await modelPanti.findAll({
      include: [
        {
          model: modelUser,
          where: {email: req.user.email }
        },
        {model: modelJenisPanti}, 
        {model: modelStatus}
      ],
      order: [ ['createdAt', 'ASC'] ],
    })

    const data = data_panti.map((panti) => {
      return {
        id_panti : panti.id_panti, 
        nama_panti: panti.nama_panti, 
        alamat: panti.alamat,
        koordinat: panti.geom.coordinates,
        jumlah_anak: panti.jumlah_anak,
        jumlah_pengurus: panti.jumlah_pengurus,
        nama_pimpinan: panti.nama_pimpinan,
        nohp: panti.nohp,
        email: panti.email,
        sosmed: panti.sosmed,
        jenis: panti.jenis_panti.nama_jenis,
        status: panti.status.nama_status,
        createdAt : panti.createdAt,
        updatedAt : panti.updatedAt
      }
    })

    res.status(200).json({error: false, count:data_panti.length, data});

  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err)
  }
}

const editDataDikelola = async (req, res) => {
  try {
    const id = req.params.id_panti;
    if (id == null||id == undefined) {
      return res.status(401).json({ error: true, message: 'Id pantinya kosong' });
    }

    // di cek dulu apakah id panti yang bersangkutan merupakan panti yang dikelola oleh admin tersebut
    const trukah = await modelPanti.findOne({
      include: [
        {
          model: modelUser, 
          where: {email: req.user.email }
        }
      ],
      where: {id_panti:id}
    })

    if (!trukah) {
      return res.status(403).json({ error: true, message: 'Tidak bisa mengedit data ini!' });
    }

    const {id_panti, nama_panti, alamat, latitude, longitude, jumlah_anak, jumlah_pengurus, nama_pimpinan, nohp, email, sosmed, jenis } = req.body;

    const data_baru = {}
    if (id_panti) { data_baru.id_panti = id_panti; }
    if (nama_panti) { data_baru.nama_panti = nama_panti; }
    if (alamat) { data_baru.alamat = alamat; }
    if (latitude) { data_baru.latitude = latitude; }
    if (longitude) { data_baru.longitude = longitude; }
    if (jumlah_anak) { data_baru.jumlah_anak = parseInt(jumlah_anak); }
    if (jumlah_pengurus) { data_baru.jumlah_pengurus = parseInt(jumlah_pengurus); }
    if (nama_pimpinan) { data_baru.nama_pimpinan = nama_pimpinan; }
    if (nohp) { data_baru.nohp = nohp; }
    if (email) { data_baru.email = email; }
    if (sosmed) { data_baru.sosmed = sosmed; }
    if (jenis) { data_baru.id_jenis = jenis; }

    const apdet = modelPanti.update(data_baru, {where: {id_panti:id}});

    let aidi_panti;
    if (!id_panti) {
      aidi_panti = id
    } else {
      aidi_panti = id_panti
    }

    const riwayat = await modelRiwayatVerifikasiPanti.create({id_panti: aidi_panti, status_id: trukah.status_id, aksi: 'edit', data: data_baru})

    return res.status(200).json({error: false, message: 'berhasil update data', data_baru});

  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err)
  }
}

const riwayatVerifikasi = async (req, res) => {
  try {
    const id = req.params.id_panti

    const riwayat = await modelRiwayatVerifikasiPanti.findAll({
      include:[modelStatus],
      where:{id_panti:id}, 
      order: [['waktu', 'ASC']]
    })

    const data = riwayat.map((data_panti) => {
      return {
        waktu : data_panti.waktu,
        aksi: data_panti.aksi,
        status: data_panti.status.nama_status,
        data: data_panti.data
      }
    })

    res.status(200).json({error: false, count: riwayat.length, data});

  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err)
  }
}

const statusJenisPanti = async (req, res) => {
  try {
    const status = await modelStatus.findAll();
    const jenis_panti = await modelJenisPanti.findAll();

    return res.status(200).json({error: false, status, jenis_panti});

  } catch (err) {
    res.status(500).json({ error:true, message: err });
    console.error(err)
  }
}


module.exports = {getList, detail, tambah, edit, cari, lihatDataDikelola, editDataDikelola, riwayatVerifikasi, statusJenisPanti};