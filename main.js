/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("config");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logQuery = exports.getLoggerOptions = void 0;
const tslib_1 = __webpack_require__(1);
const config_1 = (0, tslib_1.__importDefault)(__webpack_require__(6));
const winston_1 = (0, tslib_1.__importDefault)(__webpack_require__(8));
const getLoggerOptions = () => {
    const transports = [];
    if (config_1.default.get('env') !== 'production') {
        transports.push(new winston_1.default.transports.Console());
    }
    else {
        transports.push(new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.cli(), winston_1.default.format.splat(), winston_1.default.format.printf(({ level, message, context, timestamp, stack, trace }) => {
                return `${timestamp} [${context || 'no-context'}]\t ${level}: ${message} ${stack ? stack : ''} ${trace ? trace : ''}`;
            })),
        }));
    }
    return {
        level: config_1.default.get('logs.level'),
        levels: winston_1.default.config.npm.levels,
        format: winston_1.default.format.combine(winston_1.default.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.json()),
        transports: [
            ...transports,
            new winston_1.default.transports.File({
                dirname: 'logs',
                filename: 'error.log',
                level: 'error',
            }),
            new winston_1.default.transports.File({
                dirname: 'logs',
                filename: 'info.log',
                level: 'info',
            }),
        ],
    };
};
exports.getLoggerOptions = getLoggerOptions;
const loggerOptionQuery = (0, exports.getLoggerOptions)();
const LoggerQuery = winston_1.default.createLogger(Object.assign(Object.assign({}, loggerOptionQuery), { transports: [
        new winston_1.default.transports.File({
            dirname: 'logs',
            filename: 'query-info.log',
            level: 'info',
        }),
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.printf(({ message }) => {
                return message;
            })),
        }),
    ] }));
const logQuery = (msg) => {
    const message = msg.replace('Executing (default): ', '');
    LoggerQuery.info(message);
};
exports.logQuery = logQuery;


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("winston");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("nest-winston");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(12);
const schedule_1 = __webpack_require__(13);
const database_module_1 = __webpack_require__(14);
const auth_middleware_1 = __webpack_require__(31);
const totp_module_1 = __webpack_require__(34);
const withdraws_module_1 = __webpack_require__(38);
const admin_article_module_1 = __webpack_require__(45);
const public_article_module_1 = __webpack_require__(52);
const public_banner_module_1 = __webpack_require__(55);
const admin_banner_module_1 = __webpack_require__(58);
let AppModule = class AppModule {
    configure(consumer) {
        if (process.env.NODE_ENV === 'production') {
            consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('admin', 'private');
        }
    }
};
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            database_module_1.DatabaseModule,
            totp_module_1.TotpModule,
            withdraws_module_1.WithdrawsModule,
            admin_article_module_1.AdminArticleModule,
            public_article_module_1.PublicArticleModule,
            public_banner_module_1.PublicBannerModule,
            admin_banner_module_1.AdminBannerModule,
        ],
        controllers: [],
        providers: [common_1.Logger],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const database_providers_1 = __webpack_require__(15);
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = (0, tslib_1.__decorate)([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [...database_providers_1.databaseProviders],
        exports: [...database_providers_1.databaseProviders],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.databaseProviders = void 0;
const tslib_1 = __webpack_require__(1);
const cls_hooked_1 = (0, tslib_1.__importDefault)(__webpack_require__(16));
const config_1 = (0, tslib_1.__importDefault)(__webpack_require__(6));
const index_1 = __webpack_require__(17);
const logger_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(18);
const init_models_1 = __webpack_require__(19);
const announcement_1 = __webpack_require__(21);
const peatio_1 = __webpack_require__(26);
const namespace = cls_hooked_1.default.createNamespace('own-namespace');
sequelize_1.Sequelize.useCLS(namespace);
const isProd = config_1.default.get('env') !== 'production';
exports.databaseProviders = [
    {
        provide: index_1.SEQUELIZE_ANNOUNCEMENT,
        useFactory: async () => {
            const sequelizeOption = {
                logging: isProd ? false : logger_1.logQuery,
                database: index_1.SEQUELIZE_ANNOUNCEMENT.split('-')[1],
                username: config_1.default.get('database.user'),
                password: config_1.default.get('database.password'),
                host: config_1.default.get('database.host'),
                port: config_1.default.get('database.port') || 3306,
                dialect: config_1.default.get('database.dialect'),
            };
            const sequelize = new sequelize_1.Sequelize(sequelizeOption);
            const kycDb = (0, announcement_1.initModels)(sequelize);
            return Object.assign({ seq: sequelize }, kycDb);
        },
    },
    {
        provide: index_1.SEQUELIZE_PEATIO,
        useFactory: async () => {
            const sequelizeOption = {
                logging: isProd ? false : logger_1.logQuery,
                database: index_1.SEQUELIZE_PEATIO.split('-')[1],
                username: config_1.default.get('database.user'),
                password: config_1.default.get('database.password'),
                host: config_1.default.get('database.host'),
                port: config_1.default.get('database.port') || 3306,
                dialect: config_1.default.get('database.dialect'),
            };
            const sequelize = new sequelize_1.Sequelize(sequelizeOption);
            const peatioDb = (0, peatio_1.initModels)(sequelize);
            return Object.assign({ seq: sequelize }, peatioDb);
        },
    },
    {
        provide: index_1.SEQUELIZE_BARONG,
        useFactory: async () => {
            const sequelizeOption = {
                logging: isProd ? false : logger_1.logQuery,
                database: index_1.SEQUELIZE_BARONG.split('-')[1],
                username: config_1.default.get('database.user'),
                password: config_1.default.get('database.password'),
                host: config_1.default.get('database.host'),
                port: config_1.default.get('database.port') || 3306,
                dialect: config_1.default.get('database.dialect'),
            };
            const sequelize = new sequelize_1.Sequelize(sequelizeOption);
            const barongDb = (0, init_models_1.initModels)(sequelize);
            return Object.assign({ seq: sequelize }, barongDb);
        },
    },
];


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("cls-hooked");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_PAGE = exports.DEFAULT_LIMIT = exports.SEQUELIZE_ANNOUNCEMENT = exports.SEQUELIZE_BARONG = exports.SEQUELIZE_PEATIO = void 0;
exports.SEQUELIZE_PEATIO = 'SEQUELIZE-peatio_production';
exports.SEQUELIZE_BARONG = 'SEQUELIZE-barong_production';
exports.SEQUELIZE_ANNOUNCEMENT = 'SEQUELIZE-announcement_production';
exports.DEFAULT_LIMIT = 10;
exports.DEFAULT_PAGE = 0;


/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initModels = exports.Users = void 0;
const users_1 = __webpack_require__(20);
Object.defineProperty(exports, "Users", ({ enumerable: true, get: function () { return users_1.Users; } }));
function initModels(sequelize) {
    users_1.Users.initModel(sequelize);
    return {
        Users: users_1.Users,
    };
}
exports.initModels = initModels;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Users = void 0;
const sequelize_1 = __webpack_require__(18);
class Users extends sequelize_1.Model {
    static initModel(sequelize) {
        Users.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            uid: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                unique: 'index_users_on_uid',
            },
            username: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
                unique: 'index_users_on_username',
            },
            email: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                unique: 'index_users_on_email',
            },
            passwordDigest: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                field: 'password_digest',
            },
            role: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                defaultValue: 'member',
            },
            data: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            level: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            otp: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: 0,
            },
            state: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                defaultValue: 'pending',
            },
            referralId: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: true,
                field: 'referral_id',
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                field: 'created_at',
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                field: 'updated_at',
            },
        }, {
            sequelize,
            tableName: 'users',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'index_users_on_uid',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'uid' }],
                },
                {
                    name: 'index_users_on_email',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'email' }],
                },
                {
                    name: 'index_users_on_username',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'username' }],
                },
            ],
        });
        return Users;
    }
}
exports.Users = Users;


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
(0, tslib_1.__exportStar)(__webpack_require__(22), exports);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initModels = exports.categories = exports.articles = exports.announcements = void 0;
const announcements_1 = __webpack_require__(23);
Object.defineProperty(exports, "announcements", ({ enumerable: true, get: function () { return announcements_1.announcements; } }));
const articles_1 = __webpack_require__(24);
Object.defineProperty(exports, "articles", ({ enumerable: true, get: function () { return articles_1.articles; } }));
const categories_1 = __webpack_require__(25);
Object.defineProperty(exports, "categories", ({ enumerable: true, get: function () { return categories_1.categories; } }));
function initModels(sequelize) {
    announcements_1.announcements.initModel(sequelize);
    articles_1.articles.initModel(sequelize);
    categories_1.categories.initModel(sequelize);
    announcements_1.announcements.belongsTo(articles_1.articles, {
        as: 'article',
        foreignKey: 'article_id',
    });
    articles_1.articles.hasMany(announcements_1.announcements, {
        as: 'announcements',
        foreignKey: 'article_id',
    });
    announcements_1.announcements.belongsTo(categories_1.categories, {
        as: 'category',
        foreignKey: 'category_id',
    });
    categories_1.categories.hasMany(announcements_1.announcements, {
        as: 'announcements',
        foreignKey: 'category_id',
    });
    return {
        announcements: announcements_1.announcements,
        articles: articles_1.articles,
        categories: categories_1.categories,
    };
}
exports.initModels = initModels;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.announcements = void 0;
const sequelize_1 = __webpack_require__(18);
class announcements extends sequelize_1.Model {
    static initModel(sequelize) {
        announcements.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            category_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'categories',
                    key: 'id',
                },
            },
            article_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'articles',
                    key: 'id',
                },
            },
        }, {
            sequelize,
            tableName: 'announcements',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'fk_announcement_articles_idx',
                    using: 'BTREE',
                    fields: [{ name: 'article_id' }],
                },
                {
                    name: 'fk_category_idx',
                    using: 'BTREE',
                    fields: [{ name: 'category_id' }],
                },
            ],
        });
        return announcements;
    }
}
exports.announcements = announcements;


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.articles = void 0;
const tslib_1 = __webpack_require__(1);
const Sequelize = (0, tslib_1.__importStar)(__webpack_require__(18));
const sequelize_1 = __webpack_require__(18);
class articles extends sequelize_1.Model {
    static initModel(sequelize) {
        articles.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            headline: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            state: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            body: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            priority: {
                type: sequelize_1.DataTypes.SMALLINT,
                allowNull: false,
                unique: "priority_UNIQUE"
            },
            photo_url: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
            },
            tags: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
            },
            show_banner: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            published_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
        }, {
            sequelize,
            tableName: 'articles',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: "priority_UNIQUE",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "priority" },
                    ]
                },
            ],
        });
        return articles;
    }
}
exports.articles = articles;


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.categories = void 0;
const sequelize_1 = __webpack_require__(18);
class categories extends sequelize_1.Model {
    static initModel(sequelize) {
        categories.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING(45),
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'categories',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
            ],
        });
        return categories;
    }
}
exports.categories = categories;


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
(0, tslib_1.__exportStar)(__webpack_require__(27), exports);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initModels = exports.Members = exports.Currencies = exports.Accounts = void 0;
const accounts_1 = __webpack_require__(28);
Object.defineProperty(exports, "Accounts", ({ enumerable: true, get: function () { return accounts_1.Accounts; } }));
const currencies_1 = __webpack_require__(29);
Object.defineProperty(exports, "Currencies", ({ enumerable: true, get: function () { return currencies_1.Currencies; } }));
const members_1 = __webpack_require__(30);
Object.defineProperty(exports, "Members", ({ enumerable: true, get: function () { return members_1.Members; } }));
function initModels(sequelize) {
    accounts_1.Accounts.initModel(sequelize);
    currencies_1.Currencies.initModel(sequelize);
    members_1.Members.initModel(sequelize);
    return {
        Accounts: accounts_1.Accounts,
        Currencies: currencies_1.Currencies,
        Members: members_1.Members,
    };
}
exports.initModels = initModels;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Accounts = void 0;
const sequelize_1 = __webpack_require__(18);
class Accounts extends sequelize_1.Model {
    static initModel(sequelize) {
        Accounts.init({
            memberId: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                field: 'member_id',
            },
            currencyId: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: false,
                primaryKey: true,
                field: 'currency_id',
            },
            balance: {
                type: sequelize_1.DataTypes.DECIMAL(34, 18),
                allowNull: false,
                defaultValue: 0.0,
            },
            locked: {
                type: sequelize_1.DataTypes.DECIMAL(34, 18),
                allowNull: false,
                defaultValue: 0.0,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                field: 'created_at',
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                field: 'updated_at',
            },
        }, {
            sequelize,
            tableName: 'accounts',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'currency_id' }, { name: 'member_id' }],
                },
                {
                    name: 'index_accounts_on_currency_id_and_member_id',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'currency_id' }, { name: 'member_id' }],
                },
                {
                    name: 'index_accounts_on_member_id',
                    using: 'BTREE',
                    fields: [{ name: 'member_id' }],
                },
            ],
        });
        return Accounts;
    }
}
exports.Accounts = Accounts;


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Currencies = void 0;
const sequelize_1 = __webpack_require__(18);
class Currencies extends sequelize_1.Model {
    static initModel(sequelize) {
        Currencies.init({
            id: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            homepage: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
            },
            blockchainKey: {
                type: sequelize_1.DataTypes.STRING(32),
                allowNull: true,
                field: 'blockchain_key',
            },
            parentId: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
                field: 'parent_id',
            },
            type: {
                type: sequelize_1.DataTypes.STRING(30),
                allowNull: false,
                defaultValue: 'coin',
            },
            depositFee: {
                type: sequelize_1.DataTypes.DECIMAL(34, 18),
                allowNull: false,
                defaultValue: 0.0,
                field: 'deposit_fee',
            },
            minDepositAmount: {
                type: sequelize_1.DataTypes.DECIMAL(34, 18),
                allowNull: false,
                defaultValue: 0.0,
                field: 'min_deposit_amount',
            },
            minCollectionAmount: {
                type: sequelize_1.DataTypes.DECIMAL(34, 18),
                allowNull: false,
                defaultValue: 0.0,
                field: 'min_collection_amount',
            },
            withdrawFee: {
                type: sequelize_1.DataTypes.DECIMAL(34, 18),
                allowNull: false,
                defaultValue: 0.0,
                field: 'withdraw_fee',
            },
            minWithdrawAmount: {
                type: sequelize_1.DataTypes.DECIMAL(34, 18),
                allowNull: false,
                defaultValue: 0.0,
                field: 'min_withdraw_amount',
            },
            withdrawLimit24H: {
                type: sequelize_1.DataTypes.DECIMAL(34, 18),
                allowNull: false,
                defaultValue: 0.0,
                field: 'withdraw_limit_24h',
            },
            withdrawLimit72H: {
                type: sequelize_1.DataTypes.DECIMAL(34, 18),
                allowNull: false,
                defaultValue: 0.0,
                field: 'withdraw_limit_72h',
            },
            position: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            options: {
                type: sequelize_1.DataTypes.JSON,
                allowNull: true,
            },
            visible: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 1,
            },
            depositEnabled: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 1,
                field: 'deposit_enabled',
            },
            withdrawalEnabled: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: 1,
                field: 'withdrawal_enabled',
            },
            baseFactor: {
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                defaultValue: 1,
                field: 'base_factor',
            },
            precision: {
                type: sequelize_1.DataTypes.TINYINT,
                allowNull: false,
                defaultValue: 8,
            },
            iconUrl: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
                field: 'icon_url',
            },
            price: {
                type: sequelize_1.DataTypes.DECIMAL(32, 16),
                allowNull: false,
                defaultValue: 1.0,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                field: 'created_at',
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                field: 'updated_at',
            },
        }, {
            sequelize,
            tableName: 'currencies',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'index_currencies_on_visible',
                    using: 'BTREE',
                    fields: [{ name: 'visible' }],
                },
                {
                    name: 'index_currencies_on_position',
                    using: 'BTREE',
                    fields: [{ name: 'position' }],
                },
                {
                    name: 'index_currencies_on_parent_id',
                    using: 'BTREE',
                    fields: [{ name: 'parent_id' }],
                },
            ],
        });
        return Currencies;
    }
}
exports.Currencies = Currencies;


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Members = void 0;
const sequelize_1 = __webpack_require__(18);
class Members extends sequelize_1.Model {
    static initModel(sequelize) {
        Members.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
            },
            uid: {
                type: sequelize_1.DataTypes.STRING(32),
                allowNull: false,
                unique: 'index_members_on_uid',
            },
            email: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                unique: 'index_members_on_email',
            },
            level: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            role: {
                type: sequelize_1.DataTypes.STRING(16),
                allowNull: false,
            },
            group: {
                type: sequelize_1.DataTypes.STRING(32),
                allowNull: false,
                defaultValue: 'vip-0',
            },
            state: {
                type: sequelize_1.DataTypes.STRING(16),
                allowNull: false,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                field: 'created_at',
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                field: 'updated_at',
            },
            username: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
                unique: 'index_members_on_username',
            },
        }, {
            sequelize,
            tableName: 'members',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
                {
                    name: 'index_members_on_email',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'email' }],
                },
                {
                    name: 'index_members_on_uid',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'uid' }],
                },
                {
                    name: 'index_members_on_username',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'username' }],
                },
            ],
        });
        return Members;
    }
}
exports.Members = Members;


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthMiddleware = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const config_1 = (0, tslib_1.__importDefault)(__webpack_require__(6));
const express_unless_1 = (0, tslib_1.__importDefault)(__webpack_require__(32));
const jsonwebtoken_1 = (0, tslib_1.__importDefault)(__webpack_require__(33));
let AuthMiddleware = class AuthMiddleware {
    constructor() {
        this.sessionVerifier = function (options) {
            const barongJwtPublicKey = Buffer.from(config_1.default.get('barong.jwt_public_key').trim(), 'base64').toString('utf-8');
            if (!barongJwtPublicKey) {
                throw new Error('Barong JWT Public key should be set');
            }
            const verificationOptions = Object.assign({ algorithms: ['RS256'], issuer: 'barong' }, options);
            const middleware = function (req, res, next) {
                let authHeader;
                try {
                    authHeader = req.headers.authorization.split('Bearer ')[1];
                }
                catch (error) {
                    throw new common_1.UnauthorizedException('Signature verification raised: Authorization header is missing or malformed');
                }
                try {
                    req.session = jsonwebtoken_1.default.verify(authHeader, barongJwtPublicKey, verificationOptions);
                }
                catch (error) {
                    throw new common_1.ForbiddenException(`Signature verification raised: ${error}`);
                }
                next();
            };
            middleware.unless = express_unless_1.default;
            return middleware;
        };
        this.use = this.sessionVerifier();
    }
};
AuthMiddleware = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;


/***/ }),
/* 32 */
/***/ ((module) => {

module.exports = require("express-unless");

/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TotpModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const totp_controller_1 = __webpack_require__(35);
const totp_service_1 = __webpack_require__(36);
let TotpModule = class TotpModule {
};
TotpModule = (0, tslib_1.__decorate)([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [totp_service_1.TotpService],
        controllers: [totp_controller_1.TotpController],
        exports: [totp_service_1.TotpService],
    })
], TotpModule);
exports.TotpModule = TotpModule;


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TotpController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(10);
let TotpController = class TotpController {
};
TotpController = (0, tslib_1.__decorate)([
    (0, swagger_1.ApiTags)('Totp'),
    (0, common_1.Controller)('public/totp')
], TotpController);
exports.TotpController = TotpController;


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TotpService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const config_1 = (0, tslib_1.__importDefault)(__webpack_require__(6));
const node_vault_1 = (0, tslib_1.__importDefault)(__webpack_require__(37));
let TotpService = class TotpService {
    constructor() {
        this.vault = (0, node_vault_1.default)({
            endpoint: config_1.default.get('vault.address').trim(),
            token: config_1.default.get('vault.token').trim(),
        });
    }
    getTotp(uid) {
        return this.vault.read(`totp/code/${config_1.default.get('vault.app_name').trim()}_${uid}`);
    }
};
TotpService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [])
], TotpService);
exports.TotpService = TotpService;


/***/ }),
/* 37 */
/***/ ((module) => {

module.exports = require("node-vault");

/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WithdrawsModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const withdraws_service_1 = __webpack_require__(39);
const withdraws_controller_1 = __webpack_require__(40);
const otp_middleware_1 = __webpack_require__(41);
const _2fa_middleware_1 = __webpack_require__(43);
let WithdrawsModule = class WithdrawsModule {
    configure(consumer) {
        consumer
            .apply(_2fa_middleware_1.TwoFactorMiddleware, otp_middleware_1.OtpMiddleware)
            .forRoutes({ path: 'private/withdraws/*', method: common_1.RequestMethod.POST });
    }
};
WithdrawsModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        controllers: [withdraws_controller_1.WithdrawsController],
        providers: [withdraws_service_1.WithdrawsService],
    })
], WithdrawsModule);
exports.WithdrawsModule = WithdrawsModule;


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var WithdrawsService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WithdrawsService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const announcement_1 = __webpack_require__(21);
const peatio_1 = __webpack_require__(26);
const index_1 = __webpack_require__(17);
let WithdrawsService = WithdrawsService_1 = class WithdrawsService {
    constructor(mntDb, peatioDb) {
        this.mntDb = mntDb;
        this.peatioDb = peatioDb;
        this.logger = new common_1.Logger(WithdrawsService_1.name);
    }
};
WithdrawsService = WithdrawsService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, common_1.Inject)(index_1.SEQUELIZE_ANNOUNCEMENT)),
    (0, tslib_1.__param)(1, (0, common_1.Inject)(index_1.SEQUELIZE_PEATIO)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof announcement_1.AnnouncementDatabase !== "undefined" && announcement_1.AnnouncementDatabase) === "function" ? _a : Object, typeof (_b = typeof peatio_1.PeatioDatabase !== "undefined" && peatio_1.PeatioDatabase) === "function" ? _b : Object])
], WithdrawsService);
exports.WithdrawsService = WithdrawsService;


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WithdrawsController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const withdraws_service_1 = __webpack_require__(39);
const swagger_1 = __webpack_require__(10);
let WithdrawsController = class WithdrawsController {
    constructor(withdrawsService) {
        this.withdrawsService = withdrawsService;
    }
};
WithdrawsController = (0, tslib_1.__decorate)([
    (0, swagger_1.ApiTags)('Withdraw'),
    (0, common_1.Controller)('private/withdraws'),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof withdraws_service_1.WithdrawsService !== "undefined" && withdraws_service_1.WithdrawsService) === "function" ? _a : Object])
], WithdrawsController);
exports.WithdrawsController = WithdrawsController;


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OtpMiddleware = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const totp_service_1 = __webpack_require__(36);
const otp_1 = __webpack_require__(42);
let OtpMiddleware = class OtpMiddleware {
    constructor(totpService) {
        this.totpService = totpService;
    }
    async use(req, _res, next) {
        var _a;
        const otp = req.query.otp;
        if (!otp) {
            throw new common_1.BadRequestException('OTP code is missing');
        }
        if (!(0, otp_1.isOtpGoogleAuth)(otp)) {
            throw new common_1.UnprocessableEntityException('OTP code is invalid');
        }
        const totp = await this.totpService.getTotp(req.session.uid);
        if (!totp || ((_a = totp === null || totp === void 0 ? void 0 : totp.data) === null || _a === void 0 ? void 0 : _a.code) !== otp) {
            throw new common_1.UnprocessableEntityException('OTP code is invalid');
        }
        next();
    }
};
OtpMiddleware = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof totp_service_1.TotpService !== "undefined" && totp_service_1.TotpService) === "function" ? _a : Object])
], OtpMiddleware);
exports.OtpMiddleware = OtpMiddleware;


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isOtpGoogleAuth = void 0;
const isOtpGoogleAuth = (otp) => {
    return /[0-9]{6,6}/.test(otp);
};
exports.isOtpGoogleAuth = isOtpGoogleAuth;


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TwoFactorMiddleware = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const index_1 = __webpack_require__(17);
const barong_1 = __webpack_require__(44);
let TwoFactorMiddleware = class TwoFactorMiddleware {
    constructor(barongDb) {
        this.barongDb = barongDb;
    }
    async use(req, _res, next) {
        const users = await this.barongDb.Users.findOne({
            where: {
                uid: req.session.uid,
            },
        });
        if (!users.otp) {
            throw new common_1.UnprocessableEntityException('Account has not enabled 2FA');
        }
        next();
    }
};
TwoFactorMiddleware = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, common_1.Inject)(index_1.SEQUELIZE_BARONG)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof barong_1.BarongDatabase !== "undefined" && barong_1.BarongDatabase) === "function" ? _a : Object])
], TwoFactorMiddleware);
exports.TwoFactorMiddleware = TwoFactorMiddleware;


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
(0, tslib_1.__exportStar)(__webpack_require__(19), exports);


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminArticleModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const admin_article_service_1 = __webpack_require__(46);
const admin_article_controller_1 = __webpack_require__(47);
const admin_middleware_1 = __webpack_require__(51);
let AdminArticleModule = class AdminArticleModule {
    configure(consumer) {
        if (process.env.NODE_ENV !== 'production') {
            consumer
                .apply(admin_middleware_1.AdminMiddleware)
                .forRoutes({ path: 'admin/article/*', method: common_1.RequestMethod.DELETE }, { path: 'admin/article/*', method: common_1.RequestMethod.GET }, { path: 'admin/article/*', method: common_1.RequestMethod.PATCH }, { path: 'admin/article/*', method: common_1.RequestMethod.POST });
        }
    }
};
AdminArticleModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        controllers: [admin_article_controller_1.AdminArticleController],
        providers: [admin_article_service_1.AdminArticleService],
    })
], AdminArticleModule);
exports.AdminArticleModule = AdminArticleModule;


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminArticleService = void 0;
const tslib_1 = __webpack_require__(1);
const constants_1 = __webpack_require__(17);
const common_1 = __webpack_require__(4);
const announcement_1 = __webpack_require__(21);
let AdminArticleService = class AdminArticleService {
    constructor(announcementDb) {
        this.announcementDb = announcementDb;
    }
    create(createAdminArticleDto) {
        const { headline, description, state, body, priority, photo_url, tags } = createAdminArticleDto;
        return this.announcementDb.articles.create({
            headline: headline,
            description: description,
            state: state,
            body: body,
            priority: priority,
            photo_url: photo_url,
            tags: tags,
            show_banner: false,
            created_at: new Date(),
            updated_at: new Date(),
            published_at: new Date(),
        });
    }
    findAll() {
        return this.announcementDb.articles.findAll({
            attributes: ['id', 'headline', 'state', 'created_at', 'photo_url'],
        });
    }
    findOne(id) {
        return this.announcementDb.articles.findOne({ where: { id: id } });
    }
    update(id, updateAdminArticleDto) {
        const { state, headline, body, description, photo_url } = updateAdminArticleDto;
        return this.announcementDb.articles.update({
            state: Boolean(state),
            headline: headline,
            body: body,
            description: description,
            photo_url: photo_url,
        }, { where: { id: id } });
    }
    remove(id) {
        return this.announcementDb.articles.destroy({ where: { id: id } });
    }
};
AdminArticleService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, common_1.Inject)(constants_1.SEQUELIZE_ANNOUNCEMENT)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof announcement_1.AnnouncementDatabase !== "undefined" && announcement_1.AnnouncementDatabase) === "function" ? _a : Object])
], AdminArticleService);
exports.AdminArticleService = AdminArticleService;


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminArticleController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(10);
const admin_article_service_1 = __webpack_require__(46);
const create_admin_article_dto_1 = __webpack_require__(48);
const update_admin_article_dto_1 = __webpack_require__(50);
let AdminArticleController = class AdminArticleController {
    constructor(adminArticleService) {
        this.adminArticleService = adminArticleService;
    }
    async create(createAdminArticleDto) {
        return this.adminArticleService.create(createAdminArticleDto);
    }
    async findAll() {
        let result;
        const list = await this.adminArticleService.findAll();
        result = {
            msg: 'get_article_list_successfully',
            announcement_list: list,
        };
        return result;
    }
    async findOne(id) {
        let result;
        const article = await this.adminArticleService.findOne(id);
        result = {
            msg: 'get_article_by_id_successfully',
            announcement: article,
        };
        return result;
    }
    async update(id, updateAdminArticleDto) {
        return this.adminArticleService.update(+id, updateAdminArticleDto);
    }
    async remove(id) {
        return this.adminArticleService.remove(+id);
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)('create'),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof create_admin_article_dto_1.CreateAdminArticleDto !== "undefined" && create_admin_article_dto_1.CreateAdminArticleDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AdminArticleController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)('list'),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AdminArticleController.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)('find/:id'),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AdminArticleController.prototype, "findOne", null);
(0, tslib_1.__decorate)([
    (0, common_1.Patch)(':id'),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__param)(1, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, typeof (_b = typeof update_admin_article_dto_1.UpdateAdminArticleDto !== "undefined" && update_admin_article_dto_1.UpdateAdminArticleDto) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AdminArticleController.prototype, "update", null);
(0, tslib_1.__decorate)([
    (0, common_1.Delete)(':id'),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AdminArticleController.prototype, "remove", null);
AdminArticleController = (0, tslib_1.__decorate)([
    (0, swagger_1.ApiTags)('Article'),
    (0, common_1.Controller)('admin/article'),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof admin_article_service_1.AdminArticleService !== "undefined" && admin_article_service_1.AdminArticleService) === "function" ? _c : Object])
], AdminArticleController);
exports.AdminArticleController = AdminArticleController;


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAdminArticleDto = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(10);
const class_validator_1 = __webpack_require__(49);
class CreateAdminArticleDto {
}
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: 'In Arizona, ground zero for 2024, Trump spins lies and conspiracy theories',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateAdminArticleDto.prototype, "headline", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({
        example: 'If his favored candidates fare well, the former president stands to tighten his stranglehold on the GOP and boost his chances of a comeback.',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], CreateAdminArticleDto.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], CreateAdminArticleDto.prototype, "state", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({
        example: `<div class="article-body layout-grid-item layout-grid-item--with-gutter-s-only grid-col-10-m grid-col-push-1-m grid-col-6-xl grid-col-push-2-xl article-body--custom-column" data-test="articleBody"><section class="mb7"><div class="article-body__date-source"><time class="relative z-1" datetime="Mon Jan 17 2022 14:45:00 GMT+0000 (UTC)" data-test="timestamp__datePublished" itemprop="datePublished" content="2022-01-17T14:45:00.000Z">Jan. 17, 2022, 9:45 PM +07</time><meta data-test="timestamp__datePublished--meta" itemprop="datePublished" content="2022-01-17T14:45:00.000Z"></div><div class="article-inline-byline" data-test="article-byline-inline">By<!-- --> <span class="byline-name" data-test="byline-name"><a href="https://www.nbcnews.com/author/jonathan-allen-ncpn802641">Jonathan Allen</a></span></div></section><div class="article-body__content"><p class="">FLORENCE, Ariz. — In this tiny <a href="https://www.fox10phoenix.com/news/arizona-to-close-florence-prison-transferring-thousands-of-inmates-to-eloy" target="_blank">prison town</a> between Phoenix and Tucson, former President <a href="https://www.nbcnews.com/politics/donald-trump" target="_blank">Donald Trump</a> riled up his base Saturday night with a raft of lies, tinfoil-hat conspiracy theories and absurd equivalencies.</p><p class="">But while frayed threads of fiction are nothing new to Trump, his open-air rally here was exotic and portentous even by his standards, a tacit acknowledgment of how much this year's midterm elections mean for his chances to <a href="https://www.nbcnews.com/politics/donald-trump/trump-looks-he-ll-run-reclaim-presidency-2024-n1283430" target="_blank">reclaim the Oval Office</a>.</p><div class="ad ad--text-alignment ad-container boxinlineAd dn-print" data-test="ad__container"><div data-mps="true" data-slot="boxinline" data-sizes="[[[1000,1],[]],[[758,1],[[300,250],[700,50],[5,5],[728,90],[360,360]]],[[0,0],[[300,250],[700,50],[5,5],[360,360]]]]" data-render-on-view="true" data-targeting="{}" data-active-tab="true" data-offset-viewport="100"></div></div><div id="taboolaReadMoreBelow"></div><p class="">Having endorsed <a href="https://www.nbcnews.com/politics/donald-trump/inside-trump-s-secretive-endorsement-operation-n1287383" target="_blank">more than 90 candidates</a> across the country, including Republicans in high-profile races here, he is trying to stock ballots with acolytes. If his favored candidates fare well, he will tighten his stranglehold on the GOP and improve his chances of winning in 2024.</p><p class="">Arizona is ground zero for both missions.</p><p class="">"This is maybe the most important election we've ever had, but I do believe 2024 will be even more important," Trump told several thousand supporters at a music venue. "This is the year we are going to take back the House, we are going to take back the Senate and we are going to take back America. And in 2024, we are going to take back the White House."</p><section class="inline-video inline-video--in-body"><div class="inline-video__background"><div class="inline-video__player"><div class="videoPlayer styles_videoPlayer__y-Smj styles_adNotPlaying__ullC6" data-test="video-player"><div class="videoSlate"><a href="https://www.nbcnews.com/nightly-news/video/trump-set-for-first-rally-of-2022-130915909665" class="allowClicksOnPreview"><picture class=""><source media="(min-width: 1240px)" srcset="https://media-cldnry.s-nbcnews.com/image/upload/t_focal-860x484,f_auto,q_auto:best/mpx/2704722219/2022_01/1642205204116_nn_hja_trump_seeks_former_spot_in_spotlight_220114_1920x1080-vcqjbu.jpg"><source media="(min-width: 758px)" srcset="https://media-cldnry.s-nbcnews.com/image/upload/t_focal-1000x563,f_auto,q_auto:best/mpx/2704722219/2022_01/1642205204116_nn_hja_trump_seeks_former_spot_in_spotlight_220114_1920x1080-vcqjbu.jpg"><img src="https://media-cldnry.s-nbcnews.com/image/upload/t_focal-760x428,f_auto,q_auto:best/mpx/2704722219/2022_01/1642205204116_nn_hja_trump_seeks_former_spot_in_spotlight_220114_1920x1080-vcqjbu.jpg" height="1080" width="1920" pinger-seen="true"></picture></a><div class="playButtonOuter absolute absolute-fill w100 dn-print" data-test="video-player__play-button__outer"><div class="absolute absolute-fill w100 df items-center items-center-m justify-center justify-center-m"><div class="play inline-video__play-button"><svg class="play--icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" preserveAspectRatio="xMidYMid" style="max-width:30px"><path d="M0 0v15l15-7.41z" fill-rule="evenodd"></path></svg></div></div></div></div><div id="130915909665"><div id="130915909665_ndp_1642478669016" class="ndp-video"><div id="ndp_video_player_1642478669010" class="ndp-video-player"></div></div></div></div></div></div><div class="inline-video__info"><h2 class="inline-video__title"><a href="https://www.nbcnews.com/nightly-news/video/trump-set-for-first-rally-of-2022-130915909665">Trump set for first rally of 2022</a></h2><span class="inline-video__detail"><span>Jan. 15, 2022</span><span>01:59</span></span><div class="styles_share__lWmWn inline-video__share dn-print" data-test="social-share-inline"><div class="styles_shareExpander__3VTus inline-video__share-expander styles_hoverEffect__6oPv2"><span class="styles_shareDot__clkmL inline-video__share-dot"></span><svg class="styles_shareClose__1m6pq inline-video__share-close" viewBox="0 0 15 15"><line class="styles_shareLine__3CjYr" x1="0" x2="15" y1="0" y2="15"></line><line class="styles_shareLine__3CjYr" x1="0" x2="15" y1="15" y2="0"></line></svg></div><div class="styles_shareList__2sNgi inline-video__share-list"><a href="https://www.facebook.com/sharer/sharer.php?u=https://www.nbcnews.com/nightly-news/video/trump-set-for-first-rally-of-2022-130915909665" class="styles_shareLink__1H8Gx" target="_blank" rel="noopen noreferrer"><span class="icon icon-facebook styles_shareIcon__lzjAB inline-video__share-icon"></span></a><a href="https://twitter.com/intent/tweet?text=Trump set for first rally of 2022&amp;via=nbcnews&amp;url=https://www.nbcnews.com/nightly-news/video/trump-set-for-first-rally-of-2022-130915909665&amp;original_referer=https://www.nbcnews.com/nightly-news/video/trump-set-for-first-rally-of-2022-130915909665" class="styles_shareLink__1H8Gx" target="_blank" rel="noopen noreferrer"><span class="icon icon-twitter styles_shareIcon__lzjAB inline-video__share-icon"></span></a><a href="mailto:?subject=Trump set for first rally of 2022&amp;body=https://www.nbcnews.com/nightly-news/video/trump-set-for-first-rally-of-2022-130915909665" class="styles_shareLink__1H8Gx" target="_blank" rel="noopen noreferrer"><span class="icon icon-email styles_shareIcon__lzjAB inline-video__share-icon"></span></a></div></div></div></section><p class="">Arizona is the state he lost by the narrowest margin in 2020, less than 10,500 votes. And his undercard Saturday night featured a blizzard of Trump-styled radicals — all of them election deniers — who hope to purge establishment figures from the party and take control of state and federal elections.</p><div class="ad ad--text-alignment ad-container boxinlineAd dn-print" data-test="ad__container"><div data-mps="true" data-slot="boxinline" data-sizes="[[[1000,1],[]],[[758,1],[[300,250],[700,50],[5,5],[728,90],[360,360]]],[[0,0],[[300,250],[700,50],[5,5],[360,360]]]]" data-render-on-view="true" data-targeting="{}" data-active-tab="true" data-offset-viewport="100"></div></div><p class="">They included three House members — Paul Gosar, Andy Biggs and Debbie Lesko — who voted against certifying President Joe Biden's 2020 election victory; Mark Finchem, a candidate for secretary of state who has <a href="https://www.azmirror.com/blog/gop-secretary-of-state-candidate-mark-finchem-will-appear-on-qanon-talk-show/" target="_blank">associated himself with QAnon</a>; and Kari Lake, a candidate for governor who said Saturday that she wants to imprison state officials who conducted the 2020 election.</p><p class="">Gosar, who <a href="https://www.politico.com/news/2021/12/18/stop-the-steal-founder-jan-6-committee-gop-lawmakers-525345" target="_blank">was in contact</a> with the organizers of the Jan. 6 "Stop the Steal" rally, called himself "the most dangerous man" in Congress in a warmup speech.</p><p class="">As if to ensure that he couldn't be out-Trumped at his own rally, the former president questioned whether the FBI helped stage the Jan. 6 attack on the U.S. Capitol — a favorite fabrication of Fox News host Tucker Carlson — and suggested an upside-down equivalency between a Capitol Police officer and the rioter he shot.</p><p class="">"Exactly how many of those present at the Capitol complex on Jan. 6 were FBI confidential informants, agents or otherwise working directly or indirectly with an agency of the United States government?" Trump asked.</p><div class="ad ad--text-alignment ad-container boxinlineAd dn-print" data-test="ad__container"><div data-mps="true" data-slot="boxinline" data-sizes="[[[1000,1],[]],[[758,1],[[300,250],[700,50],[5,5],[728,90],[360,360]]],[[0,0],[[300,250],[700,50],[5,5],[360,360]]]]" data-render-on-view="true" data-targeting="{}" data-active-tab="true" data-offset-viewport="100"></div></div><p class="">Only minutes earlier, he said Lt. Michael Byrd shot Ashli Babbitt, who was trying to enter the House speaker's lobby through a broken window, "for no reason."</p><div class="recommended-intersection-ref"></div><p class="">"Let's see how he could do without the protections that he got," Trump said. "If that happened the other way around, they'll be calling 'Let's bring back the electric chair.' ... He's a disgrace the way he shot Ashli."</p><p class="">The combination put Trump firmly on Babbitt's side but against an attack that <a href="https://www.nbcnews.com/politics/congress/blog/2021-01-13-trump-impeachment-25th-amendment-n1253971" target="_blank">he incited</a> and she participated in. The crowd didn't seem to care much about the logic. Trump was cheered intermittently between chants of "Let's Go Brandon," "F--- Joe Biden" and "Lock him up!" — the latter a reference to Dr. Anthony Fauci, the director of the National Institute of Allergy and Infectious Diseases.</p><div class="recommended-intersection-ref"><section class="related dn-print" data-test="related"><h3 class="related__title">Recommended</h3><div id="recommended" class="related__items"><div class="related-item"><div class="related-item__thumbnail-wrapper"><a href="https://www.nbcnews.com/politics/donald-trump/trump-s-advisers-point-finger-mcconnell-reports-desantis-feud-swirl-n1287618?icid=recommended" class="related-item__link related-item__picture-link"><div class="lazyload-wrapper"><div class="lazyload-placeholder" style="height: 50px;"></div></div></a><span class="related-item__eyebrow"><a class="related-item__label" href="https://www.nbcnews.com/politics/donald-trump"><span>Donald Trump</span></a><a href="https://www.nbcnews.com/politics/donald-trump/trump-s-advisers-point-finger-mcconnell-reports-desantis-feud-swirl-n1287618?icid=recommended"></a></span></div><div class="related-item__info-wrapper"><h3 class="related-item__title"><a class="" href="https://www.nbcnews.com/politics/donald-trump"><span class="related-item__eyebrow">Donald Trump</span></a><a href="https://www.nbcnews.com/politics/donald-trump/trump-s-advisers-point-finger-mcconnell-reports-desantis-feud-swirl-n1287618?icid=recommended" class="related-item__link">Trump's advisers point the finger at McConnell as reports of feud with DeSantis swirl</a></h3></div></div><div class="related-item"><div class="related-item__thumbnail-wrapper"><a href="https://www.nbcnews.com/health/health-news/costs-masks-rapid-tests-furthers-pandemic-response-haves-nots-rcna12300?icid=recommended" class="related-item__link related-item__picture-link"><div class="lazyload-wrapper"><div class="lazyload-placeholder" style="height: 50px;"></div></div></a><span class="related-item__eyebrow"><a class="related-item__label" href="https://www.nbcnews.com/health/coronavirus"><span>Coronavirus</span></a><a href="https://www.nbcnews.com/health/health-news/costs-masks-rapid-tests-furthers-pandemic-response-haves-nots-rcna12300?icid=recommended"></a></span></div><div class="related-item__info-wrapper"><h3 class="related-item__title"><a class="" href="https://www.nbcnews.com/health/coronavirus"><span class="related-item__eyebrow">Coronavirus</span></a><a href="https://www.nbcnews.com/health/health-news/costs-masks-rapid-tests-furthers-pandemic-response-haves-nots-rcna12300?icid=recommended" class="related-item__link">Cost of masks and tests deepens a pandemic wedge between the haves and the have-nots</a></h3></div></div></div></section></div><p class="">Mike McNulty, 66, a teacher from Phoenix, tore into Fauci in an interview before Trump spoke, comparing him to the Nazi "Angel of Death," Josef Mengele, who performed inhumane and fatal experiments on prisoners at the Auschwitz concentration camp.</p><div class="ad ad--text-alignment ad-container boxinlineAd dn-print" data-test="ad__container"><div data-mps="true" data-slot="boxinline" data-sizes="[[[1000,1],[]],[[758,1],[[300,250],[700,50],[5,5],[728,90],[360,360]]],[[0,0],[[300,250],[700,50],[5,5],[360,360]]]]" data-render-on-view="true" data-targeting="{}" data-active-tab="true" data-offset-viewport="100"></div></div><p class="">"Fauci's worse than Mengele," McNulty said, adding that Trump is "probably a walking dead man" because he has been vaccinated. Still, McNulty said he'll back Trump if he survives the vaccine.</p><p class="">Many of Trump's supporters began leaving before he stopped lying. But that had more to do with the concern about thousands of people departing at the same time down a long two-lane feeder road than a lack of enthusiasm for him.</p><p class="">Rosetta Murphy, 60, traveled from Albany, Oregon, more than 1,000 miles away, to see Trump. Like the speakers Saturday night, she said Trump was robbed in 2020.</p><p class="">"It was stolen, definitely stolen," she said. "Everybody loves Trump."</p><div class="ad ad--text-alignment ad-container boxinlineAd dn-print" data-test="ad__container"><div data-mps="true" data-slot="boxinline" data-sizes="[[[1000,1],[]],[[758,1],[[300,250],[700,50],[5,5],[728,90],[360,360]]],[[0,0],[[300,250],[700,50],[5,5],[360,360]]]]" data-render-on-view="true" data-targeting="{}" data-active-tab="true" data-offset-viewport="100"></div></div><p class="">Bertha Lopez, 61, of Florence, didn't have to go very far to attend the rally. But she was no less excited about Trump and his prospects for 2024. She said there's no one else in the GOP she's interested in seeing run.</p><p class="">"Hell no — just him," Lopez said. "I'm not a traitor. I'm here for Trump."</p><p class="">So was MyPillow founder Mike Lindell, a close Trump friend who has been peddling false claims that voting machines were rigged. Dominion, a company that makes voting machines, has filed a $1.3 billion defamation suit against him.</p><p class="">At the same time, Lindell is suing to block the House committee investigating the Jan. 6 attack from obtaining his phone records. Asked whether he had had any discussions with the panel, Lindell quickly pivoted.</p><div class="ad ad--text-alignment ad-container boxinlineAd dn-print" data-test="ad__container"><div data-mps="true" data-slot="boxinline" data-sizes="[[[1000,1],[]],[[758,1],[[300,250],[700,50],[5,5],[728,90],[360,360]]],[[0,0],[[300,250],[700,50],[5,5],[360,360]]]]" data-render-on-view="true" data-targeting="{}" data-active-tab="true" data-offset-viewport="100"></div></div><p class="endmark">"I think you should be more worried about things in our country that matter, like the next election and getting rid of the machines, Dominion," he said.</p><div><div class="nl-signup-inline"><p class="nl-signup-inline__title">Get the Morning Rundown</p><p class="nl-signup-inline__description">Get a head start on the morning's top stories.</p><div class="nl-signup-input"><div class="nl-signup-input__input-wrapper"><form class="nl-signup-input__form"><input class="nl-signup-input__input" name="emailAddress" placeholder="Enter your email" value=""><button class="animated-ghost-button animated-ghost-button--normal nl-signup-input__button" id="email-subscribe-button" type="button">Sign Up</button></form></div><footer class="nl-signup-input__footer">This site is protected by recaptcha&nbsp;<span class="nl-signup-input__recaptcha-links"><a class="nl-signup-input__recaptcha-link" href="https://www.nbcuniversal.com/privacy" rel="noopener noreferrer" target="_blank">Privacy Policy</a>&nbsp;|&nbsp;<a class="nl-signup-input__recaptcha-link" href="https://www.nbcuniversal.com/terms" rel="noopener noreferrer" target="_blank">Terms of Service</a></span></footer><div></div></div></div></div></div><div class="expanded-byline-contributors articleBylineContainer mt8"><div class="expanded-byline article-expanded-byline"><div class="expanded-byline__inner mt0-m mt2"><div class="byline-thumbnail byline-thumbnail--has-image expanded-byline__thumbnail mr4 w3-print" data-test="byline-thumbnail"><a href="https://www.nbcnews.com/author/jonathan-allen-ncpn802641"><div class="lazyload-wrapper"><div style="height:50px" class="lazyload-placeholder"></div></div></a></div><span class="byline-name expanded-byline__name ml9 ml0-m ml0-print pt1 pt4-m" data-test="byline-name"><a href="https://www.nbcnews.com/author/jonathan-allen-ncpn802641">Jonathan Allen</a></span><span class="byline-social expanded-byline__social f2 mt2 mt4-m ml9 ml0-m dn-print" data-test="byline-social"><a href="https://twitter.com/jonallendc" target="_blank" rel="noopener noreferrer" data-test="byline-social--link" class="byline-social--link"><span class="icon icon-twitter"></span></a><a href="mailto:jon.allen@nbcuni.com" target="_blank" rel="noopener noreferrer" data-test="byline-social--link" class="byline-social--link"><span class="icon icon-email"></span></a></span></div><p class="byline-bio expanded-byline__bio mt3 mt0-m ml9-m" data-test="byline-bio">Jonathan Allen is a&nbsp;senior national politics reporter for NBC News, based in Washington.</p></div></div></div>`,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateAdminArticleDto.prototype, "body", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CreateAdminArticleDto.prototype, "priority", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({
        example: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2022_03/3530041/220117-arizona-donald-trump-profile-rally-ac-1139a.jpg',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], CreateAdminArticleDto.prototype, "photo_url", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({ example: null }),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", String)
], CreateAdminArticleDto.prototype, "tags", void 0);
exports.CreateAdminArticleDto = CreateAdminArticleDto;


/***/ }),
/* 49 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAdminArticleDto = void 0;
const swagger_1 = __webpack_require__(10);
const create_admin_article_dto_1 = __webpack_require__(48);
class UpdateAdminArticleDto extends (0, swagger_1.PartialType)(create_admin_article_dto_1.CreateAdminArticleDto) {
}
exports.UpdateAdminArticleDto = UpdateAdminArticleDto;


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminMiddleware = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const index_1 = __webpack_require__(17);
const barong_1 = __webpack_require__(44);
let AdminMiddleware = class AdminMiddleware {
    constructor(barongDb) {
        this.barongDb = barongDb;
    }
    async use(req, _res, next) {
        const user = await this.barongDb.Users.findOne({
            where: {
                uid: req.session.uid,
            },
        });
        if (user.role !== 'superadmin') {
            throw new common_1.UnprocessableEntityException('Account is not admin');
        }
        next();
    }
};
AdminMiddleware = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, common_1.Inject)(index_1.SEQUELIZE_BARONG)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof barong_1.BarongDatabase !== "undefined" && barong_1.BarongDatabase) === "function" ? _a : Object])
], AdminMiddleware);
exports.AdminMiddleware = AdminMiddleware;


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicArticleModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const public_article_service_1 = __webpack_require__(53);
const public_article_controller_1 = __webpack_require__(54);
let PublicArticleModule = class PublicArticleModule {
};
PublicArticleModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        controllers: [public_article_controller_1.PublicArticleController],
        providers: [public_article_service_1.PublicArticleService]
    })
], PublicArticleModule);
exports.PublicArticleModule = PublicArticleModule;


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicArticleService = void 0;
const tslib_1 = __webpack_require__(1);
const index_1 = __webpack_require__(17);
const common_1 = __webpack_require__(4);
const announcement_1 = __webpack_require__(21);
let PublicArticleService = class PublicArticleService {
    constructor(announcementDb) {
        this.announcementDb = announcementDb;
    }
    async findAll() {
        return this.announcementDb.articles.findAll({
            where: { state: 1 },
            order: [['created_at', 'DESC']],
        });
    }
    async findOne(id) {
        return await this.announcementDb.articles.findOne({
            where: { id: id, state: 1 },
        });
    }
};
PublicArticleService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, common_1.Inject)(index_1.SEQUELIZE_ANNOUNCEMENT)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof announcement_1.AnnouncementDatabase !== "undefined" && announcement_1.AnnouncementDatabase) === "function" ? _a : Object])
], PublicArticleService);
exports.PublicArticleService = PublicArticleService;


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicArticleController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(10);
const public_article_service_1 = __webpack_require__(53);
let PublicArticleController = class PublicArticleController {
    constructor(publicArticleService) {
        this.publicArticleService = publicArticleService;
    }
    findAll() {
        return this.publicArticleService.findAll();
    }
    findOne(id) {
        return this.publicArticleService.findOne(+id);
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)('list'),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], PublicArticleController.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':id'),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], PublicArticleController.prototype, "findOne", null);
PublicArticleController = (0, tslib_1.__decorate)([
    (0, swagger_1.ApiTags)('Public Article'),
    (0, common_1.Controller)('public/article'),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof public_article_service_1.PublicArticleService !== "undefined" && public_article_service_1.PublicArticleService) === "function" ? _a : Object])
], PublicArticleController);
exports.PublicArticleController = PublicArticleController;


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicBannerModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const public_banner_service_1 = __webpack_require__(56);
const public_banner_controller_1 = __webpack_require__(57);
let PublicBannerModule = class PublicBannerModule {
};
PublicBannerModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        controllers: [public_banner_controller_1.PublicBannerController],
        providers: [public_banner_service_1.PublicBannerService]
    })
], PublicBannerModule);
exports.PublicBannerModule = PublicBannerModule;


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicBannerService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const index_1 = __webpack_require__(17);
const announcement_1 = __webpack_require__(21);
let PublicBannerService = class PublicBannerService {
    constructor(announcementDb) {
        this.announcementDb = announcementDb;
    }
    findAll() {
        return this.announcementDb.articles.findAll({
            where: { state: 1, show_banner: 1 },
            order: [['created_at', 'DESC']],
        });
    }
    findOne(id) {
        return `This action returns a #${id} publicBanner`;
    }
};
PublicBannerService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, common_1.Inject)(index_1.SEQUELIZE_ANNOUNCEMENT)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof announcement_1.AnnouncementDatabase !== "undefined" && announcement_1.AnnouncementDatabase) === "function" ? _a : Object])
], PublicBannerService);
exports.PublicBannerService = PublicBannerService;


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicBannerController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(10);
const public_banner_service_1 = __webpack_require__(56);
let PublicBannerController = class PublicBannerController {
    constructor(publicBannerService) {
        this.publicBannerService = publicBannerService;
    }
    findAll() {
        return this.publicBannerService.findAll();
    }
    findOne(id) {
        return this.publicBannerService.findOne(+id);
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)('list'),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], PublicBannerController.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':id'),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], PublicBannerController.prototype, "findOne", null);
PublicBannerController = (0, tslib_1.__decorate)([
    (0, swagger_1.ApiTags)('Banner'),
    (0, common_1.Controller)('public/banner'),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof public_banner_service_1.PublicBannerService !== "undefined" && public_banner_service_1.PublicBannerService) === "function" ? _a : Object])
], PublicBannerController);
exports.PublicBannerController = PublicBannerController;


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminBannerModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const admin_banner_service_1 = __webpack_require__(59);
const admin_banner_controller_1 = __webpack_require__(60);
const admin_middleware_1 = __webpack_require__(51);
let AdminBannerModule = class AdminBannerModule {
    configure(consumer) {
        if (process.env.NODE_ENV !== 'production') {
            consumer
                .apply(admin_middleware_1.AdminMiddleware)
                .forRoutes({ path: 'admin/banner/*', method: common_1.RequestMethod.DELETE }, { path: 'admin/banner/*', method: common_1.RequestMethod.GET }, { path: 'admin/banner/*', method: common_1.RequestMethod.PATCH }, { path: 'admin/banner/*', method: common_1.RequestMethod.POST });
        }
    }
};
AdminBannerModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        controllers: [admin_banner_controller_1.AdminBannerController],
        providers: [admin_banner_service_1.AdminBannerService]
    })
], AdminBannerModule);
exports.AdminBannerModule = AdminBannerModule;


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminBannerService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const index_1 = __webpack_require__(17);
const announcement_1 = __webpack_require__(21);
let AdminBannerService = class AdminBannerService {
    constructor(announcementDb) {
        this.announcementDb = announcementDb;
    }
    async findAll() {
        const banners = await this.announcementDb.articles.findAll({
            attributes: ['id', 'headline', 'photo_url', 'show_banner', 'created_at'],
            order: [['created_at', 'DESC']],
        });
        return {
            list: banners,
        };
    }
    updateShowBanner(id, show) {
        return this.announcementDb.articles.update({ show_banner: show }, { where: { id: id } });
    }
};
AdminBannerService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, common_1.Inject)(index_1.SEQUELIZE_ANNOUNCEMENT)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof announcement_1.AnnouncementDatabase !== "undefined" && announcement_1.AnnouncementDatabase) === "function" ? _a : Object])
], AdminBannerService);
exports.AdminBannerService = AdminBannerService;


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminBannerController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(10);
const admin_banner_service_1 = __webpack_require__(59);
let AdminBannerController = class AdminBannerController {
    constructor(adminBannerService) {
        this.adminBannerService = adminBannerService;
    }
    findAll() {
        return this.adminBannerService.findAll();
    }
    updateShow(id, updateAdminBannerDto) {
        return this.adminBannerService.updateShowBanner(+id, updateAdminBannerDto.show);
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)('fetch'),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], AdminBannerController.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, common_1.Patch)('show/banner_id=:id'),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__param)(1, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], AdminBannerController.prototype, "updateShow", null);
AdminBannerController = (0, tslib_1.__decorate)([
    (0, swagger_1.ApiTags)('Admin Banner'),
    (0, common_1.Controller)('admin/banner'),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof admin_banner_service_1.AdminBannerService !== "undefined" && admin_banner_service_1.AdminBannerService) === "function" ? _a : Object])
], AdminBannerController);
exports.AdminBannerController = AdminBannerController;


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        var _a;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const message = ((_a = exception) === null || _a === void 0 ? void 0 : _a.error) || null;
        const error = exception.message;
        response.status(status).json({
            status,
            error,
            message,
        });
    }
};
HttpExceptionFilter = (0, tslib_1.__decorate)([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const path_1 = (0, tslib_1.__importDefault)(__webpack_require__(2));
const dotenv_1 = (0, tslib_1.__importDefault)(__webpack_require__(3));
dotenv_1.default.config();
process.env['NODE_CONFIG_DIR'] = path_1.default.join(__dirname, 'configs');
const common_1 = __webpack_require__(4);
const core_1 = __webpack_require__(5);
const config_1 = (0, tslib_1.__importDefault)(__webpack_require__(6));
const logger_1 = __webpack_require__(7);
const nest_winston_1 = __webpack_require__(9);
const swagger_1 = __webpack_require__(10);
const app_module_1 = __webpack_require__(11);
const http_exception_filter_1 = __webpack_require__(61);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useLogger(nest_winston_1.WinstonModule.createLogger((0, logger_1.getLoggerOptions)()));
    app.setGlobalPrefix(config_1.default.get('path_prefix'));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Announcement Bank')
        .setDescription('The MN-BANK API description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup(config_1.default.get('path_prefix') + '/public/docs', app, document);
    const logger = app.get(common_1.Logger);
    await app.listen(process.env.PORT || '3000', () => {
        logger.log(`
      ################################################
      🛡️  Server listening on port: 4000 🛡️
      Swagger:  http://localhost:4000/public/docs
      ################################################
    `);
    });
}
bootstrap();

})();

/******/ })()
;
