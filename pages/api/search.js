import data_db from "../../DB/AllUser.json";

export default (req, res) => {
  const data = data_db.find((item, index) => {
    return item.id == req.query.id;
  });
  if (data) {
    res.status(200).json({ status: 200, message: "success", data });
  } else {
    res.status(200).json({ status: 400, message: "not found" });
  }
};
