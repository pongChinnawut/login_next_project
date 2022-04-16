import data_db from "../../DB/AllUser.json";

export default (req, res) => {
  data_db.map((item, index) => {
    if (
      item.username == req.body.username &&
      item.password == req.body.password
    ) {
      res.status(200).json({ status: 200, message: "success", id: item.id });
    } else {
      res.status(200).json({ status: 400, message: "failed" });
    }
  });
};
