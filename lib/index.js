"use strict";

const fs = require('fs');

/**
 * Converts a date to SiteShot date string format
 * @param date
 * @returns {string}
 * @constructor
 */
exports.DateToDateString = function(date) {
    var month = (date.getMonth() + 1);
    var day = date.getDate();

    if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

    return date.getFullYear() + '-' + month + '-' + day + '-' + date.getTime();
};

/**
 * Create a directory if it doesn't exist
 * @param directoryName
 * @constructor
 */
exports.CreateDirIfNotExists = function(directoryName) {
    if (!fs.existsSync(directoryName)) {
        fs.mkdirSync(directoryName);
    }
};

/**
 * Gets page name from a URL
 * @param url
 * @constructor
 */
exports.PageNameFromURL = function(url) {
    var pageName = url.substring(1);

    if (pageName === '' || pageName === '/') {
        pageName = 'home';
    }

    if (pageName.substring(pageName.length - 1) === '/') {
        pageName = pageName.substring(0, pageName.length - 1);
    }

    return pageName;
};

/**
 * Gets site name from domain
 * @param url
 * @constructor
 */
exports.NameFromDomain = function(domainName) {
    if (!domainName) {
        throw new Error("Domain name cannot be null");
    }

    var nameFinder = /(http|https):\/\/(www.|)([a-zA-Z.]*)/gmi;
    var nameBits = nameFinder.exec(domainName);

    return nameBits[3];
};