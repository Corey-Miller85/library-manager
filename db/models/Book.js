const Sequelize = require("sequelize");

module.exports = sequelize => {
	class Book extends Sequelize.Model {}
	Book.init(
		{
			title: {
				type: Sequelize.STRING,
				validate: {
					notEmpty: {
						msg: "Title field is required"
					}
				}
			},
			author: {
				type: Sequelize.STRING,
				validate: {
					notEmpty: {
						msg: "Author field is required"
					}
				}
			},
			genre: Sequelize.STRING,
			year: Sequelize.INTEGER
		},
		{ sequelize }
	);

	return Book;
};
