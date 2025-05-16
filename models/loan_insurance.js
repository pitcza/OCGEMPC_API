'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LoanInsurance extends Model {
    static associate(models) {
      LoanInsurance.belongsTo(models.loan_applications, {
        foreignKey: 'loan_id',
      });

      LoanInsurance.belongsTo(models.makers, {
        foreignKey: 'maker_id'
      })
    }
  }

  LoanInsurance.init({
    loan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'loan_applications',
        key:'id'
      }
    },
     maker_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:'makers',
        key:'id'
      }
    },
    billing_statement_no: {
        type: DataTypes.STRING,
        allowNull: false
    },
    certificate_no: {
        type: DataTypes.STRING,
        allowNull: false
    },
     status: {
        type: DataTypes.ENUM('new', 'renewal'),
        allowNull: false
    },
    effective_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    expiry_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    term: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    annual_premium: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    monthly_premium: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    gross_premium: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    service_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    sum_insured: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'loan_insurances',
    timestamps: true,
  });

  return LoanInsurance;
};
