const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes ) => {
    class Comakers extends Model {
        static associate(models){
            Comakers.belongsToMany(models.loan_applications, {
                foreignKey: 'comaker_id',
                through: models.loan_comakers
            })
        }
    }

    Comakers.init({
    co_first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    co_middle_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    co_last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    co_ext_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    co_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    co_phone_num: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    co_birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    co_age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    co_dept: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    co_position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    co_salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    co_ee_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    co_years_coop: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    co_share_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    co_saving_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    }, {
    timestamps: true,
    sequelize,
    modelName: 'comakers',
    });
    return Comakers;
};