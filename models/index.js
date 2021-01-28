const Sequelize = require('sequelize');
const db = require('../db');


class User extends Sequelize.Model { }


User.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    }
}, { sequelize: db, modelName: 'user' });


class Page extends Sequelize.Model { }

Page.init({
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    urltitle: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    getRoute: {
        type: Sequelize.VIRTUAL,
        get() {
            return `/wiki/${this.urltitle}`;
        }
    }
}, { sequelize: db, modelName: 'page' });

function generateUrlTitle(title) {
    if (title) {
        return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
        return Math.random().toString(36).substring(2, 7);
    }
};

Page.addHook('beforeValidate', (page) => {
    page.urltitle = generateUrlTitle(page.title);
});

module.exports = {
    Page: Page,
    User: User
};
