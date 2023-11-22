const UserOrders = require("../../models/orderedbyuser");

const orderedData = async (req, res) => {
  try {
    const { fullName, contact, city, state, streetAddress} =
      req.body;
    const orderedData = new UserOrders({
        fullName,
        contact,
        city,
        state,
        streetAddress,
    });
    await orderedData.save();
    res.status(201).json(orderedData);
  } catch (err) {
    res.status(500).json({ message: err.message || "Something went wrong" });
  }
};

module.exports = orderedData;
