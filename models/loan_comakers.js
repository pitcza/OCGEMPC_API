const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes ) => {
    class LoanComakers extends Model {
        static associate(models){
            LoanComakers.belongsTo(models.loan_applications, {
                foreignKey: 'loan_id'
            });
            LoanComakers.belongsTo(models.comakers, {
                foreignKey: "comaker_id"
            })
        }
    }

    LoanComakers.init({
         // Co-Maker's Information
      loan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'loan_applications',
        key:'id'
      }
    },
    comaker_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'comakers',
        key:'id'
      }
    },

  
    }, {
    timestamps: true,
    sequelize,
    modelName: 'loan_comakers',
    });
    return LoanComakers;
};