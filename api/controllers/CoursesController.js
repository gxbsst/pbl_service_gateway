/**
 * CourseController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(request, response) {
        CoursesService.getCourses(request.query.access_token)
        .then(function(courses) {
            response.json(courses);
        })
        .fail(function(error) {
            response.send(error.originalError.code, error.details);
        });
    }
};

