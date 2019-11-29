const User = require("../models/User");
const Notify = require("../models/Notify");

const parseISO = require("date-fns/parseISO");
const isToday = require("date-fns/isToday");
const isYesterday = require("date-fns/isYesterday");
const isThisWeek = require("date-fns/isThisWeek");

module.exports = {
  async index(req, res) {
    const notify = await Notify.find({});
    return res.json(notify);
  },

  async show(req, res) {
    const { user: id } = req.params;

    const notifys = await Notify.find({ to: { $in: id } });

    const organizado = {
      today: [],
      yesterday: [],
      week: [],
      outhers: []
    };

    notifys.forEach(item => {
      const itemDate = item.createdAt;

      if (isToday(itemDate)) {
        organizado.today.push(item);
        return;
      }

      if (isYesterday(itemDate)) {
        organizado.yesterday.push(item);
        return;
      }

      if (isThisWeek(itemDate)) {
        organizado.week.push(item);
        return;
      }

      organizado.outhers.push(item);
    });

    return res.json(organizado);
  },

  async store(req, res) {
    const { to, ...rest } = req.body;

    const { user } = req.headers;

    const notify = await Notify.create(rest);

    const userLogged = await User.findById(user);

    userLogged.notification.push(notify._id);

    await userLogged.save();

    const users = await User.find({ _id: { $in: to } });

    users.forEach(item => notify.to.push(item._id));

    await notify.save();

    return res.json(notify);
  }
};
