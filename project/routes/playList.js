const router = require("express").Router();

const { findOne } = require("../models/chart.js");
const { PlayList } = require(`../models/index.js`);
const { MusicList } = require(`../models/index.js`);

router.post(`/list`, async (req, res) => {
  console.log(req.body);
  const playlistData = await PlayList.findOne({
    where: {
      userId: req.body.userId,
      playlistName: req.body.playlistName,
    },
  });
  // const checkUser = await User.findOne({ where: { userId: req.body.id } });
  // 일단 하나만 찾아올건데 req로 어떤것 받을지 생각하고있음.
  // playlist에서 유저를 구분 할 수 있는건 유저의 ID랑 플레이리스트의 이름이라고 생각함.
  // 그래서 요청으로 받은 userId와 playlistInfo 가 맞는거로 하나를 찾아서 내보낼 예정임

  res.send(playlistData);
});

router.post("/addplaylist", async (req, res) => {
  try {
    const tempPlaylist = await PlayList.findOne({
      where: { playlistName: req.body.name, userId: req.body.id },
    });
    if (tempPlaylist) {
      res.send({ overlap: 1 });
      res.status(501);
      return;
    }
    await PlayList.create({
      userId: req.body.id,
      playlistName: req.body.name,
      playlistInfo: req.body.info,
    });
    res.send({ addplaylistcom: 1 });
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

router.post("/myplaylist", async (req, res) => {
  try {
    const tempUserid = await PlayList.findAll({
      where: { userId: req.body.id },
    });
    console.log(req.bdoy);
    res.send({ info: tempUserid });
  } catch (error) {
    res.status(503);
    res.send(error);
  }
});

router.post("/delete", async (req, res) => {
  const deleteElem = await PlayList.destroy({
    where: {
      playlistName: req.body.title,
    },
  });
  console.log(req.body.title);
  res.send("삭제완료");
});

module.exports = router;
