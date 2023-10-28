require("../models/associations");
const { nanoid } = require('nanoid');
const modelPanti = require("../models/panti");
const modelStatus = require("../models/status");
const modelSatuan = require("../models/satuan");
const modelUser = require("../models/user");
const modelGaleri = require("../models/galeri");
const modelKebutuhan = require("../models/kebutuhan_panti");
const modelJenisKebutuhan = require("../models/jenis_kebutuhan")
const modelJenisPanti = require("../models/jenis_panti");
const modelRiwayatVerifikasiPanti = require("../models/riwayat_verifikasi_panti")
const {where, Op } = require('sequelize');
const geolib = require('geolib');
const {deleteFile} = require('../middlewares/functions');

// ------------------------------------------------------
const getList = async (req, res) => {
    try {

      const data_panti = await modelPanti.findAll({
        include: [ modelJenisPanti, modelStatus, modelGaleri],
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
          galeri : panti.galeris.map((galeri) => ({
            id_gambar : galeri.id_gambar,
            nama : galeri.nama,
            url : galeri.url_gambar,
            deskripsi : galeri.deskripsi,
            user_upload : galeri.username,
            createdAt : galeri.createdAt,
            updatedAt : galeri.updatedAt,

          })),
          createdAt : panti.createdAt,
          updatedAt : panti.updatedAt,
        }
      })

      res.status(200).json({error: false, count:data_panti.length, data});
      
    } catch (err) {
      console.error(err)
      res.status(500).json({ error:true, message: err });
    }
};

const detail = async (req, res) => {
  try {
    const id = req.params.id_panti
    if (id == null||id == undefined) {
      return res.status(401).json({ error: true, message: 'Pilih panti terlebih dahulu' });
    }

    const data_panti = await modelPanti.findByPk(id, {
      include: [ modelJenisPanti, modelStatus, modelGaleri, 
        { model : modelKebutuhan,
          include : [modelJenisKebutuhan, modelSatuan]
        }
      ]
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
        galeri: data_panti.galeris.map((galeri) => ({
          id_gambar : galeri.id_gambar,
          nama : galeri.nama,
          url : galeri.url_gambar,
          deskripsi : galeri.deskripsi,
          user_upload : galeri.username,
          createdAt : galeri.createdAt,
          updatedAt : galeri.updatedAt,

        })),
        kebutuhan : data_panti.kebutuhan_pantis.map((kebutuhan => ({
          id_kebutuhan: kebutuhan.id_kebutuhan,
          nama: kebutuhan.nama_kebutuhan,
          jumlah : kebutuhan.jumlah_kebutuhan,
          satuan : kebutuhan.satuan.nama_satuan,
          jenis : kebutuhan.jenis_kebutuhan.nama_jenis_kebutuhan,
          createdAt : kebutuhan.createdAt,
          updatedAt : kebutuhan.updatedAt
        }))),
        createdAt : data_panti.createdAt,
        updatedAt : data_panti.updatedAt
      }})
    } else {
      res.status(404).json({error:true, message:"panti tidak ada"})
    }

  } catch (err) {
    console.error(err)
    res.status(500).json({ error:true, message: err });
  }
}

const tambah = async (req, res) => {
  try {
    const { nama_panti, alamat, latitude, longitude, jumlah_anak, jumlah_pengurus, nama_pimpinan, nohp, email, sosmed, jenis } = req.body;
    const id_panti = nanoid(3);
    
    await modelPanti.create({
      id_panti, nama_panti, alamat,
      geom: { type: 'Point', coordinates: [latitude, longitude] },
      jumlah_anak: parseInt(jumlah_anak) , jumlah_pengurus : parseInt(jumlah_pengurus),
      nama_pimpinan, nohp, email, sosmed, id_jenis: jenis, status_id: '1'
    })

    await modelRiwayatVerifikasiPanti.create({id_panti, status_id: '1', aksi: 'tambah', data: req.body})

    return res.status(201).json({ error: false, message: 'Berhasil tambah data panti!' });

  } catch (err) {
    console.error(err)
    res.status(500).json({ error:true, message: err });
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

    await modelPanti.update(data_baru, {where: {id_panti:id}});

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
    await modelRiwayatVerifikasiPanti.create({id_panti: aidi_panti, status_id: status_panti, aksi: 'edit', data: data_baru})
    
    return res.status(200).json({error: false, message: 'berhasil update data', data_baru});
    
  } catch (err) {
    console.error(err)
    res.status(500).json({ error:true, message: err });
  }
}

const cari = async (req, res) => {
  try {
    const { nama_panti, latitude, longitude } = req.query;

    // Mencari panti asuhan berdasarkan nama
    const panti = await modelPanti.findAll({
      where: {nama_panti: {[Op.like]: `%${nama_panti}%`}}
    })
    
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
    console.error(err);
    res.status(500).json({ error:true, message: err });
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
    console.error(err)
    res.status(500).json({ error:true, message: err });
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

    modelPanti.update(data_baru, {where: {id_panti:id}});

    let aidi_panti;
    if (!id_panti) {
      aidi_panti = id
    } else {
      aidi_panti = id_panti
    }

    await modelRiwayatVerifikasiPanti.create({id_panti: aidi_panti, status_id: trukah.status_id, aksi: 'edit', data: data_baru})

    return res.status(200).json({error: false, message: 'berhasil update data', data_baru});

  } catch (err) {
    console.error(err)
    res.status(500).json({ error:true, message: err });
  }
}

const riwayatVerifikasi = async (req, res) => {
  try {
    const id = req.params.id_panti;

    const riwayat = await modelRiwayatVerifikasiPanti.findAll({
      include:[modelStatus],
      where:{id_panti:id}, 
      order: [['waktu', 'ASC']]
    });

    const data = riwayat.map((data_panti) => {
      return {
        waktu : data_panti.waktu,
        aksi: data_panti.aksi,
        status: data_panti.status.nama_status,
        data: data_panti.data
      }
    });

    res.status(200).json({error: false, count: riwayat.length, data});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error:true, message: err });
  }
}

const uploadGaleri = async (req, res) => {
  const id_panti = req.params.id_panti;
  const galeri = req.files;
  const username = req.user.email;

  try {

    const panti = await modelPanti.findByPk(id_panti);
    if (!panti) {
      return res.status(404).json({ error: true, message: 'Panti tidak ditemukan' });
    }

    if (galeri==''||galeri==null) {
      return res.status(400).json({ error: true, message: 'Foto tidak ada' });
    }

    galeri.forEach(foto => {
      modelGaleri.create({
        id_panti, username,
        nama : req.body.nama,
        url_gambar : foto.filename,
        deskripsi : req.body.deskripsi,
      })
      .then(() => console.log('Berhasil menyimpan ke database'))
      .catch(error => {
        console.error(error);
        deleteFile(foto.path)
        next(error);
      });;
    });

    return res.status(200).json({error: false, message: 'Berhasil menyimpan ke database'});

  } catch (err) {

    galeri.forEach(foto => {
      deleteFile(foto.path)
    });

    console.error(err);
    res.status(500).json({ error:true, message: err });
  }
}


module.exports = {getList, detail, tambah, edit, cari, lihatDataDikelola, editDataDikelola, riwayatVerifikasi, uploadGaleri};