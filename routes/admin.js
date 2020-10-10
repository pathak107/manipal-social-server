const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

const Place = require('../models/places')
const Event = require('../models/events');
const Exp = require('../models/experiences')
const Chat = require('../models/chats');
const UpcomingEvent = require('../models/upcomingEvents');
const User = require('../models/users')


AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
    rootPath: '/admin',
    resources: [
        {
            resource: Place,
            options: {
                properties: {
                    name: { isVisible: { list: true, filter: true, show: true, edit: true } },
                    type: {
                        isVisible: { list: true, filter: true, show: true, edit: true },
                        availableValues: [
                            { value: 'club', label: 'Club' },
                            { value: 'beach', label: 'Beach' },
                            { value: 'resturant', label: 'Resturant' },

                        ],
                    },
                    what: { isVisible: { list: false, filter: false, show: true, edit: true }, },
                    where: { isVisible: { list: false, filter: false, show: true, edit: true } },
                    specialInfo: { isVisible: { list: true, filter: true, show: true, edit: true } },
                    imageUrl: { isVisible: { list: false, filter: false, show: true, edit: true } },
                    coordinates: { isVisible: { list: false, filter: false, show: true, edit: true } },
                    _id: { isVisible: { list: false, filter: false, show: false, edit: false } },
                }
            }
        },
        {
            resource: Event,
            options: {
                properties: {
                    _id: { isVisible: { list: false, filter: false, show: false, edit: false } },
                }
            },
        },
        {
            resource: Exp,
            options: {
                actions: {
                    edit: { isAccessible: false },
                    new: { isAccessible: false },
                },
                properties: {
                    _id: { isVisible: { list: false, filter: false, show: false, edit: false } },
                }

            }
        },
        {
            resource: UpcomingEvent,
            options: {
                properties: {
                    _id: { isVisible: { list: false, filter: false, show: false, edit: false } },
                    imageUrl: { isVisible: { list: false, filter: false, show: true, edit: true } },
                    contacts: { isVisible: { list: false, filter: false, show: true, edit: true } },
                }
            }
        },
        {
            resource: Chat,
            options: {
                actions: {
                    edit: { isAccessible: false },
                    new: { isAccessible: false },
                },
                properties: {
                    _id: { isVisible: { list: false, filter: false, show: false, edit: false } },
                }

            }
        },
        {
            resource: User,
            options: {
                actions: {
                    edit: { isAccessible: false },
                    new: { isAccessible: false },
                },
                properties: {
                    _id: { isVisible: { list: false, filter: false, show: false, edit: false } },
                }

            }
        },
    ],
    branding: {
        logo: '/images/mainLogo.png',
        companyName: 'Manipal Social',
        softwareBrothers: false   // if Software Brothers logos should be shown in the sidebar footer
    },
})

// Build and use a router which will handle all AdminBro routes
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASS) {
            return true
        }
        else {
            return false
        }
    },
    cookiePassword: process.env.ADMIN_SESSION_SECRET,
    },
    null,
    {
        resave: true,
        saveUninitialized: true
    }
)

module.exports = adminRouter = router