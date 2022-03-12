const { MessageActionRow, MessageButton } = require('discord.js');
const passport = require('passport');
const express = require('express');
const moment = require('moment');

const checkAuth = require('../backend/checkauth');

require('moment-duration-format');
require('dotenv').config();

const router = express.Router();

router.get('/profile', checkAuth, async (req, res) => {

    let userObj = req.client.users.cache.get(req.user.id);

        let guild = req.client.guilds.cache.get(process.env.GUILD_ID)
        let role = guild.roles.cache.get(process.env.ROLE_ID)
        let member = guild.members.cache.get(userObj.id)

        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Developed by zédyN')
					.setStyle('LINK')
                    .setURL('https://discord.com/users/559116776257093653'),

			);

        member.roles.add(role)
        member.send({
            content: `* *your account has been verified successfully.*`,
            components: [row]
        });

        res.render('verify/profile', {
            tag: (req.user ? req.user.tag : 'Login'),
            bot: req.client,
            moment: moment,
            userObj: userObj,
            user: req.user || null,
        });
});

module.exports = router;
