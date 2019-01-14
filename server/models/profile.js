'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    isProfileCompleted: DataTypes.BOOLEAN,
    major: DataTypes.STRING,
    city: DataTypes.STRING,
    salary: DataTypes.FLOAT
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
    
  };
  return Profile;
};
