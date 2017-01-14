const expect = require('chai').expect;

const fs = require('fs');
const path = require('path');

const lib = require('../lib');

describe("siteshot-utils", function() {
	describe("when converting a date to SiteShot string format", function() {
		it("converts date correctly", function() {
			var date = new Date(2017, 02, 10, 10, 12, 52);

			var result = lib.DateToDateString(date);
			expect(result).to.equal('2017-03-10-1489093972000');
		});
	});

	describe("when creating a directory", function() {
		var folderPath = path.join(__dirname, "test");

		after(function(done) {
			fs.rmdirSync(folderPath);
			done();
		});

		it("creates it when it doesnt exist", function() {

			var dirExistsBefore = fs.existsSync(folderPath);
			lib.CreateDirIfNotExists(folderPath);
			var dirExistsAfter = fs.existsSync(folderPath);

			expect(dirExistsBefore).to.be.false;
			expect(dirExistsAfter).to.be.true;
		});
	});

	describe("when getting page name from URL", function() {
		it("returns home when no page name", function() {
			var pageName = lib.PageNameFromURL('');
			expect(pageName).to.equal('home');
		});

		it("returns home when page is /", function() {
			var pageName = lib.PageNameFromURL('/');
			expect(pageName).to.equal('home');
		});

		it("returns name when one path supplied", function() {
			var pageName = lib.PageNameFromURL('/test');
			expect(pageName).to.equal('test');
		});

		it("returns name when more than one path supplied", function() {
			var pageName = lib.PageNameFromURL('/test/test2');
			expect(pageName).to.equal('test/test2');
		});
	});
});