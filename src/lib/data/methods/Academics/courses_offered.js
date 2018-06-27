const Promise = require('bluebird');

const models = require('../../models');

const coursesOfferedMethods = {};
coursesOfferedMethods.addCoursesOffered = info => new Promise((
  resolve,
  reject,
) => {
  models.Academics.courses_offered.create(info)
    .then((newCourseOffered) => {
      console.log('inside then');
      resolve(newCourseOffered);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
});
coursesOfferedMethods.updateCourses = (info, data) => new Promise((
  resolve,
  reject,
) => {
  models.Academics.courses_offered.update(data, {
    where: {
      department_id: info.department_id,
      official_course_id: info.official_course_id,
    },
  })
    .then((updated) => {
      if (updated > 0) {
        resolve(updated);
      } else {
        reject(new Error());
        // throw ('err')
      }
    }).catch((error) => {
      reject(error);
    });
});

coursesOfferedMethods.deleteCourses = info => new Promise((resolve, reject) => {
  models.Academics.courses_offered.destroy({
    where: {
      department_id: info.department_id,
      official_course_id: info.official_course_id,
    },
  }).then((deleted) => {
    if (deleted === 0) {
      console.log('error tg');
      reject(new Error());
    } else {
      resolve(deleted);
    }
  }).catch((err) => {
    reject(err);
  });
});
module.exports = coursesOfferedMethods;
